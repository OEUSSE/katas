/**
 * Unique In Order
 * @param {*} iterable 
 * return a unique order
 */

function uniqueInOrder(iterable) {
  return [].filter.call(iterable, function (a, i) {
    return iterable[i - 1] !== a
  })
}

console.log(
  uniqueInOrder('AAAABBBCCDAABBB')
)

/**
 * Validate Credit Card Number
 * @param {*} cardNumber 
 * Validate implement the Luhn Algorithm.
 * How it works?!
  - cada numero par multiplicarlo por 2
  - sumar entre si los digitos pares -> 18 = 1 + 8 = 9
  - sumar todo los numeros y la suma del resultado por modulo 10, si da 0 es valido si no, no.
**/

function validate(cardNumber) {
  let strNumber = cardNumber.toString(),
    duplicate = [],
    sumTotal = 0,
    numCheck = 0,
    count = 0;

  (function duplicateParNumber() {
    for (let i = strNumber.length; i > 0; i--) {
      let number = +strNumber.charAt(i - 1)
      count++
      if (count % 2 === 0) {
        let num = sumParDidigt(number * 2)
        duplicate.push(num)
        continue
      }
      duplicate.push(number)
    }
    return duplicate
  })().reverse()

  function sumParDidigt(num) {
    num = num.toString()
    return (num.length > 1) ? num.split('').reduce((a, b) => (+a) + (+b)) : +num
  }

  sumTotal = duplicate.reduce((a, b) => a + b)
  // Next check digit
  numCheck = (sumTotal - (sumTotal % 10))
  // Luhn checksum mod 10
  return (sumTotal % 10 === 0)
}

console.log(
  validate(51684768131351)
)