export function getRandExp (rate: number): number {
  return -Math.log(1 - Math.random()) / rate
}
