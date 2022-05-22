import dayjs from 'dayjs'
export function format(timestamp: number, template = 'YYYY/MM/DD HH:mm'): string {
  return dayjs(timestamp).format(template)
}
