const express = require("express");
const cors = require("cors")
const helmet = require("helmet")
const { body, validationResult } = require("express-validator")
const Note = require("./models/note")

const app = express()

app.use(express.static("dist"))
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

app.get("/api/notes", (request, response, next) => {
    Note.find({})
        .then(notes => response.json(notes))
        .catch(next)
})

// /api/notes/10 :id = 10, -> request.params = {id: 10}
app.get("/api/notes/:id", (request, response, next) => {
    console.log("request.params", request.params)

    Note.findById(request.params.id)
        .then(note => {
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
        .catch((error) => {
            next(new Error("malformatted id"))
        })

})

app.delete("/api/notes/:id", (request, response, next) => {
    Note.deleteOne({ _id: request.params.id }).then(() => {
        response.status(204).end()
    })
        .catch(next)
})

app.post("/api/notes",
    body("content").notEmpty().isLength({ min: 3, max: 150 }),
    body("important").isBoolean(),
    (request, response, next) => {
        const result = validationResult(request);

        if (!result.isEmpty()) {
            return next(result.errors.map(({ msg, path }) => `${path}: ${msg}`))
        }

        console.log("body", request.body)
        console.log("body content", request.body.content)
        console.log("body important", request.body.important)

        // spread syntax
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        const note = new Note({
            content: request.body.content,
            important: request.body.important || false
        })

        note.save()
            .then(result => {
                console.log('note saved!')
                console.log("result", result)
                response.status(201).json(result)
            })
            .catch(next)
    })

app.put("/api/notes/:id", (request, response, next) => {
    const { id } = request.body
    const note = {
        content: request.body.content,
        impotant: request.body.important || false
    }

    Note.findByIdAndUpdate(id, note, { new: true, runValidators: true, context: 'query' })
        .then((result) => {
            response.json(result)
        })
        .catch(next)
})


const unknownEndpoint = (request, response) => {
    const path = request.path
    response.status(404).send({ error: 'unknown endpoint', path })
}

app.use(unknownEndpoint)

const handleErrors = (error, request, response, next) => {
    console.error(error)
    response.status(400).json({ error: error.message || error })
}

app.use(handleErrors)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}.`)
});

console.log("hello world");

