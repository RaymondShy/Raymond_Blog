import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');
export function dateTimeFormat(date:string){
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}
export function dateFormat(date:string){
    return dayjs(date).format('YYYY-MM-DD');
}
export function relativeCurrentTime(date: string){
    return dayjs(date).fromNow()
}
/**
 * 格式化时间为微信风格的显示
 * @param timestamp 时间戳或ISO格式时间字符串
 * @returns 格式化后的时间字符串
 */
// export function formatTime(timestamp: string | Date): string {
//     const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp
//     const now = new Date()
//
//     // 计算时间差（毫秒）
//     const diff = now.getTime() - date.getTime()
//
//     // 今天的时间显示格式
//     if (isToday(date)) {
//         return formatHourMinute(date)
//     }
//
//     // 昨天的时间显示格式
//     if (isYesterday(date)) {
//         return `昨天 ${formatHourMinute(date)}`
//     }
//
//     // 本周内的时间显示格式
//     if (isThisWeek(date)) {
//         return `${getWeekday(date)} ${formatHourMinute(date)}`
//     }
//
//     // 今年的时间显示格式
//     if (isThisYear(date)) {
//         return `${formatMonthDay(date)} ${formatHourMinute(date)}`
//     }
//
//     // 其他时间显示完整日期
//     return `${formatYearMonthDay(date)} ${formatHourMinute(date)}`
// }

/**
 * 判断是否是今天
 */
function isToday(date: Date): boolean {
    const today = new Date()
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    )
}

/**
 * 判断是否是昨天
 */
function isYesterday(date: Date): boolean {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    return (
        date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear()
    )
}

/**
 * 判断是否是本周
 */
function isThisWeek(date: Date): boolean {
    const now = new Date()
    const startOfWeek = new Date(now)
    startOfWeek.setDate(now.getDate() - now.getDay())
    startOfWeek.setHours(0, 0, 0, 0)

    return date >= startOfWeek
}

/**
 * 判断是否是今年
 */
function isThisYear(date: Date): boolean {
    return date.getFullYear() === new Date().getFullYear()
}

/**
 * 格式化小时和分钟 (HH:mm)
 */
function formatHourMinute(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
}

/**
 * 获取星期几 (星期一、二等)
 */
function getWeekday(date: Date): string {
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    return weekdays[date.getDay()]
}

/**
 * 格式化月日 (M月d日)
 */
function formatMonthDay(date: Date): string {
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${month}月${day}日`
}

/**
 * 格式化年月日 (yyyy年M月d日)
 */
function formatYearMonthDay(date: Date): string {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}年${month}月${day}日`
}
