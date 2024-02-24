const standardLocalDate = (date: Date) => {
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}

const localTime = (date: Date) => {
  return date.toLocaleTimeString().split(' ').reduce((newTime, section) => {
    return newTime += section.match(':') ? section.slice(0, 5) : `&nbsp;<small>${section}</small>` 
  }, '')
}

export {
  standardLocalDate,
  localTime
}