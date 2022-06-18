import type { DependencyList } from 'react'
import { useEffect } from 'react'
// https://ahooks.js.org/zh-CN/hooks/use-async-effect
// useEffect 支持异步函数
function useAsyncEffect(
  effect: () => AsyncGenerator<void, void, void> | Promise<void>,
  deps?: DependencyList,
) {
  function isAsyncGenerator(
    val: AsyncGenerator<void, void, void> | Promise<void>,
  ): val is AsyncGenerator<void, void, void> {
    // Symbol.asyncIterator 符号指定了一个对象的默认异步迭代器。
    // 如果一个对象设置了这个属性，它就是异步可迭代对象，可用于for await...of循环
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return typeof val[Symbol.asyncIterator] === 'function'
  }
  useEffect(() => {
    const e = effect()
    let cancelled = false
    async function execute() {
      if (isAsyncGenerator(e)) {
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const result = await e.next()
          if (result.done || cancelled) {
            break
          }
        }
      } else {
        await e
      }
    }
    execute()
    return () => {
      cancelled = true
    }
  }, deps)
}

export default useAsyncEffect
