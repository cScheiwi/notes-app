const express = require('express');
const router = express.Router();

const notesController = require('../controllers/notesController');

router.get('/', notesController.index);
router.post('/', notesController.updateSession);

router.get('/note', notesController.showNote);
router.post('/note', notesController.createNote);

router.get('/note/:id', notesController.showNote);
router.post('/note/:id', notesController.updateNote);

module.exports = router;
