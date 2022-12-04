// in Windows, run 'type input.txt | node day3.js'
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

const unique = (value, index, compartment) => (compartment.indexOf(value) === index)

class Rucksack {
  constructor(input) {
    this.typesInFirstCompartment = input.slice(0, input.length / 2).split('').filter(unique)
    this.typesInSecondCompartment = input.slice(input.length / 2).split('').filter(unique)
  }

  getErrorType() {
    return this.typesInFirstCompartment.filter(value => (this.typesInSecondCompartment.indexOf(value) >= 0))[0]
  }
}

const parseInput = data => {
  return data.map(input => (new Rucksack(input)))
}

const calculatePriority = type => {
  if (!type) return 0

  const charCode = type.charCodeAt()
  if (charCode > 90) return charCode - 96
  else return charCode - 38
}

const getCommonType = rucksacks => {
  const [types1, ...typesOthers] = rucksacks.map(r => (r.typesInFirstCompartment.concat(r.typesInSecondCompartment)))

  return types1.filter(type => (typesOthers.every(types => (types.includes(type)))))[0]
}

; (async () => {
  const data = await readInput()

  const rucksacks = parseInput(data)

  // Part 1
  console.log(rucksacks.reduce((total, r, _) => (total + calculatePriority(r.getErrorType())), 0))

  // Part 2
  const rucksackGroups = rucksacks.reduce((groups, r, index) => {
    if ((index % 3) === 0) groups.push([])
    groups[groups.length - 1].push(r)
    return groups
  }, [])

  console.log(rucksackGroups.reduce((total, group, _) => (total + calculatePriority(getCommonType(group))), 0))
})()
