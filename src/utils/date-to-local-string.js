export default function dateToLocalString(date) {
  return new Date(date).toLocaleString('ru-Ru', {
    year: 'numeric',
    month: '2-digit',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
}
