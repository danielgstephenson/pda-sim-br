console.log('Hello World.')

interface policy {
  y: number
  d: number
  a: number
}

const popSize = 100
const L = 1

function getPayoff (xi: policy, xj: policy, B: number): number {
  const sji = xi.a > 0 ? xi.a / (B * xj.d + xi.a) : 0
  const sij = xj.a > 0 ? xj.a / (B * xi.d + xj.a) : 0
  const sii = 1 - sij
  const yi = L * xi.y
  const yj = L * xj.y
  return sii * yi + sji * yj
}

function getEquilibrium (B: number): policy {
  const y = popSize * (B + 1) / (B + 3)
  const d = y / (B + 1)
  const a = y / (B + 1)
  return { y, d, a }
}
