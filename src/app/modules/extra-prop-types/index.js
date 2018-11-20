export function withLength (min, max, validator) {
  let exact
  if (typeof max !== 'number') {
    exact = min
    validator = max
    max = false
    min = false
  }
  return checkLength.bind(null, min, max, exact, validator)
}

export function withMaxLength (length, validator) {
  return checkLength.bind(null, null, length, null, validator)
}

export function withMinLength (length, validator) {
  return checkLength.bind(null, length, null, null, validator)
}

function checkLength (min, max, exact, validator, props, propName, ...rest) {
  const value = props[propName]
  if (value) {
    if (value.length == null) {
      return Error(`Expected something with a length (string, array), actual: ${typeof value}`)
    }
    if (min && max) {
      if (min > max) {
        return Error(`Invalid range: max: ${max}, min: ${min}`)
      }
      if (value.length > max || value.length < min) {
        return Error(`Out of range: actual: ${value.length}, expected: ${min} - ${max}`)
      }
    } else {
      if (min && value.length < min) {
        return Error(`Min length exceeded: actual: ${value.length}, expected: ${min}`)
      } else if (max && value.length > max) {
        return Error(`Max length exceeded: actual: ${value.length}, expected: ${max}`)
      } else if (exact && value.length !== exact) {
        return Error(`Invalid length: actual: ${value.length}, expected: ${exact}`)
      }
    }
  }
  return validator(props, propName, ...rest)
}

export default {
  withLength,
  withMinLength,
  withMaxLength
}
