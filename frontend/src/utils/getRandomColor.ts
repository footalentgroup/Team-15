const colors = [
  'bg-pink-100',
  'bg-yellow-100',
  'bg-green-100',
  'bg-blue-light-100',
  'bg-lime-100',
]

export function getColorByPosition(position: number) {
  return colors[position % colors.length]
}
