const express = require("express");
const cors = require("cors")
const helmet = require("helmet")
const { body, validationResult } = require("express-validator")

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
app.use(helmet())
app.use(cors())

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log("kello: ", new Date())
    console.log('---')
    console.log("render vai localhost?")
    console.log('---')
    next()
}


app.use(requestLogger)


const generateId = () => {
    const lastId = notes.length ?
        Math.max(...notes.map(({ id }) => id)) :
        0

    return lastId + 1
}


app.get("/", (request, response) => {
    response.send("<h1>hello world</h1>")
})

app.get("/api/notes", (request, response) => {
    response.json(notes)
})

// /api/notes/10 :id = 10, -> request.params = {id: 10}
app.get("/api/notes/:id", (request, response) => {
    console.log("request.params", request.params)
    const id = Number(request.params.id)
    console.log("id", id)
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

/*
    {
        content: "",
        important: true
    }
*/
app.post("/api/notes",
    body("content").notEmpty().isLength({ min: 3, max: 150 }),
    body("important").isBoolean(),
    (request, response, next) => {
        const result = validationResult(request);

        if (!result.isEmpty()) {
            return next(result.errors.map(({ msg, path }) => `${path}: ${msg}`))
        }

        console.log("mennään tässä")

        // spread syntax
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        const newNote = {
            ...request.body,
            id: generateId()
        }

        notes.push(newNote)

        response.status(201).json(newNote)
    })

app.put("/api/notes/:id", (request, response) => {
    const id = Number(request.params.id)
    const body = request.body

    notes = notes.map((note) => {
        if (Number(note.id) === id) {
            return { ...body, id }
        }

        return note
    })

    response.json(body)
})


const unknownEndpoint = (request, response) => {
    const path = request.path
    response.status(404).send({ error: 'unknown endpoint', path })
}

app.use(unknownEndpoint)

const handleErrors = (error, request, response, next) => {
    response.status(400).json({error})
}

app.use(handleErrors)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}.`)
});

console.log("hello world");

