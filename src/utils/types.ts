/**
 * 改变T中的某些键对应的类型为N
 */
export type Replace<T, Y extends keyof T, N> = {
  [K in keyof T]: K extends Y ? N : T[K]
}
