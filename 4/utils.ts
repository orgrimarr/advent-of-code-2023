import {getLines} from "../common.ts";

type Box = {
    value: number,
    checked: boolean
}

type Card = {
    winning: Box[],
    scratchcard: Box[]
}

type CardCollection = {
    count: number,
    card: Card
}

function initBox(value: number): Box {
    return {
        value,
        checked: false
    }
}

function initCardCollection(card: Card): CardCollection {
    return {count: 1, card}
}

function getScore(matches: number): number {
    if (matches === 0) {
        return 0
    }
    if (matches === 0) {
        return 1
    }
    return Math.pow(2, matches - 1);
}

function parseInput(inputFile: string): Card[] {
    const cards: Card[] = []
    const lines: string[] = getLines(inputFile)
        .map(line => line.split(':')[1].trim())
    for (const line of lines) {
        const [winning, scratchcard] = line.split('|').map(str => {
            return str
                .trim()
                .split(' ')
                .map(nbr => parseInt(nbr.trim()))
        })
        cards.push({
            winning: winning.map(initBox),
            scratchcard: scratchcard.map(initBox)
        });
    }
    return cards
}


function solveCard(originalCard: Card): Card {
    const card = structuredClone(originalCard)
    const {winning, scratchcard} = card;
    for (const box of scratchcard) {
        for (const winBox of winning) {
            if (!winBox.checked && box.value === winBox.value) {
                box.checked = true
                winBox.checked = true
            }
        }
    }
    return card
}

export function part1(inputFile: string): number {
    const cards = parseInput(inputFile);
    let sum = 0
    for (const card of cards) {
        const solvedCard = solveCard(card)
        sum += getScore(solvedCard.scratchcard.filter(box => box.checked).length);
    }
    return sum;
}

export function part2(inputFile: string): number {
    const cards = parseInput(inputFile);
    const cardsCollection = cards.map(initCardCollection)
    for (const collectionIndex in cardsCollection) {
        const collectionIndexNumber = parseInt(collectionIndex)
        const collection = cardsCollection[collectionIndex]
        const solvedCard = solveCard(collection.card)
        const matches = solvedCard.scratchcard.filter(box => box.checked).length
        for (let i = 1; i <= matches; i++) {
            const nextCollectionIndex = collectionIndexNumber + i
            cardsCollection[nextCollectionIndex].count += collection.count
        }
    }
    return cardsCollection
        .map(collection => collection.count)
        .reduce((a, b) => a + b, 0);
}