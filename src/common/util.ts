import moment from 'moment-timezone'
import Scroll from 'react-scroll'

export function replaceStringAll(origin: string, from: string, to: string) {
  const regex = new RegExp(from, 'gi')
  return origin.replace(regex, to)
}

export function showPrice(x: number | string | undefined) {
  if (!x) return 0
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function unixToDateTime(unix: number | string) {
  return moment.unix(Number(unix)).tz('Asia/Seoul').format('YYYY-MM-DD HH:mm')
}

export function validatePhoneFormat(phoneNumber: string) {
  return /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/.test(phoneNumber)
}

export function calDay(addDay: number, targetDate: Date = new Date()) {
  return moment(targetDate).add(addDay, 'days')
}

export function calMonth(addMonth: number, targetDate: Date = new Date()) {
  return moment(targetDate).add(addMonth, 'month')
}

export function calYear(addYear: number, targetDate: Date = new Date()) {
  return moment(targetDate).add(addYear, 'year')
}

export function isBefore(curDate: Date, targetDate: Date = new Date()) {
  return moment(curDate).isBefore(targetDate)
}

export function isAfter(curDate: Date, targetDate: Date = new Date()) {
  return moment(curDate).isAfter(targetDate)
}

export function getDate(toDate?: Date | string) {
  const format = 'YYYY-MM-DD'
  if (toDate) return moment(toDate).tz('Asia/Seoul').format(format)
  return moment().tz('Asia/Seoul').format(format)
}

export function getDateTime(toDate?: Date | string) {
  const format = 'YYYY-MM-DD HH:mm'
  if (toDate) return moment(toDate).tz('Asia/Seoul').format(format)
  return moment().tz('Asia/Seoul').format(format)
}

export function getTime(toDate?: Date | string) {
  const format = 'HH:mm'
  if (toDate) return moment(toDate).tz('Asia/Seoul').format(format)
  return moment().tz('Asia/Seoul').format(format)
}

export function getDateTimeSS(toDate?: Date | string) {
  const format = 'YYYY-MM-DD HH:mm:ss'
  if (toDate) return moment(toDate).tz('Asia/Seoul').format(format)
  return moment().tz('Asia/Seoul').format(format)
}

export function isEmpty(arg: any): boolean {
  return (
    arg == null || // Check for null or undefined
    arg.length === 0 || // Check for empty String (Bonus check for empty Array)
    (typeof arg === 'object' && Object.keys(arg).length === 0) // Check for empty Object or Array
  )
}

export function isNotEmpty(arg: any): boolean {
  return !(
    arg == null ||
    arg.length === 0 ||
    (typeof arg === 'object' && Object.keys(arg).length === 0)
  )
}

export function replaceAll(str: string, target: string, to: string): string {
  const regex = new RegExp(`/${target}/gi`)
  return str.replace(regex, to)
}

export function trim(str: string): string {
  return str.replace(/ /gi, '')
}

export function overFlowVisible() {
  document.body.style.overflow = 'visible'
}

export function overFlowHidden() {
  document.body.style.overflow = 'hidden'
}

export function goToProductPage(ent_code: string, product_no: number) {
  openNewTab(`${process.env.REACT_APP_WEB_HOST}/enterprise/prd/${ent_code}/${product_no}`)
}

export function openNewTab(url: string) {
  window.open(url, '_blank')
}

export function getScrollY() {
  return Math.max(document.body.scrollTop, document.documentElement.scrollTop)
}

export function setScrollY(num: number, animate = true) {
  const scroll = Scroll.animateScroll
  const options = !animate ? { duration: 0 } : undefined
  scroll.scrollTo(num, options)
}
