// https://fullstackopen.com/osa4/sovelluksen_rakenne_ja_testauksen_alkeet

const { test, describe } = require("node:test")
const assert = require("node:assert")
const { sort } = require("../utils/for_testing")

describe("sort", () => {
    test("should sort empty array", () => {
        const taulukko = []
        const result = sort(taulukko)

        assert.deepStrictEqual(result, [])
    })

    test("should sort array with one value", () => {
        const taulukko = [1]
        const result = sort(taulukko)

        assert.deepStrictEqual(result, [1])
    })

    test("should sort array with two values, which are already sorted", () => {
        const taulukko = [1, 2]
        const result = sort(taulukko)

        assert.deepStrictEqual(result, [1, 2])
    })

    test("should sort array with two values", () => {
        const taulukko = [2, 1]
        const result = sort(taulukko)

        assert.deepStrictEqual(result, [1, 2])
    })

    test("should sort array with ten pseudo-random values", () => {
        const taulukko = [2, 1, 84376, 10, 11, 2, 3, 8, 4, -100]
        const result = sort(taulukko)

        assert.deepStrictEqual(result, [-100, 1, 2, 2, 3, 4, 8, 10, 11, 84376])
    })

    test("should sort array with interview numbers", () => {
        const taulukko = [1, 2, 1, 10, 11, 20, 22, 26, 4, 3, 2, 1]
        const result = sort(taulukko)

        assert.deepStrictEqual(result, [1, 1, 1, 2, 2, 3, 4, 10, 11, 20, 22, 26])
    })

    test("should sort array with interview numbers which are already sorted", () => {
        const taulukko = [1, 1, 1, 2, 2, 3, 4, 10, 11, 20, 22, 26]
        const result = sort(taulukko)

        assert.deepStrictEqual(result, [1, 1, 1, 2, 2, 3, 4, 10, 11, 20, 22, 26])
    })

    test("should not mutate original array", () => {
        const taulukko = [1, -5, 3, 100, 50]
        const result = sort(taulukko)

        assert.deepStrictEqual(result, [-5, 1, 3, 50, 100])
        assert.deepStrictEqual(taulukko, [1, -5, 3, 100, 50])
    })
})