/**
 * Chunk an array
 * @param {*} string 
 */
function chunkArray(array, size) {
  let chunks = []
  for (let i = 0, x = array.length; i < x; i += size)
      chunks.push(array.slice(i, i + size))
  return chunks
}

/**
 * ROT13
 */

function parseToROT13(string) {
  const isMin = (charCode) => charCode >= 97 && charCode <= 122
  const isMax = (charCode) => charCode >= 65 && charCode <= 90

  const getLetterCipher = (charCode, max, min) => {
    let rotCode = charCode - 13
    if (rotCode < min) {
      let res = min - rotCode
      rotCode = max - (res - 1);
    }
    return String.fromCharCode(rotCode)
  }

  return string.split('').reduce((accu, next) => {
    const charCode = next.charCodeAt()
    return accu += isMin(charCode) ?
      getLetterCipher(charCode, 122, 97) :
      isMax(charCode) ?
      getLetterCipher(charCode, 90, 65) :
      next
  }, '')
}

/**
 * Unique In Order
 * @param {*} iterable
 * return a unique order
 * @description
 * uniqueInOrder('AAAABBBCCDAABBB')
 */

function uniqueInOrder(iterable) {
  return [].filter.call(iterable, function (a, i) {
    return iterable[i - 1] !== a
  })
}

/**
 * Validate Credit Card Number
 * @param {*} cardNumber
 * Validate implement the Luhn Algorithm.
 * How it works?!
  - cada numero par multiplicarlo por 2
  - sumar entre si los digitos pares -> 18 = 1 + 8 = 9
  - sumar todo los numeros y la suma del resultado por modulo 10, si da 0 es valido si no, no.
  validate(51684768131351)
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

/**
 * Are we alternate?
 * @param {String} word
 * Return true or false if vocal and consonants are in alternate order.
 * @description
 * isAlternate('aloha')
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

/**
 * Generate a Hashtag
 * @param {String} str
 * @description
 * generateHashtag('this is a hashtag')
 */

function generateHashtag(str) {
  return str.length > 0 && str.length <= 140 &&
    str
      .trim()
      .split(' ')
      .reduce((str, word) => str += `${word[0].toUpperCase().concat(word.slice(1, word.length))}`, '#')
}

/**
 * Count characters in your string
 * @param {String} string
 * @description
 * count('avanico')) => { a: 2, v: 1, n: 1, i: 1, c: 1, o: 1 }
 */

function count(string) {
  return string.split('').reduce((obj, letter, index) => {
    obj[letter] ? obj[letter]++ : obj[letter] = 1;
    return obj;
  }, {});
}

/**
 * @name No repeats please, permAlone
 * @param {String} str
 * @description
 * Este algoritmo se basa en permutaciones.
 * Las permutaciones son la cantidad de variaciones que puede tener un grupo.
 * @return Este algoritmo crea todas la posibles variaciones de un string y devuelve el
 * número de variaciones en las que dos letras no van seguidas una de la otra.
 * aab(👎) - aba(👍)
 * permAlone("aab")
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

/**
 * Count the smiley faces!
 * @param {Array} arr
 * @description
 * Valid smiley face examples :) :D ;-D :~)
 * Invalid smiley faces ;( :> :} :]
 * countSmileys( [';]', ':[', ';*', ':$', ';-D'] )
 */

function countSmileys(arr) {
  const regex = /((:|;)(-|~|)([)]|D))/;
  return arr.filter(x => regex.test(x)).length;
}

/**
* Prefill an Array
* @param {String or Number} quantity
* @param {String, Number, Func} base
* @description prefill(2, prefill(2, '2d'))
*/

function prefill(quantity, base) {
  // (~~) Sustitute of Math.floor() -> Javascript Bitwise Opertors
  if (typeof quantity === 'boolean' || ~~quantity != quantity || +quantity < 0)
    throw new TypeError(quantity + ' is invalid');

  return Array.apply(null, Array(+quantity)).map(() => base);
}

/**
 * Dependency Injection
*/

const deps = {
  'dep1': function () { return 'this is dep1'; },
  'dep2': function () { return 'this is dep2'; },
  'dep3': function () { return 'this is dep3'; },
  'dep4': function () { return 'this is dep4'; }
}

const DI = function (dependency) {
  this.dependency = dependency
}

DI.prototype.inject = function (func) {
  let deps = /^[^(]+\(([^)]+)/.exec(func.toString());
  deps = deps ? deps[1]
    .split(/\s?,\s?/)
    .map(function (dep) {
      return this.dependency[dep];
    }.bind(this)) : [];

  return func.bind(null, ...deps)
}

let di = new DI(deps)

const myFunc = di.inject(function (dep2, dep1, dep3) {
  return [dep1(), dep2(), dep3()].join(' -> ');
})

let a = myFunc();

/**
 * Reverse an integer
 * @param {Integer} x 
 */
function reverseInteger(x) {
  let integer = /\d+/g.exec(x.toString())[0]
  let reverse = integer.split('').reverse().join('')
  return parseInt(x.toString().replace(/\d+/g, reverse))
}

let res = reverseInteger(12345)