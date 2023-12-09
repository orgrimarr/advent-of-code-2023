import {getLines} from "../common.ts";

type Maze = {
    [key: string]: {
        R: string,
        L: string
    }
}

export function part1(inputFile: string): number {
    const lines = getLines(inputFile)
    const map = lines[0].split('').map(dir => dir.trim()) as 'R'[] & 'L'[]
    const mazeLines = lines
        .slice(2)
    const maze: Maze = {}
    for (const node of mazeLines) {
        const nodeName = node.split('=')[0].trim()
        const [L, R] = node
            .split('=')[1]
            .replace('(', '')
            .replace(')', '')
            .split(',')
            .map(line => line.trim())
        maze[nodeName] = {R, L}
    }
    let stepCount = 0;
    let currentNode = 'AAA'
    for (let i = 0; i <= map.length; i++) {
        if (i === map.length) {
            i = 0
        }
        currentNode = maze[currentNode][map[i]]
        stepCount++
        if (currentNode === 'ZZZ') {
            break
        }

    }
    return stepCount
}

// Use LCM but it's may not be the best / shortest solution
export function part2(inputFile: string): number {
    function gcd(a: number, b: number): number {
        if (b == 0)
            return a;
        return gcd(b, a % b);
    }

    function lcm(a: number, b: number): number {
        return (a / gcd(a, b)) * b;
    }

    const lines = getLines(inputFile)
    const map = lines[0].split('').map(dir => dir.trim()) as 'R'[] & 'L'[]
    const mazeLines = lines
        .slice(2)
    const maze: Maze = {}
    for (const node of mazeLines) {
        const nodeName = node.split('=')[0].trim()
        const [L, R] = node
            .split('=')[1]
            .replace('(', '')
            .replace(')', '')
            .split(',')
            .map(line => line.trim())
        maze[nodeName] = {R, L}
    }
    let stepCount = 0;
    const currentNodes = Object.keys(maze).filter(node => node.endsWith('A'))
    const nbrOfSteps = new Array(currentNodes.length).fill(0)
    for (let i = 0; i <= map.length; i++) {
        if (i === map.length) {
            i = 0
        }
        stepCount++
        for (let c in currentNodes) {
            currentNodes[c] = maze[currentNodes[c]][map[i]]
            if (currentNodes[c].endsWith('Z')) {
                nbrOfSteps[c] = stepCount
            }
        }
        if (nbrOfSteps.every(nbr => nbr !== 0)) {
            break
        }
    }
    return nbrOfSteps.reduce(lcm)
}