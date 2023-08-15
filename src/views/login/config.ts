// UUID代表通用唯一标识符（Universally Unique Identifier），是一种标识信息的标准化方法。
// 它是一个128位的数字，通常用32个十六进制数字来表示，以五个分段来分隔，例如：550e8400-e29b-41d4-a716-446655440000。

// UUID的目的是在分布式系统中标识实体，确保每个标识符都是唯一的，不受时间、地点和系统的影响。
// 它被广泛应用于各种领域，如数据库、网络通信、操作系统和软件开发中。

// UUID的生成方式有多种，其中最常见的方式是使用时间戳、节点信息（通常是MAC地址）和随机数等元素来生成。
// 由于UUID的长度较长，有时人们会选择在特定的上下文中使用更短的标识符，如UUID的变种（如短UUID）或基于哈希算法的缩短表示。

export const generateUuid = () => {
  const s: any[] = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    const index = Math.floor(Math.random() * 0x10) // 16 [0, 15]
    s[i] = hexDigits[index]
  }
  s[8] = s[13] = s[18] = s[23] = '-'

  return s.join('')
}

let pictureId = generateUuid()

// 更新
export const updatePictureId = () => (pictureId = generateUuid())

export const getPictureId = () => pictureId

