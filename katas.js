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

// uniqueInOrder('AAAABBBCCDAABBB')

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

// validate(51684768131351)

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

// isAlternate('aloha')

/**
 * Generate a Hashtag
 * @param {String} str
 */
function generateHashtag(str) {
  return str.length > 0 && str.length <= 140 &&
    str
      .trim()
      .split(' ')
      .reduce((str, word) => str += `${word[0].toUpperCase().concat(word.slice(1, word.length))}`, '#')
}

// generateHashtag('this is a hashtag')

/**
 * Count characters in your string
 * @param {String} string
 */

function count(string) {
  return string.split('').reduce((obj, letter, index) => {
    obj[letter] ? obj[letter]++ : obj[letter] = 1;
    return obj;
  }, {});
}

//count('avanico')) => { a: 2, v: 1, n: 1, i: 1, c: 1, o: 1 }

/**
 * @name No repeats please, permAlone
 * @param {String} str
 * @description
 * Este algoritmo se basa en permutaciones.
 * Las permutaciones son la cantidad de variaciones que puede tener un grupo.
 * @return Este algoritmo crea todas la posibles variaciones de un string y devuelve el
 * número de variaciones en las que dos letras no van seguidas una de la otra.
 * aab(👎) - aba(👍)
 */

function permAlone(str) {
  const re = /(.)\1/;
  function pT(p, o) {
    if (o.length) {
      let sum = 0;
      for (var i = 0; i < p.length + 1; i++) {
        sum += pT(p.slice(0, i).concat(o[0]).concat(p.slice(i)), o.slice(1));
      }
      return sum;
    }
    else return !re.test(p.join(''));
  }
  return pT([], str.split(''));
}

/*console.log(
  permAlone("aab")
)*/

/**
 * Count the smiley faces!
 * @param {Array} arr
 * @description
 * Valid smiley face examples :) :D ;-D :~)
 * Invalid smiley faces ;( :> :} :]
 */

function countSmileys(arr) {
  const regex = /((:|;)(-|~|)([)]|D))/;
  return arr.filter(x => regex.test(x)).length;
}

console.log(
  countSmileys(
    [';]', ':[', ';*', ':$', ';-D']
  )
)

/**
* Prefill an Array
* @param {String or Number} quantity
* @param {String, Number, Func} base
*/

function prefill(quantity, base) {
  // (~~) Sustitute of Math.floor() -> Javascript Bitwise Opertors
  if (typeof quantity === 'boolean' || ~~quantity != quantity || +quantity < 0)
    throw new TypeError(quantity + ' is invalid');

  return Array.apply(null, Array(+quantity)).map(() => base);
}

/*console.log(
  prefill(2, prefill(2, '2d'))
)*/