// in Windows, run 'type input.txt | node day4.js'
const { groupEnd } = require('console')
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

class Section {
  constructor(input) {
    [this.begin, this.end] = input.split('-').map(n => parseInt(n))
  }

  isFullyContaining(other) {
    return this.begin <= other.begin && this.end >= other.end
  }

  isOverlapped(other) {
    return !(this.end < other.begin || this.begin > other.end)
  }
}

const parseInput = data => {
  return data.map(input => input.split(',').map(section => new Section(section)))
}

const isFullContained = (sections) => {
  const [section1, section2] = sections
  return section1.isFullyContaining(section2) || section2.isFullyContaining(section1)
}

const isOverlapped = (sections) => {
  const [section1, section2] = sections
  return section1.isOverlapped(section2)
}

; (async () => {
  const data = await readInput()

  const sectionPairs = parseInput(data)

  // Part 1
  console.log(sectionPairs.filter(isFullContained).length)

  // Part 2
  console.log(sectionPairs.filter(isOverlapped).length)
})()
