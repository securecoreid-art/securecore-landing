/**
 * Contact form enhancement:
 * client-side validation, fetch submit to /api/contact.php, and a result popup.
 * Without JavaScript the form still works as a normal POST (see contact.php).
 */

const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
const modal = document.querySelector<HTMLDialogElement>('[data-contact-modal]');

if (form && modal) {
  const loadedAt = Date.now();
  const elapsed = form.querySelector<HTMLInputElement>('[data-elapsed]');
  const servicesBox = form.querySelector<HTMLFieldSetElement>('[data-services]');
  const servicesError = form.querySelector<HTMLElement>('[data-services-error]');
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const buttonLabel = form.querySelector<HTMLElement>('[data-label]');
  const titleEl = modal.querySelector<HTMLElement>('[data-modal-title]');
  const bodyEl = modal.querySelector<HTMLElement>('[data-modal-body]');
  const d = form.dataset;
  const originalLabel = buttonLabel?.textContent ?? '';

  const checkedServices = () =>
    Array.from(form.querySelectorAll<HTMLInputElement>('input[name="services[]"]')).filter((i) => i.checked);

  const validateServices = () => {
    const ok = checkedServices().length > 0;
    if (servicesError) servicesError.hidden = ok;
    return ok;
  };

  servicesBox?.addEventListener('change', () => {
    if (form.classList.contains('was-validated')) validateServices();
  });

  const show = (ok: boolean, title: string, body: string) => {
    modal.classList.toggle('is-ok', ok);
    modal.classList.toggle('is-error', !ok);
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    if (typeof modal.showModal === 'function') modal.showModal();
    else alert(`${title}\n\n${body}`);
  };

  const setBusy = (busy: boolean) => {
    if (button) button.disabled = busy;
    if (buttonLabel) buttonLabel.textContent = busy ? (d.sending ?? '') : originalLabel;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    form.classList.add('was-validated');

    const fieldsOk = form.checkValidity();
    const servicesOk = validateServices();
    if (!fieldsOk || !servicesOk) {
      const firstInvalid = form.querySelector<HTMLElement>(':invalid') ?? servicesBox;
      firstInvalid?.focus();
      if (!fieldsOk) form.reportValidity();
      return;
    }

    if (elapsed) elapsed.value = String(Date.now() - loadedAt);
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();

    setBusy(true);
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
        credentials: 'same-origin',
      });
      const json = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;

      if (res.ok && json?.ok) {
        const body = (d.successBody ?? '').replace('{name}', name).replace('{email}', email);
        show(true, d.successTitle ?? '', body);
        form.reset();
        form.classList.remove('was-validated');
      } else if (json?.error === 'rate_limited') {
        show(false, d.errorTitle ?? '', d.rateBody ?? '');
      } else {
        show(false, d.errorTitle ?? '', d.errorBody ?? '');
      }
    } catch {
      show(false, d.errorTitle ?? '', d.errorBody ?? '');
    } finally {
      setBusy(false);
    }
  });

  // close the popup when clicking the dark backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
  });
}
