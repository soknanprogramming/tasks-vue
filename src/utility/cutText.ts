export function cutText(text: string, max: number = 68): string {
  if (text.length > max) {
    return text.slice(0, max) + '...'
  }
  return text
}
