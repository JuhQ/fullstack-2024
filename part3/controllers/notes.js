const notesRouter = require('express').Router();
const { body, validationResult } = require('express-validator');
const Note = require('../models/note');
const logger = require('../utils/logger');

notesRouter.get('', (request, response, next) => {
  Note.find({})
    .then((notes) => response.json(notes))
    .catch(next);
});

// /10 :id = 10, -> request.params = {id: 10}
notesRouter.get('/:id', (request, response, next) => {
  logger.info('request.params', request.params);

  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).json({
          error: 'no note found',
          request: {
            id: request.params.id,
          },
        });
      }
    })
    .catch(() => {
      next(new Error('malformatted id'));
    });
});

notesRouter.delete('/:id', (request, response, next) => {
  Note.deleteOne({ _id: request.params.id }).then(() => {
    response.status(204).end();
  })
    .catch(next);
});

notesRouter.post(
  '',
  body('content').notEmpty().isLength({ min: 3, max: 150 }),
  body('important').isBoolean(),
  (request, response, next) => {
    const result = validationResult(request);

    if (!result.isEmpty()) {
      return next(result.errors.map(({ msg, path }) => `${path}: ${msg}`));
    }

    logger.info('body', request.body);
    logger.info('body content', request.body.content);
    logger.info('body important', request.body.important);

    // spread syntax
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    const note = new Note({
      content: request.body.content,
      important: request.body.important || false,
    });

    note.save()
      .then((savedNote) => {
        logger.info('note saved!');
        logger.info('result', savedNote);
        response.status(201).json(savedNote);
      })
      .catch(next);
  },
);

notesRouter.put('/:id', (request, response, next) => {
  const { id } = request.body;
  const note = {
    content: request.body.content,
    important: request.body.important || false,
  };

  Note.findByIdAndUpdate(id, note, { new: true, runValidators: true, context: 'query' })
    .then((result) => {
      response.json(result);
    })
    .catch(next);
});

module.exports = notesRouter;
