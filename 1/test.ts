import {assertEquals} from "$std/assert/mod.ts";
import * as path from "$std/path/mod.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));

import {part1, part2} from "./utils.ts";

Deno.test("Part1", async (t) => {
    await t.step("Example", () => {
        const inputFile = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`
        assertEquals(part1(inputFile), 142);
    })
    await t.step("Challenge", () => {
        const inputFile = Deno.readTextFileSync(path.join(__dirname, './part1-input.txt'))
        assertEquals(part1(inputFile), 55607);
    });
});
Deno.test("Part2", async (t) => {
    await t.step("Example", () => {
        const inputFile = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`
        assertEquals(part2(inputFile), 281);
    })
    await t.step("Challenge", () => {
        const inputFile = Deno.readTextFileSync(path.join(__dirname, './part2-input.txt'))
        assertEquals(part2(inputFile), 55291);
    });
});