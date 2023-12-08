import {assertEquals} from "$std/assert/mod.ts";
import * as path from "$std/path/mod.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));

import {part1, part2} from "./utils.ts";

Deno.test("Part1", async (t) => {
    await t.step("Example", () => {
        const inputFile = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`
        assertEquals(part1(inputFile, {red: 12, green: 13, blue: 14}), {sum: 8, possible: [1, 2, 5]});
    })
    await t.step("Challenge", () => {
        const inputFile = Deno.readTextFileSync(path.join(__dirname, './part1-input.txt'))
        assertEquals(part1(inputFile, {red: 12, green: 13, blue: 14}).sum, 2076);
    });
});
Deno.test("Part2", async (t) => {
    await t.step("Example", () => {
        const inputFile = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`
        assertEquals(part2(inputFile), 2286);
    })
    await t.step("Challenge", () => {
        const inputFile = Deno.readTextFileSync(path.join(__dirname, './part2-input.txt'))
        assertEquals(part2(inputFile), 70950);
    });
});