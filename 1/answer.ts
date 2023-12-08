import * as path from "$std/path/mod.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));

import {part1, part2} from "./utils.ts";

console.log()
console.log(`Day ${path.basename(__dirname)}`)
console.log('- Part 1: ', part1(Deno.readTextFileSync(path.join(__dirname, './part1-input.txt'))))
console.log('- Part 2: ', part2(Deno.readTextFileSync(path.join(__dirname, './part2-input.txt'))))