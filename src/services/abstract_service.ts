export default abstract class abstractService {
  formattingURL(url: string, key?: string): string {
    return url.replace(/KEY/g, key ?? '/')
  }
}
