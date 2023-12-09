import {getLines} from "../common.ts";

type Line = number[]

function isZeroLine(line: Line): boolean {
    if (line.length === 0) {
        return true
    }
    return line.every(char => char === 0)
}

function getLineDiff(line: Line): Line {
    if (line.length < 2) {
        return [0]
    }
    const diff = []
    for (let i = 0; i < line.length - 1; i++) {
        const current = line[i]
        const next = line[i + 1]
        diff.push(next - current)
    }
    return diff
}

function getLastLine(lines: Line[]): Line {
    return lines[lines.length - 1] ?? []
}

function solve(lines: Line[]): { sum: number, linesExtrapolation: Line } {
    const linesExtrapolation: Line = []
    for (const lineIndex in lines) {
        const line = lines[lineIndex]
        const diffLines = [getLineDiff(line)]
        while (!isZeroLine(getLastLine(diffLines))) {
            diffLines.push(getLineDiff(getLastLine(diffLines)))
        }
        getLastLine(diffLines).push(0) // Start by adding a new zero to the end of your list
        for (let i = diffLines.length - 1; i > 0; i--) {
            const thisLineLastChar = diffLines[i].at(-1) ?? 0
            const previousLine = diffLines[i - 1]
            const previousLineLastChar = previousLine.at(-1) ?? 0
            const extrapolate = previousLineLastChar + thisLineLastChar
            previousLine.push(extrapolate)
        }
        const firstLineLastNumber = line.at(-1) ?? 0
        const lastDiffNumber = diffLines[0].at(-1) ?? 0
        const extrapolate = lastDiffNumber + firstLineLastNumber
        linesExtrapolation.push(extrapolate)
    }
    const sum = linesExtrapolation.reduce((a, b) => a + b, 0)
    return {
        sum,
        linesExtrapolation
    }
}

export function part1(inputFile: string): { sum: number, linesExtrapolation: Line } {
    const lines = getLines(inputFile)
        .map(line => {
            return line
                .split(' ')
                .map(char => parseInt(char))
        })
    return solve(lines)
}


export function part2(inputFile: string): { sum: number, linesExtrapolation: Line } {
    const lines = getLines(inputFile)
        .map(line => {
            return line
                .split(' ')
                .map(char => parseInt(char))
                .toReversed() // LOL
        })
    return solve(lines)
}
