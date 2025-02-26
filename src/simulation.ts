import { Renderer } from './renderer'
import { Treatment } from './treatment'

export class Simulation {
  dt = 0.01
  speed = 1
  time = 0
  running = false
  adjustProb: number
  treatment1: Treatment
  treatment2: Treatment
  canvas1: HTMLCanvasElement
  canvas2: HTMLCanvasElement
  renderer1: Renderer
  renderer2: Renderer
  groupCountInput: HTMLInputElement
  speedInput: HTMLInputElement
  betaInput1: HTMLInputElement
  betaInput2: HTMLInputElement
  timeSpan: HTMLSpanElement
  button: HTMLButtonElement

  constructor () {
    this.adjustProb = 0
    this.treatment1 = new Treatment()
    this.treatment2 = new Treatment()
    this.canvas1 = document.getElementById('canvas1') as HTMLCanvasElement
    this.canvas2 = document.getElementById('canvas2') as HTMLCanvasElement
    this.renderer1 = new Renderer(this.treatment1, this.canvas1)
    this.renderer2 = new Renderer(this.treatment1, this.canvas2)
    this.button = document.getElementById('simulateButton') as HTMLButtonElement
    this.groupCountInput = document.getElementById('groupCountInput') as HTMLInputElement
    this.speedInput = document.getElementById('speedInput') as HTMLInputElement
    this.betaInput1 = document.getElementById('betaInput1') as HTMLInputElement
    this.betaInput2 = document.getElementById('betaInput2') as HTMLInputElement
    this.timeSpan = document.getElementById('timeSpan') as HTMLSpanElement
    setInterval(() => this.step(), 1000 * this.dt)
    this.button.onclick = () => {
      if (this.running) this.stop()
      else this.start()
    }
  }

  start (): void {
    const groupCount = Number(this.groupCountInput.value)
    const speed = Number(this.speedInput.value)
    const B1 = Number(this.betaInput1.value)
    const B2 = Number(this.betaInput2.value)
    console.log('start')
    this.speed = speed
    this.time = 0
    this.adjustProb = 2 * this.speed * this.dt
    this.treatment1.start(groupCount, B1)
    this.treatment1.start(groupCount, B2)
    this.button.style.backgroundColor = 'rgb(255,100,100)'
    this.button.innerHTML = 'Stop'
    this.running = true
  }

  stop (): void {
    console.log('stop')
    this.button.style.backgroundColor = 'rgb(0,255,0)'
    this.button.innerHTML = 'Start'
    this.running = false
  }

  step (): void {
    this.timeSpan.innerHTML = this.time.toFixed(1)
    if (!this.running) return
    this.time += this.dt
    this.treatment1.step(this.adjustProb)
  }
}
