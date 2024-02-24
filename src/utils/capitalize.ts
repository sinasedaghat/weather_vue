const capitalizeFirstLetters = (phrase: string) => {
  return phrase.trim().split(' ').reduce((newStr, word) => {
   return newStr += `${word.charAt(0).toUpperCase()}${word.slice(1)} `
  }, '').trim()
}

const capitalizeFirstWord = (phrase: string) => {
  return `${phrase.charAt(0).toUpperCase()}${phrase.slice(1)}`
}

export {
  capitalizeFirstLetters,
  capitalizeFirstWord,
}