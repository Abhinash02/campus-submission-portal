export function getWindowStatus(openAt, closeAt, now = new Date()) {
  const start = new Date(openAt);
  const end = new Date(closeAt);

  if (now < start) {
    return { open: false, reason: 'not_started', message: 'Submission has not opened yet.' };
  }
  if (now > end) {
    return { open: false, reason: 'closed', message: 'Submission window has closed.' };
  }
  return { open: true, reason: 'open', message: '' };
}

export function formatDateTime(date) {
  if (!date) return '-';
  return new Date(date).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
