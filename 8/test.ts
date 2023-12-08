import {assertEquals} from "$std/assert/mod.ts";
import * as path from "$std/path/mod.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));

import {part1, part2} from "./utils.ts";

Deno.test("Part1", async (t) => {
    await t.step("Example", () => {
        const inputFile = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`
        assertEquals(part1(inputFile), 2);
    })
    await t.step("Example 2", () => {
        const inputFile = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`
        assertEquals(part1(inputFile), 6);
    })
    await t.step("Challenge", () => {
        const inputFile = Deno.readTextFileSync(path.join(__dirname, './part1-input.txt'))
        assertEquals(part1(inputFile), 16897);
    });
});
Deno.test("Part2", async (t) => {
    await t.step("Example", () => {
        const inputFile = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`
        assertEquals(part2(inputFile), 6);
    })
    await t.step("Challenge", () => {
        const inputFile = Deno.readTextFileSync(path.join(__dirname, './part2-input.txt'))
        assertEquals(part2(inputFile), 16_563_603_485_021);
    });
});