/**
 * SecureCore Leads — Google Apps Script
 * ------------------------------------------------------------------
 * Paste this file into the Apps Script editor of the "SecureCore Leads"
 * spreadsheet (Extensions → Apps Script). Setup steps: see README.md,
 * section "Contact form (Google Sheet)".
 *
 * Receives JSON from https://securecore.id/api/contact.php, checks the
 * shared secret, appends one row per message and emails a notification.
 * All times are WIB (Asia/Jakarta, UTC+7).
 */

const SHEET_NAME = 'Leads';
const TIMEZONE = 'Asia/Jakarta';
const DEFAULT_NOTIFY_EMAIL = 'contact@securecore.id';
const HEADERS = ['Waktu (WIB)', 'Nama', 'Email', 'Organisasi', 'Layanan', 'Pesan', 'Bahasa', 'Status'];
const STATUSES = ['Baru', 'Dihubungi', 'Diskusi', 'Selesai', 'Tidak relevan'];

/**
 * Run ONCE from the editor (select "setup" → Run).
 * Creates the sheet layout, sets the WIB timezone and generates the secret key.
 * The secret is printed in the Execution log: copy it into GitHub Secrets as FORM_SECRET.
 */
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.setSpreadsheetTimeZone(TIMEZONE);

  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME, 0);
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold').setBackground('#0c1526').setFontColor('#ffffff');
  sheet.setFrozenRows(1);
  sheet.getRange('A2:A').setNumberFormat('yyyy-mm-dd hh:mm:ss');
  sheet.getRange('F2:F').setWrap(true);
  sheet.setColumnWidth(1, 160);
  sheet.setColumnWidth(2, 160);
  sheet.setColumnWidth(3, 220);
  sheet.setColumnWidth(4, 180);
  sheet.setColumnWidth(5, 240);
  sheet.setColumnWidth(6, 420);
  sheet.setColumnWidth(7, 70);
  sheet.setColumnWidth(8, 120);

  const statusRule = SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).build();
  sheet.getRange(2, 8, sheet.getMaxRows() - 1, 1).setDataValidation(statusRule);

  const props = PropertiesService.getScriptProperties();
  if (!props.getProperty('FORM_SECRET')) {
    props.setProperty('FORM_SECRET', (Utilities.getUuid() + Utilities.getUuid()).replace(/-/g, ''));
  }
  if (!props.getProperty('NOTIFY_EMAIL')) {
    props.setProperty('NOTIFY_EMAIL', DEFAULT_NOTIFY_EMAIL);
  }

  Logger.log('Setup complete. Timezone: ' + TIMEZONE);
  Logger.log('FORM_SECRET (copy into GitHub Secrets): ' + props.getProperty('FORM_SECRET'));
}

/** Web app entry point (called by contact.php). */
function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const secret = PropertiesService.getScriptProperties().getProperty('FORM_SECRET');
    if (!secret || !safeEqual_(String(data.secret || ''), secret)) {
      return json_({ ok: false, error: 'unauthorized' });
    }

    const when = parseWib_(data.timestamp);
    const row = [
      when,
      text_(data.name, 100),
      text_(data.email, 254),
      text_(data.organization, 150),
      text_(data.services, 500),
      text_(data.message, 3000),
      text_(data.lang, 2),
      'Baru',
    ];

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME, 0);
      sheet.appendRow(row);
    } finally {
      lock.releaseLock();
    }

    notify_(data, when);
    return json_({ ok: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: 'server' });
  }
}

/** Optional: lets you check the deployment URL in a browser. Reveals nothing. */
function doGet() {
  return json_({ ok: true, service: 'securecore-leads' });
}

/* ------------------------------------------------------------ helpers */

function notify_(data, when) {
  try {
    const to = PropertiesService.getScriptProperties().getProperty('NOTIFY_EMAIL') || DEFAULT_NOTIFY_EMAIL;
    const name = oneLine_(data.name);
    const email = oneLine_(data.email);
    const body = [
      'New message from the SecureCore website contact form.',
      '',
      'Time (WIB):   ' + Utilities.formatDate(when, TIMEZONE, 'yyyy-MM-dd HH:mm:ss') + ' WIB',
      'Name:         ' + name,
      'Email:        ' + email,
      'Organization: ' + oneLine_(data.organization),
      'Services:     ' + oneLine_(data.services),
      'Language:     ' + oneLine_(data.lang),
      '',
      'Message:',
      String(data.message || ''),
      '',
      'All leads: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
    ].join('\n');

    const options = { to: to, subject: '[SecureCore] New inquiry from ' + name, body: body, name: 'SecureCore Website' };
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) options.replyTo = email;
    MailApp.sendEmail(options);
  } catch (err) {
    console.error('notify failed', err); // the row is saved even if the email fails
  }
}

/** Cell-safe text: trimmed, length-limited, and protected against formula injection. */
function text_(value, max) {
  let s = String(value == null ? '' : value).trim().slice(0, max);
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  return s;
}

function oneLine_(value) {
  return String(value == null ? '' : value).replace(/[\r\n]+/g, ' ').trim().slice(0, 200);
}

function parseWib_(value) {
  try {
    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(String(value))) {
      return Utilities.parseDate(String(value), TIMEZONE, 'yyyy-MM-dd HH:mm:ss');
    }
  } catch (err) {}
  return new Date();
}

function safeEqual_(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
