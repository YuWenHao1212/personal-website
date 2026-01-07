/**
 * Calculate reading time for content
 * @param content - The content to calculate reading time for
 * @param wordsPerMinute - Reading speed (default: 200 for English, lower for Chinese)
 * @returns Reading time in minutes
 */
export function getReadingTime(content: string, wordsPerMinute = 200): number {
  // Remove HTML tags
  const cleanContent = content.replace(/<[^>]*>/g, '');

  // Count Chinese characters (each counts as ~2 "words" for reading time)
  const chineseChars = (cleanContent.match(/[\u4e00-\u9fa5]/g) || []).length;

  // Count English words
  const englishWords = cleanContent
    .replace(/[\u4e00-\u9fa5]/g, '') // Remove Chinese
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  // Chinese reading speed is roughly 300-400 chars/min
  // Normalize to "word" count where Chinese chars count as 0.5 words
  const totalWords = englishWords + chineseChars * 0.5;

  return Math.max(1, Math.ceil(totalWords / wordsPerMinute));
}
