import { getEquilibrium, Policy } from './game'
import { Group } from './group'
import { range } from './math'

export class Treatment {
  groups: Group[] = []
  B: number
  equilibrium: Policy

  constructor (B: number) {
    this.B = B
    this.equilibrium = getEquilibrium(this.B)
  }

  start (groupCount: number, B: number): void {
    this.B = B
    this.equilibrium = getEquilibrium(this.B)
    this.groups = range(1, groupCount).map(() => new Group(this.B))
  }

  step (adjustProb: number): void {
    this.groups.forEach(group => group.step(adjustProb))
  }
}
