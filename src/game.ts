import { getRandExp, max, seq, sqrt, whichMax } from './math'

export const X = 100
export const L = 1

export interface Policy {
  y: number
  d: number
  a: number
}

export function formatPolicy (policy: Policy): string {
  return `(y: ${policy.y.toFixed(2)}, d: ${policy.d.toFixed(2)}, a: ${policy.a.toFixed(2)})`
}

export function getPolicyDistance (policy1: Policy, policy2: Policy): number {
  const y = policy1.y - policy2.y
  const d = policy1.d - policy2.d
  const a = policy1.a - policy2.a
  return sqrt(y ** 2 + d ** 2 + a ** 2)
}

export function getPayoff (xi: Policy, xj: Policy, B: number): number {
  const sji = xi.a > 0 ? xi.a / (B * xj.d + xi.a) : 0
  const sij = xj.a > 0 ? xj.a / (B * xi.d + xj.a) : 0
  const sii = 1 - sij
  const yi = L * xi.y
  const yj = L * xj.y
  return sii * yi + sji * yj
}

export function getEquilibrium (B: number): Policy {
  const y = X * (B + 1) / (B + 3)
  const d = y / (B + 1)
  const a = y / (B + 1)
  return { y, d, a }
}

function getPolicyOptions (xj: Policy, B: number): Policy[] {
  const xidMax = (Math.sqrt(xj.a ** 2 + B * xj.a * X) - xj.a) / B
  const xids = seq(0.1, xidMax, 0.1)
  const xiys = xids.map(xid => {
    return B * xid ** 2 / xj.a + xid
  })
  const xias = xids.map((xid, index) => {
    const xiy = xiys[index]
    return X - xid - xiy
  })
  const policyOptions: Policy[] = []
  xias.forEach((xia, index) => {
    if (xia >= 0) {
      policyOptions.push({
        y: xiys[index],
        d: xids[index],
        a: xia
      })
    }
  })
  return policyOptions
}

export function getBestResponse (xj: Policy, B: number): Policy {
  if (xj.a < 0.01) {
    const xia = max(0, sqrt(xj.y * xj.d) - B * xj.d)
    return {
      y: X - xia,
      d: 0,
      a: xia
    }
  }
  const policyOptions = getPolicyOptions(xj, B)
  const payoffs = policyOptions.map(xi => getPayoff(xi, xj, B))
  const bestResponse = policyOptions[whichMax(payoffs)]
  if (bestResponse == null) {
    const xjString = `(${xj.y},${xj.d},${xj.a})`
    console.log('policyOptions.length =', policyOptions.length)
    throw new Error(`invalid best response to ${xjString}`)
  }
  return bestResponse
}

export function getRandomPolicy (): Policy {
  const y = getRandExp(1)
  const d = getRandExp(1)
  const a = getRandExp(1)
  const sum = y + d + a
  return {
    y: X * y / sum,
    d: X * d / sum,
    a: X * a / sum
  }
}
