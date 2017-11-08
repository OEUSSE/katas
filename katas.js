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
  var sum = 0;

  while (cardNumber > 0) {
    var a = cardNumber % 10; // Almacena el último dígito
    cardNumber = Math.floor(cardNumber / 10); // Corta el último dígito

    var b = (cardNumber % 10) * 2; // Almacena el último dígo y lo multiplica por dos
    cardNumber = Math.floor(cardNumber / 10); // Corta el último dígito

    if (b > 9) { // Verifica si el digito para (b) tiene mas de dos dígitos
      b -= 9; // Suma los dos dígitos que conforma b
    }

    sum += a + b; // Sumatoria de dígitos
  }

  return sum % 10 == 0; // Si es valido o no
}

console.log(
  validate(51684768131351)
)

/**
 * Are we alternate?
 * @param {String} word 
 * Return true or false if vocal and consonants are in alternate order.
 */

function isAlternate(word) {
  const regex = /[aeiou]/i;
  const isLikeStart = regex.test(word[0]);
  return word.split('').length > 0 && word.split('').every((item, i) => {
    if (i % 2 === 0 && (regex.test(item) === isLikeStart)) return true;
    else if (i % 2 !== 0 && (regex.test(item) === !isLikeStart)) return true;
    else return false;
  });
}

console.log(
  isAlternate('aloha')
)
