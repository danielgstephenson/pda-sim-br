import { getEquilibrium, getRandomPolicy } from './game'
import { Group } from './group'
import { range } from './math'

export class Treatment {
  groups: Group[] = []
  B = 1
  equilibrium = getRandomPolicy()

  start (groupCount: number, B: number): void {
    this.B = B
    this.groups = range(1, groupCount).map(() => new Group(this.B))
    this.equilibrium = getEquilibrium(this.B)
  }

  step (adjustProb: number): void {
    this.groups.forEach(group => group.step(adjustProb))
  }
}
