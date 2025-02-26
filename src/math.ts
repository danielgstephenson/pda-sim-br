export function getRandExp (rate: number): number {
  return -Math.log(1 - Math.random()) / rate
}

export function sqrt (x: number): number {
  return Math.sqrt(x)
}

export function max (...x: number[]): number {
  return Math.max(...x)
}

export function range (a: number, b: number): number[] {
  return [...Array(b - a + 1).keys()].map(i => a + i)
}

export function seq (a: number, b: number, stepSize: number): number[] {
  const gap = b - a
  if (gap <= 0) return []
  const steps = Math.floor(gap / stepSize)

  const sequence = range(0, steps).map(i => a + i * stepSize)
  return sequence
}

export function whichMax (array: number[]): number {
  let indexMax = 0
  let valueMax = array[0]
  array.forEach((value, index) => {
    if (value > valueMax) {
      indexMax = index
      valueMax = value
    }
  })
  return indexMax
}

export function whichMin (array: number[]): number {
  const negArray = array.map(x => -x)
  return whichMax(negArray)
}
