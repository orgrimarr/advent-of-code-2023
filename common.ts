export function getLines(input: string): string[] {
    return input.trim()
        .split('\n').map(line => line.trim())
}