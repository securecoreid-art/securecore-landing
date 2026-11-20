<?php
/**
 * SecureCore contact form endpoint.
 *
 * Flow:  form (/contact)  →  this script  →  Google Apps Script  →  Google Sheet (+ email notification)
 * Fallback: if the sheet cannot be reached, the message is emailed with PHP mail() so no lead is lost.
 *
 * Protections: POST only, same-origin check, size limit, honeypot, minimum fill time,
 * per-IP rate limit (IP is only stored as a keyed hash), strict server-side validation,
 * no user input in mail headers (except a validated Reply-To), no data stored on this server.
 *
 * Secrets live in _config.php (generated at deploy time from GitHub Secrets, never committed).
 * All timestamps are WIB (Asia/Jakarta, UTC+7). Compatible with PHP 7.4 – 8.5.
 */

declare(strict_types=1);

header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');
header('Referrer-Policy: no-referrer');

const MIN_FILL_MS   = 3000;  // humans need a few seconds to fill the form
const RATE_LIMIT    = 5;     // max submissions …
const RATE_WINDOW   = 3600;  // … per IP per hour
const MAX_BODY      = 20000; // bytes

const SERVICES = [
    'vulnerability-assessment' => 'Vulnerability Assessment',
    'penetration-testing'      => 'Penetration Testing',
    'web-api-security'         => 'Web & API Security Review',
    'infrastructure-cloud'     => 'Infrastructure & Cloud Review',
    'security-research'        => 'Security Research & Advisory',
    'remediation-retesting'    => 'Remediation Support & Retesting',
    'not-sure'                 => 'Not sure yet / needs advice',
];

/* ---------------------------------------------------------------- config */

$config = [
    'apps_script_url' => '',
    'secret'          => '',
    'notify_email'    => 'contact@securecore.id',
    'allowed_hosts'   => ['securecore.id', 'www.securecore.id'],
    'data_dir'        => '',
];
$configFile = __DIR__ . '/_config.php';
if (is_file($configFile)) {
    $loaded = require $configFile;
    if (is_array($loaded)) {
        $config = array_merge($config, $loaded);
    }
}

/* -------------------------------------------------------------- response */

$wantsJson = strpos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false;
$lang      = (($_POST['lang'] ?? '') === 'id') ? 'id' : 'en';
// Never trust a posted redirect target: build it ourselves (no open redirect).
$backUrl   = $lang === 'id' ? '/id/contact/' : '/contact/';

function respond(bool $ok, string $error = '', int $status = 200): void
{
    global $wantsJson, $backUrl;
    if ($wantsJson) {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($ok ? ['ok' => true] : ['ok' => false, 'error' => $error]);
    } else {
        // Plain HTML form (no JavaScript): go back to the page and show the result via :target.
        header('Location: ' . $backUrl . ($ok ? '#form-sent' : '#form-error'), true, 303);
    }
    exit;
}

/* ---------------------------------------------------------------- guards */

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    http_response_code(405);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'Method Not Allowed';
    exit;
}

if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > MAX_BODY) {
    respond(false, 'too_large', 413);
}

// Same-origin check (Origin header, or Referer as a fallback).
$source = $_SERVER['HTTP_ORIGIN'] ?? ($_SERVER['HTTP_REFERER'] ?? '');
if ($source !== '') {
    $host = strtolower((string) parse_url($source, PHP_URL_HOST));
    if (!in_array($host, $config['allowed_hosts'], true)) {
        respond(false, 'forbidden', 403);
    }
}

// Honeypot filled → a bot. Pretend success so it learns nothing.
if (trim((string) ($_POST['website'] ?? '')) !== '') {
    respond(true);
}

// Submitted impossibly fast → a bot. (Field is set by JavaScript; absent for no-JS visitors.)
$elapsed = (string) ($_POST['elapsed'] ?? '');
if ($elapsed !== '' && ctype_digit($elapsed) && (int) $elapsed < MIN_FILL_MS) {
    respond(true);
}

/* ------------------------------------------------------------ validation */

function clean($value): string
{
    $value = is_string($value) ? $value : '';
    // strip control characters except tab/newline/carriage return
    $value = (string) preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value);
    return trim($value);
}

function len(string $s): int
{
    return function_exists('mb_strlen') ? mb_strlen($s, 'UTF-8') : strlen($s);
}

$name         = clean($_POST['name'] ?? '');
$email        = clean($_POST['email'] ?? '');
$organization = clean($_POST['organization'] ?? '');
$message      = clean($_POST['message'] ?? '');
$rawServices  = $_POST['services'] ?? [];
$services     = [];
if (is_array($rawServices)) {
    foreach ($rawServices as $s) {
        if (is_string($s) && isset(SERVICES[$s]) && !in_array(SERVICES[$s], $services, true)) {
            $services[] = SERVICES[$s];
        }
    }
}

$valid =
    len($name) >= 2 && len($name) <= 100 &&
    len($organization) >= 2 && len($organization) <= 150 &&
    len($message) >= 20 && len($message) <= 3000 &&
    len($email) <= 254 && !preg_match('/[\r\n]/', $email) &&
    filter_var($email, FILTER_VALIDATE_EMAIL) !== false &&
    count($services) > 0 &&
    preg_match('//u', $name . $organization . $message) === 1; // valid UTF-8

if (!$valid) {
    respond(false, 'validation', 422);
}

/* ------------------------------------------------------------ rate limit */

function rate_limited(array $config): bool
{
    $dir = $config['data_dir'] !== '' ? $config['data_dir'] : sys_get_temp_dir();
    if (!is_dir($dir) || !is_writable($dir)) {
        return false; // fail open rather than lose real messages
    }
    $ip   = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    $key  = hash_hmac('sha256', $ip, $config['secret'] !== '' ? $config['secret'] : 'securecore');
    $file = rtrim($dir, '/') . '/sc_rl_' . $key;
    $now  = time();

    $fh = @fopen($file, 'c+');
    if ($fh === false) {
        return false;
    }
    flock($fh, LOCK_EX);
    $hits = json_decode((string) stream_get_contents($fh), true);
    $hits = array_values(array_filter(is_array($hits) ? $hits : [], fn ($t) => is_int($t) && $t > $now - RATE_WINDOW));
    $limited = count($hits) >= RATE_LIMIT;
    if (!$limited) {
        $hits[] = $now;
        ftruncate($fh, 0);
        rewind($fh);
        fwrite($fh, json_encode($hits));
    }
    flock($fh, LOCK_UN);
    fclose($fh);
    return $limited;
}

if (rate_limited($config)) {
    respond(false, 'rate_limited', 429);
}

/* --------------------------------------------------------------- deliver */

$timestamp = (new DateTimeImmutable('now', new DateTimeZone('Asia/Jakarta')))->format('Y-m-d H:i:s');

$entry = [
    'timestamp'    => $timestamp, // WIB
    'name'         => $name,
    'email'        => $email,
    'organization' => $organization,
    'services'     => implode(', ', $services),
    'message'      => $message,
    'lang'         => strtoupper($lang),
];

function send_to_sheet(array $config, array $entry): bool
{
    if ($config['apps_script_url'] === '' || $config['secret'] === '') {
        return false;
    }
    $body = json_encode(['secret' => $config['secret']] + $entry, JSON_UNESCAPED_UNICODE);

    if (function_exists('curl_init')) {
        $ch = curl_init($config['apps_script_url']);
        curl_setopt_array($ch, [
            CURLOPT_POST           => true,
            CURLOPT_POSTFIELDS     => $body,
            CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true, // Apps Script answers via a redirect
            CURLOPT_MAXREDIRS      => 3,
            CURLOPT_CONNECTTIMEOUT => 8,
            CURLOPT_TIMEOUT        => 20,
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_SSL_VERIFYHOST => 2,
        ]);
        $response = curl_exec($ch);
        $status   = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
        unset($ch);
    } else {
        $ctx = stream_context_create(['http' => [
            'method'          => 'POST',
            'header'          => "Content-Type: application/json\r\n",
            'content'         => $body,
            'timeout'         => 20,
            'follow_location' => 1,
            'ignore_errors'   => true,
        ]]);
        $response = @file_get_contents($config['apps_script_url'], false, $ctx);
        $status   = 200;
    }

    if (!is_string($response) || $status >= 400) {
        error_log('[securecore-contact] sheet delivery failed, HTTP ' . $status);
        return false;
    }
    $json = json_decode($response, true);
    if (!is_array($json) || ($json['ok'] ?? false) !== true) {
        error_log('[securecore-contact] sheet rejected the entry');
        return false;
    }
    return true;
}

function send_mail_fallback(array $config, array $entry): bool
{
    $to      = $config['notify_email'];
    $subject = '=?UTF-8?B?' . base64_encode('[SecureCore] New website inquiry (sheet unavailable)') . '?=';
    $body    = "A new message was sent from the website contact form.\n"
             . "(Google Sheet delivery failed, so it was emailed instead.)\n\n"
             . "Time (WIB):   {$entry['timestamp']}\n"
             . "Name:         {$entry['name']}\n"
             . "Email:        {$entry['email']}\n"
             . "Organization: {$entry['organization']}\n"
             . "Services:     {$entry['services']}\n"
             . "Language:     {$entry['lang']}\n\n"
             . "Message:\n{$entry['message']}\n";
    $headers = implode("\r\n", [
        'From: SecureCore Website <no-reply@securecore.id>',
        'Reply-To: ' . $entry['email'], // validated above: no CR/LF, valid address
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
    ]);
    $ok = @mail($to, $subject, $body, $headers);
    if (!$ok) {
        error_log('[securecore-contact] fallback mail() failed');
    }
    return $ok;
}

if (send_to_sheet($config, $entry) || send_mail_fallback($config, $entry)) {
    respond(true);
}

respond(false, 'server_error', 502);
