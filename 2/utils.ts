type Rules = {
    [key: string]: number
    blue: number,
    red: number,
    green: number
}

export function part1(inputFile: string, rules: Rules): { sum: number, possible: number[] } {
    const lines = inputFile
        .split('\n').map(line => line.trim())
    const parsed = lines.map(line => {
        return {
            id: parseInt(line.split(':')[0].split(' ')[1]),
            sets: line
                .split(':')[1]
                .split(/[;]/)
                .map(sets => sets.trim())
                .map(sets => {
                    return {
                        possible: false,
                        sets: sets.split(/[,]/).map(sets => sets.trim()).flatMap(cube => {
                            const [number, color] = cube.split(' ')
                            return {number: parseInt(number), color}
                        })
                    }

                })
        }
    })
    const summed = parsed.map(game => {
        for (const set of game.sets) {
            const sum: Rules = {red: 0, blue: 0, green: 0}
            for (const cube of set.sets) {
                for (const color of Object.keys(sum)) {
                    if (cube.color === color) {
                        sum[color] += cube.number
                    }
                }
            }
            set.possible = sum.red <= rules.red && sum.blue <= rules.blue && sum.green <= rules.green
        }

        return game
    })
    const possible = summed.filter(game => {
        return !game.sets.some(set => set.possible === false)
    })
    return {
        sum: possible.map(game => game.id).reduce((a, b) => a + b, 0),
        possible: possible.map(game => game.id)
    }
}


export function part2(inputFile: string): number {
    const lines = inputFile
        .split('\n').map(line => line.trim())
    const parsed = lines.map(line => {
        return {
            id: parseInt(line.split(':')[0].split(' ')[1]),
            sets: line
                .split(':')[1]
                .split(/[;]/)
                .map(sets => sets.trim())
                .map(sets => {
                    return {
                        possible: false,
                        sets: sets.split(/[,]/).map(sets => sets.trim()).flatMap(cube => {
                            const [number, color] = cube.split(' ')
                            return {number: parseInt(number), color}
                        })
                    }

                })
        }
    })
    const summed = parsed.map(game => {
        const rule: Rules = {red: 0, blue: 0, green: 0}
        for (const set of game.sets) {
            for (const cube of set.sets) {
                for (const color of Object.keys(rule)) {
                    if (cube.color === color && cube.number > rule[color]) {
                        rule[color] = cube.number
                    }
                }
            }
        }
        return rule.red * rule.blue * rule.green
    })
    return summed.reduce((a, b) => a + b, 0)
}