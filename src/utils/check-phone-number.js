export default function checkPhoneNumber(value) {
  const regex = /^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/;
  return regex.test(value);
}
