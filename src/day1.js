// in Windows, run 'type input.txt | node day1.js'
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

const parseInput = data => {
  return data.reduce((items, number, _) => {
    if (!number) {
      items.push([])
    } else {
      items[items.length - 1].push(parseInt(number))
    }
    return items
  }, [[]])
}

const calculateTotalCaloriesByElves = invetories => {
  return invetories.map(calories => (calories.reduce((total, calory, _) => (total + calory), 0)))
}

; (async () => {
  const data = await readInput()

  const inventoriesByElves = parseInput(data)
  const calories = calculateTotalCaloriesByElves(inventoriesByElves)
  calories.sort((a, b) => (b - a))

  // Part 1
  console.log(calories[0])

  // Part 2
  console.log(calories[0] + calories[1] + calories[2])
})()
