import {assertEquals} from "$std/assert/mod.ts";
import * as path from "$std/path/mod.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));

import {part1, part2} from "./utils.ts";

Deno.test("Part1", async (t) => {
    await t.step("Example", () => {
        const inputFile = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`
        assertEquals(part1(inputFile), 4361);
    })
    await t.step("Challenge", () => {
        const inputFile = Deno.readTextFileSync(path.join(__dirname, './part1-input.txt'))
        assertEquals(part1(inputFile), 526404);
    });
});
Deno.test("Part2", async (t) => {
    await t.step("Example", () => {
        const inputFile = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`
        assertEquals(part2(inputFile), 467835);
    })
    await t.step("Challenge", () => {
        const inputFile = Deno.readTextFileSync(path.join(__dirname, './part2-input.txt'))
        assertEquals(part2(inputFile), 84399773);
    });
});