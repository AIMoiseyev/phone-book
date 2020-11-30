export default function sortByField(field, state = true) {
  if (state) {
    return (a, b) => (a[field] > b[field] ? 1 : -1);
  }
  return (a, b) => (b[field] > a[field] ? 1 : -1);
}
