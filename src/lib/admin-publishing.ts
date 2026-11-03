export function publishingError(status: string, scheduledFor: string | null | undefined, title: string, bodyHtml: string, now = Date.now()): string | null {
  if (!['published', 'draft', 'scheduled'].includes(status)) return 'Choose a valid post status.'
  if (status === 'draft') return null
  if (!title.trim() || title.trim() === 'Untitled post') return 'Add a title before publishing.'
  if (!bodyHtml.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, '').trim() && !/<img\b/i.test(bodyHtml)) return 'Add some content before publishing.'
  if (status === 'scheduled' && (!scheduledFor || !Number.isFinite(Date.parse(scheduledFor)) || Date.parse(scheduledFor) <= now)) return 'Choose a date and time in the future.'
  return null
}
