export function setNumberCount(number, digit) {
  let n = String(number)
  if (n.includes('.')) {
    n = n.substring(0, n.indexOf('.') + digit)
  }
  return n
}
