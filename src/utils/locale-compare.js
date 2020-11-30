export default function localeCompare(field, state = true) {
  if (state) {
    return (a, b) => a[field].localeCompare(b[field]);
  }
  return (a, b) => b[field].localeCompare(a[field]);
}
