const createURL = (name: string, extension?: string, directory?: string): string => {
  return new URL(`src/assets/${directory ?? 'images'}/${name}.${extension ?? 'png'}`, window.location.origin).href
}

export {
  createURL
}