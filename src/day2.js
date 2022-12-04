// in Windows, run 'type input.txt | node day2.js'
const readline = require('readline')

const readInput = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
  })

  const output = []
  for await (const line of rl) {
    output.push(line)
  }
  return output
}

class Shape {
  static TYPES = {
    'A': 'rock',
    'B': 'paper',
    'C': 'scissor',
    'X': 'rock',
    'Y': 'paper',
    'Z': 'scissor'
  }
  static SCORES = {
    'rock': 1,
    'paper': 2,
    'scissor': 3
  }
  static WINNING = {
    'rock': 'scissor',
    'paper': 'rock',
    'scissor': 'paper'
  }
  constructor(symbol) {
    this.type = this.parseType(symbol)
  }

  parseType(symbol) {
    return Shape.TYPES[symbol]
  }

  win(shape) {
    return Shape.WINNING[this.type] === shape.type
  }

  shapeScore() { return Shape.SCORES[this.type]}
}

class Round {
  constructor(input) {
    const symbols = input.split(' ')
    this.opponentShape = new Shape(symbols[0])
    this.playerShape = new Shape(symbols[1])
    this.score = this.playerShape.shapeScore() + this.getOutcomeScore()
  }

  getOutcomeScore() {
    if (this.opponentShape.win(this.playerShape)) {
      return 0
    } else if (this.playerShape.win(this.opponentShape)) {
      return 6
    } else {
      return 3
    }
  }
}

class RoundWithOutcome {
  constructor(input) {
    const [symbol, outcome] = input.split(' ')
    this.opponentShape = new Shape(symbol)
    this.playerShape = this.generatePlayerShape(outcome)
    this.score = this.playerShape.shapeScore() + this.getOutcomeScore(outcome)
  }

  generatePlayerShape(outcome) {
    const playerShape = new Shape('')
    if (outcome === 'X') {
      playerShape.type = Shape.WINNING[this.opponentShape.type]
    } else if (outcome === 'Y') {
      playerShape.type = this.opponentShape.type
    } else if (outcome === 'Z') {
      playerShape.type = Object.keys(Shape.WINNING).find(key => Shape.WINNING[key] === this.opponentShape.type)
    }
    return playerShape
  }

  getOutcomeScore(outcome) {
    if (outcome === 'X') {
      return 0
    } else if (outcome === 'Y') {
      return 3
    } else if (outcome === 'Z') {
      return 6
    }
  }
}

const parseInput = data => {
  return data.map(input => new Round(input))
}

const parseInputPart2 = data => {
  return data.map(input => new RoundWithOutcome(input))
}

; (async () => {
  const data = await readInput()

  // Part 1
  const rounds = parseInput(data)
  console.log(rounds.reduce((total, r, _) => (total + r.score), 0))

  // Part 2
  const rounds2 = parseInputPart2(data)
  console.log(rounds2.reduce((total, r, _) => (total + r.score), 0))
})()
