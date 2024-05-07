// https://fullstackopen.com/osa4/backendin_testaaminen

const { test, describe, after, beforeEach } = require("node:test")
const assert = require("node:assert")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Note = require("../models/note")
const { initialNotes, notesInDb } = require("./test_helper")

const api = supertest(app)

beforeEach(async () => {
    await Note.deleteMany({})
    await Note.insertMany(initialNotes)
})

describe("notes api", () => {
    test("notes are returned as json", async () => {
        await api
            .get("/api/notes")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    })

    test("there are two notes", async () => {
        const response = await api.get("/api/notes")

        assert.strictEqual(response.body.length, 2)
    })

    test("the notes contain a note about HTML is easy", async () => {
        const response = await api.get("/api/notes")
        const contents = response.body.map((e) => e.content)

        assert.strictEqual(contents.includes("HTML is easy"), true)
    })

    test("the first note about HTTP methods", async () => {
        const response = await api.get("/api/notes")
        const contents = response.body[0]

        assert.strictEqual(contents.content, "HTML is easy")
    })

    describe("get methods", () => {
        test("should get note with id", async () => {
            const notesAtStart = await notesInDb()
            const { id } = notesAtStart[0]

            const response = await api.get(`/api/notes/${id}`).expect(200)

            const { content, important } = response.body

            assert.deepStrictEqual(
                { content, important },
                {
                    content: 'HTML is easy',
                    important: false
                })
        })

        test.skip("should not get note with invalid id", async () => {
            await api.get("/api/notes/invalid-id-here")
                .expect(500)
        })
    })

    describe("post methods", () => {
        test("a valid note can be added", async () => {
            const newNote = {
                content: "async/await is cool",
                important: true
            }

            const responseBefore = await api.get("/api/notes")
            assert.strictEqual(responseBefore.body.length, 2)

            await api.post("/api/notes")
                .send(newNote)
                .expect(201)
                .expect("content-type", /application\/json/)

            const response = await api.get("/api/notes")
            assert.strictEqual(response.body.length, 3)

            const contents = response.body.map(({ content }) => content)

            assert(contents.includes("async/await is cool"))
        })

        test("note without content can not be saved", async () => {
            const newNote = {
                important: true
            }

            await api.post("/api/notes")
                .send(newNote)
                .expect(500)

            const response = await api.get("/api/notes")
            assert.strictEqual(response.body.length, 2)
        })

        test("note without 'important' key can not be saved", async () => {
            const newNote = {
                content: "async/await is cool",
            }

            await api.post("/api/notes")
                .send(newNote)
                .expect(500)

            const response = await api.get("/api/notes")
            assert.strictEqual(response.body.length, 2)
        })

        test("note with important = false can be saved", async () => {
            const newNote = {
                content: "important is cool?",
                important: false
            }

            await api.post("/api/notes")
                .send(newNote)
                .expect(201)
                .expect("content-type", /application\/json/)

            const response = await api.get("/api/notes")
            assert.strictEqual(response.body.length, 3)
            assert.strictEqual(response.body[2].important, false)
        })
    })

    describe("delete methods", () => {
        test("should delete note", async () => {
            const notesAtStart = await notesInDb()
            const noteToDelete = notesAtStart[0]

            await api.delete(`/api/notes/${noteToDelete.id}`).expect(204)

            const notesAtEnd = await notesInDb()

            const contents = notesAtEnd.map(({ content }) => content)

            assert(!contents.includes(noteToDelete.content))
            assert.strictEqual(notesAtEnd.length, 1)
        })
    })
})

after(async () => {
    await mongoose.connection.close()
})