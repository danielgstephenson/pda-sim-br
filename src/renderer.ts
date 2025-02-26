import { Treatment } from './treatment'

export class Renderer {
  treatment: Treatment
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  playerColor = 'rgb(0,170,0)'
  eqColor = 'rgb(0,100,255)'
  size = 800
  box = { x: 0, y: 0, width: 0, height: 0 }
  Y1 = 0
  Y2 = 0
  D1 = 0
  D2 = 0
  A1 = 0
  A2 = 0

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
    this.context.fillStyle = 'black'
    this.context.textAlign = 'center'
    this.context.textBaseline = 'middle'
    this.context.font = '5vmin sans-serif'
    this.context.fillText('Y', this.Y1, this.Y2 - 30)
    this.context.fillText('D', this.D1 - 30, this.D2 + 30)
    this.context.fillText('A', this.A1 + 30, this.A2 + 30)
    this.context.lineJoin = 'round'
    this.context.lineWidth = 10
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
