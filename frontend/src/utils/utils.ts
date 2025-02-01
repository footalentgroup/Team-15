export const normalizeDate = (date: Date) => {
  const normalizedDate = new Date(date)
  normalizedDate.setHours(12, 0, 0, 0)
  return normalizedDate
}
