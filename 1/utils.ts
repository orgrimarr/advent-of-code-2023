import {getLines} from "../common.ts";

export function part1(inputFile: string): number {
    const lines = getLines(inputFile)
    const numbers = lines.map(line => {
        const chars = line.split('')
        const first = chars.find(char => !!char.match(/\d/)) ?? '0';
        const last = chars.toReversed().find(char => !!char.match(/\d/)) ?? '0'
        return parseInt(`${first}${last}`)
    })
    return numbers.reduce((n1, n2) => {
        return n1 + n2
    }, 0)
}


export function part2(inputFile: string): number {
    const mapping: { [key: string]: number } = {
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5,
        'six': 6,
        'seven': 7,
        'eight': 8,
        'nine': 9,
    }
    const getNumber = function (line: string, reversed = false): string {
        for (let i = 0; i < line.length; i++) {
            const char = line[reversed ? line.length - i - 1 : i]
            if (char.match(/\d/)) {
                return char
            }
            const currentString = reversed ? line.substring(0, line.length - i)
                : line.substring(i)
            for (const key in mapping) {
                if (reversed ? currentString.endsWith(key) : currentString.startsWith(key)) {
                    return `${mapping[key]}`
                }
            }
        }
        return '0'
    }
    const lines = inputFile
        .split('\n').map(line => line.trim())
    const numbers = lines.map(line => {
        const first = getNumber(line)
        const last = getNumber(line, true)

        return parseInt(`${first}${last}`)
    })
    return numbers.reduce((n1, n2) => {
        return n1 + n2
    }, 0)
}
