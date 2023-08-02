import dayjs from 'dayjs'

export const getMenuIcon = (name: string) =>
  new URL(`../assets/images/menu/${name}`, import.meta.url).href

export const replaceAsterisk = (text: string, num = 3) => {
  const generateAsterisk = (num: number) => Array(num).fill('*').join('')

  if (!text) return
  const len = text.length

  if (len < num) {
    return text[0] + generateAsterisk(len - 1)
  }

  if (len < num * 2) {
    return text[0] + generateAsterisk(len - 2) + text[len - 1]
  }

  if (len === num * 2) {
    return text.slice(0, num) + generateAsterisk(len - num)
  }

  return text.slice(0, num) + generateAsterisk(len - 2 * num) + text.slice(-num)
}

export const downloadFileByBlob = (blob: Blob, filename: string) => {
  if (!blob) return
  const url = URL.createObjectURL(blob)
  let a: HTMLAnchorElement | null = document.createElement('a')

  a.href = url
  a.download = filename

  a.click()

  URL.revokeObjectURL(url)

  a = null
}

export const downloadFileByUrl = (url: string, filename?: string) => {
  if (!url) return
  let a: HTMLAnchorElement | null = document.createElement('a')

  a.href = url

  if (!filename) {
    const u = url.match(/.*\/(.*)$/)
    filename = u ? u[1] : dayjs().format('YYYY-MM-DD')
  }

  a.download = filename

  a.click()

  a = null
}
