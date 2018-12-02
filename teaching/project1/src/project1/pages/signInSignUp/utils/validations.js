
/**
 * 
 *
 * @class Validation
 */
class Validation {
  constructor(assertion, rules, errMsg) {
    this.assertion = assertion
    this.rules = rules
    this.errMsg = errMsg
  }

  check = (text) => {
    if (typeof this.rules === 'function') {
      return this.rules(text)
    } else {
      console.error('validation rules should be a function, please check the validation:' + this.assertion)
    }
  }

}

/**
 * validate if given input value longer than len
 * @param {number} max_len the max length of input
 * @param {number} min_len the min length of input
 * @param {string} text the input value
 */
export const makeValidateLength = (min_len, max_len) => {
  const regex = new RegExp(`(?=.{${min_len},${max_len}})`, 'g')// `some string` 模板字符串， es6新特性
  return new Validation(
    'input should within certain length',
    text => !!text.match(regex),
    `password has to be ${min_len}-${max_len} letter`
  )
}

/**
 * validate if the input is empty
 * @param {string} text the input value
 */
export const validateExistence = new Validation(
  'input should have value',
  text => /\S/.test(text),
  'Required'
)

/**
 * validate email 
 */
export const validateEmail = new Validation(
  'input should be an email',
  text => !!text.match(/[\w-]+@([\w-]+\.)+[\w-]+/i),
  'invalid email'
)

/**
 * validate at least one uppercase
 */
export const validateUppercase = new Validation(
  'input should have an uppercase',
  text => !!text.match(/(?=.*[A-Z])/g),
  'at least one upper case'
)

/**
 * validate at least on lower case
 */
export const validateLowercase = new Validation(
  'input should have lowercase',
  text => !!text.match(/(?=.*[a-z])/g),
  'at least one lower case'
)


