import { getBestResponse, getRandomPolicy, Policy, getEquilibrium } from './game'

export class Group {
  x1: Policy
  x2: Policy
  equilibrium: Policy
  B: number

  constructor (B: number) {
    this.B = B
    this.x1 = getRandomPolicy()
    this.x2 = getRandomPolicy()
    this.equilibrium = getEquilibrium(this.B)
  }

  step (adjustProb: number): void {
    if (Math.random() < adjustProb) this.adjust()
  }

  adjust (): void {
    const i = Math.random() < 0.5 ? 1 : 2
    if (i === 1) {
      this.x1 = getBestResponse(this.x2, this.B)
    }
    if (i === 2) {
      this.x2 = getBestResponse(this.x1, this.B)
    }
    // const distance1 = getPolicyDistance(this.x1, this.equilibrium)
    // const distance2 = getPolicyDistance(this.x2, this.equilibrium)
    // console.log('distances', distance1.toFixed(2), distance2.toFixed(2))
  }
}
