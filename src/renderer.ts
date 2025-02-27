import { Policy, X } from './game'
import { Treatment } from './treatment'

export class Renderer {
  treatment: Treatment
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  size = 800
  box = { x: 0, y: 0, width: 0, height: 0 }
  Y1: number
  Y2: number
  D1: number
  D2: number
  A1: number
  A2: number

  constructor (treatment: Treatment, canvas: HTMLCanvasElement) {
    this.treatment = treatment
    this.canvas = canvas
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.box.x = 0.15 * this.size
    this.box.y = 0.15 * this.size
    this.box.width = 0.7 * this.size
    this.box.height = 0.7 * this.size
    this.Y1 = this.box.x + this.box.width * 0.5
    this.Y2 = this.box.y
    this.D1 = this.box.x
    this.D2 = this.box.y + this.box.height * Math.sqrt(0.75)
    this.A1 = this.box.x + this.box.width
    this.A2 = this.box.y + this.box.height * Math.sqrt(0.75)
    this.draw()
  }

  draw (): void {
    window.requestAnimationFrame(() => this.draw())
    this.setupCanvas()
    this.drawSimplex()
    this.context.beginPath()
    this.context.arc(0.5 * this.size, this.size * 0.5, 0.1, 0, 2 * Math.PI)
    this.context.fill()
    this.drawPolicy(this.treatment.equilibrium, 0.02, 'rgb(0,100,255)', 1)
    this.treatment.groups.forEach(group => {
      this.drawPolicy(group.x1)
      this.drawPolicy(group.x2)
    })
  }

  drawPolicy (policy: Policy, radius = 0.01, color = 'rgb(0,170,0)', alpha = 0.5): void {
    this.context.globalAlpha = alpha
    this.context.fillStyle = color
    const x = (policy.y * this.Y1 + policy.d * this.D1 + policy.a * this.A1) / X
    const y = (policy.y * this.Y2 + policy.d * this.D2 + policy.a * this.A2) / X
    this.context.beginPath()
    this.context.arc(x, y, this.size * radius, 0, 2 * Math.PI)
    this.context.fill()
  }

  drawSimplex (): void {
    this.context.globalAlpha = 1
    this.context.fillStyle = 'black'
    this.context.textAlign = 'center'
    this.context.textBaseline = 'middle'
    this.context.font = '5vmin sans-serif'
    this.context.fillText('Y', this.Y1, this.Y2 - 30)
    this.context.fillText('D', this.D1 - 30, this.D2 + 30)
    this.context.fillText('A', this.A1 + 30, this.A2 + 30)
    this.context.globalAlpha = 0.2
    this.context.lineJoin = 'round'
    this.context.lineWidth = 5
    this.context.strokeStyle = 'black'
    this.context.beginPath()
    this.context.moveTo(this.Y1, this.Y2)
    this.context.lineTo(this.D1, this.D2)
    this.context.lineTo(this.A1, this.A2)
    this.context.closePath()
    this.context.stroke()
  }

  setupCanvas (): void {
    this.context.resetTransform()
    this.canvas.width = this.size
    this.canvas.height = this.size
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}
