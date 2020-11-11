const noteStore = require('../services/noteStore');
const Note = require('../model/Note.js');

async function index(req, res) {
    let sessionUserSettings = req.session.userSettings;
    let notes;

    switch (sessionUserSettings.sortedKey) {
        case 'creationDate':
            notes = await noteStore.getAllSortByCreationDate(sessionUserSettings.showFinished, sessionUserSettings.sortAscending)
            break;
        case 'importance':
            notes = await noteStore.getAllSortByImportance(sessionUserSettings.showFinished, sessionUserSettings.sortAscending)
            break;
        case 'completedUntil':
        default:
            notes = await noteStore.getAllSortByCompletedUntil(sessionUserSettings.showFinished, sessionUserSettings.sortAscending)
            break;
    }

    res.render('index', {'notes': notes, 'session': req.session});
}

async function createNote(req, res) {
    const note = new Note(req.body.noteTitle, req.body.noteContent, req.body.noteImportance, false, req.body.noteCompletedUntil, new Date());
    await noteStore.add(note);

    res.redirect('/');
}

async function showNote(req, res) {
    let note;
    if (req.params.id !== undefined)
        note = await noteStore.getNote(req.params.id);
    else
        // @ts-ignore
        note = new Note("", "", 1, false, null, null);
    res.render('noteDetail', {'note': note, 'session': req.session});
}

async function updateNote(req, res) {
    let note = await noteStore.getNote(req.params.id);
    note.title = req.body.noteTitle;
    note.content = req.body.noteContent;
    note.importance = req.body.noteImportance;
    note.completed = (req.body.noteCompleted === 'on') ? 1 : 0;
    note.completedUntil = req.body.noteCompletedUntil;
    await noteStore.update(note);

    res.redirect('/');
}

async function updateSession(req, res) {
    if (req.body.showFinished !== undefined) req.session.userSettings.showFinished = !req.session.userSettings.showFinished;
    if (req.body.darkTheme !== undefined) req.session.userSettings.darkTheme = !req.session.userSettings.darkTheme;

    if (req.body.showFinished === undefined && req.body.darkTheme === undefined) {

        if (req.body.sortedKey === req.session.userSettings.sortedKey)
            req.session.userSettings.sortAscending = !req.session.userSettings.sortAscending;
        else
            req.session.userSettings.sortedKey = req.body.sortedKey;
    }

    res.redirect('/');
}

module.exports = {index, createNote, showNote, updateNote, updateSession};