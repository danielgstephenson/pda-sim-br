import { Treatment } from './treatment'

export class Renderer {
  treatment: Treatment
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  playerColor = 'rgb(0,170,0)'
  eqColor = 'rgb(0,100,255)'
  box = { x: 0.1, y: 0.1, width: 0.8, height: 0.8 }

  constructor (treatment: Treatment, canvas: HTMLCanvasElement) {
    this.treatment = treatment
    this.canvas = canvas
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.draw()
  }

  draw (): void {
    window.requestAnimationFrame(() => this.draw())
    this.setupCanvas()
    const Y1 = this.box.x + this.box.width * 0.5
    const Y2 = this.box.y
    const D1 = this.box.x
    const D2 = this.box.y + this.box.height * Math.sqrt(0.75)
    const A1 = this.box.x + this.box.width
    const A2 = this.box.y + this.box.height * Math.sqrt(0.75)
    this.context.lineJoin = 'round'
    this.context.lineWidth = 0.01
    this.context.strokeStyle = 'black'
    this.context.beginPath()
    this.context.moveTo(Y1, Y2)
    this.context.lineTo(D1, D2)
    this.context.lineTo(A1, A2)
    this.context.closePath()
    this.context.stroke()
    this.context.fillStyle = this.playerColor
  }

  setupCanvas (): void {
    this.canvas.width = 800
    this.canvas.height = 800
    this.context.resetTransform()
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.context.scale(this.canvas.width, this.canvas.width)
  }
}
