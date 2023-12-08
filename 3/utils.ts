type Point = {
    value: string,
    position: {
        line: number,
        column: number
    }
}
type GearWithAdjacent = {
    number: number,
    adjacents: Point[]
}

function isNumber(str: string): boolean {
    return !!str.match(/\d/)
}

function addAdjacent(adjacents: Point[], lines: string[], line: number, column: number): Point[] {
    const alreadyExists = adjacents.some(adj => {
        return adj.position.line === line && adj.position.column === column
    })
    const value = lines[line]?.[column] ?? ''
    const isSymbol = value && !isNumber(value) && value !== '.'
    if (isSymbol && !alreadyExists) {
        return [...adjacents, {
            value,
            position: {
                line,
                column
            }
        }]
    }
    return adjacents
}

function listStarSymbols(lines: string[]): Point[] {
    const points: Point[] = []
    const lineMaxLength = lines[0]?.length ?? 0
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        for (let colIndex = 0; colIndex < lineMaxLength; colIndex++) {
            const currentChar = lines[lineIndex][colIndex] ?? ''
            if (currentChar === '*') {
                points.push({
                    value: currentChar,
                    position: {
                        line: lineIndex,
                        column: colIndex
                    }
                })
            }
        }
    }
    return points
}

function listNumbersWithAdjacents(lines: string[]): GearWithAdjacent[] {
    const result: GearWithAdjacent[] = []
    const lineMaxLength = lines[0]?.length ?? 0
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        let currentNumber = ''
        let adjacents: Point[] = []
        for (let colIndex = 0; colIndex < lineMaxLength; colIndex++) {
            const currentChar = lines[lineIndex][colIndex] ?? ''
            if (isNumber(currentChar)) {
                currentNumber += currentChar
                adjacents = addAdjacent(adjacents, lines, lineIndex - 1, colIndex) // Up
                adjacents = addAdjacent(adjacents, lines, lineIndex + 1, colIndex) // Down
                adjacents = addAdjacent(adjacents, lines, lineIndex, colIndex + 1) // Right
                adjacents = addAdjacent(adjacents, lines, lineIndex, colIndex - 1) // Left
                adjacents = addAdjacent(adjacents, lines, lineIndex - 1, colIndex + 1) // Top Right
                adjacents = addAdjacent(adjacents, lines, lineIndex - 1, colIndex - 1) // Top Left
                adjacents = addAdjacent(adjacents, lines, lineIndex + 1, colIndex + 1) // Bottom Right
                adjacents = addAdjacent(adjacents, lines, lineIndex + 1, colIndex - 1) // Bottom left
            }
            if (!isNumber(currentChar) || colIndex === lineMaxLength - 1) {
                if (currentNumber.length) {
                    result.push({
                        number: parseInt(currentNumber),
                        adjacents: adjacents
                    })
                }
                currentNumber = ''
                adjacents = []
            }
        }
    }

    return result
}

function isValid(numbers: GearWithAdjacent): boolean {
    return numbers.adjacents.length > 0
}

export function part1(inputFile: string): number {
    const lines = inputFile
        .split('\n').map(line => line.trim())
    const gearWithAdjacents = listNumbersWithAdjacents(lines)
    const validNumbers = gearWithAdjacents.filter(isValid)
    // const invalidNumbers = gearWithAdjacents.filter(str => !isValid(str))
    // console.log(invalidNumbers)
    return validNumbers
        .map(nbr => nbr.number)
        .reduce((a, b) => a + b, 0)
}


export function part2(inputFile: string): number {
    const lines = inputFile
        .split('\n').map(line => line.trim())
    const gearWithAdjacents = listNumbersWithAdjacents(lines)
    const stars = listStarSymbols(lines)
    const gearRations: number[] = []
    for (const point of stars) {
        const matchingGears = gearWithAdjacents.filter(gear => {
            return gear.adjacents.some((adjacent => adjacent.position.line === point.position.line && adjacent.position.column === point.position.column))
        })
        if (matchingGears.length > 1) {
            gearRations.push(
                matchingGears
                    .map(gear => gear.number)
                    .reduce((a, b) => a * b, 1)
            )
        }
    }
    return gearRations
        .reduce((a, b) => a + b, 0)
}
