const express = require("express");
const cors = require("cors")
const helmet = require("helmet")

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    },
    {
        id: 4,
        content: "Ollaan sisällä opiskelemassa javascriptiä kun ulkona on aivan mahtava sää",
        important: true
    }
]


const app = express()

app.use(express.json())
// app.use(helmet())
app.use(cors())

app.get("/", (request, response) => {
    response.send("<h1>hello world</h1>")
})

app.get("/api/notes", (request, response) => {
    response.json(notes)
})

// /api/notes/10 :id = 10, -> request.params = {id: 10}
app.get("/api/notes/:id", (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find((n) => Number(n.id) === id)

    if (note) {
        response.json(note)
    } else {
        response.status(404).json({
            error: "no note found",
            request: {
                id: request.params.id
            }
        })
    }
})

app.delete("/api/notes/:id", (request, response) => {
    const id = Number(request.params.id)

    notes = notes.filter((note) => Number(note.id) !== id)

    response.status(204).end()
})


app.post("/api/notes", (request, response) => {
    const lastId = notes.length ?
        Math.max(...notes.map(({id}) => id)) :
        0

    const newNote = {...request.body, id: lastId + 1}
    notes.push(newNote)

    response.status(201).json(newNote)
})

app.put("/api/notes/:id", (request, response) => {
    const id = Number(request.params.id)
    const body = request.body

    notes = notes.map((note) => {
        if(Number(note.id) === id) {
            return {...body, id}
        }

        return note
    })

    response.json(body)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`)
})

console.log("hello world");

