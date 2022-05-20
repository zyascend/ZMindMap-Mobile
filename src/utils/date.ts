import dayjs from 'dayjs'
export function format(timestamp: number, template: string = 'YYYY/MM/DD HH:mm'): string {
  return dayjs(timestamp).format(template)
}
