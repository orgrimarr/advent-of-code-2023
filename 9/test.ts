import {assertEquals} from "$std/assert/mod.ts";
import * as path from "$std/path/mod.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));

import {part1, part2} from "./utils.ts";

Deno.test("Part1", async (t) => {
    await t.step("Example", () => {
        const inputFile = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`
        assertEquals(part1(inputFile), {sum: 114, linesExtrapolation: [18, 28, 68]});
    })
    await t.step("Challenge", () => {
        const inputFile = Deno.readTextFileSync(path.join(__dirname, './part1-input.txt'))
        assertEquals(part1(inputFile).sum, 1762065988);
    });
});
Deno.test("Part2", async (t) => {
    await t.step("Example", () => {
        const inputFile = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`
        assertEquals(part2(inputFile), {sum: 2, linesExtrapolation: [-3, 0, 5]});
    })
    await t.step("Challenge", () => {
        const inputFile = Deno.readTextFileSync(path.join(__dirname, './part2-input.txt'))
        assertEquals(part2(inputFile).sum, 1066);
    });
});