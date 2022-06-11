/**
 * 不包含循环引用的深度克隆
 * @param obj T
 * @returns T
 */
export function simpleDeepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}
/**
 * 删除/保留 某些属性 【不包含循环引用】
 * @param obj T
 * @param keys 某些属性
 * @param type 删除：omit。保留：keep
 * @returns R
 */
export function simpleOmit<T, R>(
  obj: T,
  keys: string[],
  type: 'omit' | 'keep' = 'omit',
): R | undefined {
  if (typeof obj !== 'object' || !Array.isArray(keys)) return undefined
  let replacer = []
  if (type === 'omit') {
    replacer = Object.keys(obj).filter(i => !keys.includes(i))
  } else {
    replacer = [...keys]
  }
  return JSON.parse(JSON.stringify(obj, replacer))
}
