const Datastore = require('nedb-promises');
const Nedb = require('nedb-promises');

const db = new Datastore({filename: './data/notes.db', autoload: true});

async function add(note) {
    return await db.insert(note);
}

async function getNote(id) {
    return await db.findOne({_id: '' + id + ''});
}

async function getAllSortByCompletedUntil(showFinished, sortAscending) {
    if (showFinished === true) {
        return db.find({}).sort({completedUntil: sortAscending ? 1 : -1});
    }
    return db.find({completed: {$ne: 1}}).sort({completedUntil: sortAscending ? 1 : -1});
}

async function getAllSortByCreationDate(showFinished, sortAscending) {
    if (showFinished === true) {
        return db.find({}).sort({creationDate: sortAscending ? 1 : -1});
    }
    return db.find({completed: {$ne: 1}}).sort({creationDate: sortAscending ? 1 : -1});
}

async function getAllSortByImportance(showFinished, sortAscending) {
    if (showFinished === true) {
        return db.find({}).sort({importance: sortAscending ? 1 : -1});
    }
    return db.find({completed: {$ne: 1}}).sort({importance: sortAscending ? 1 : -1});
}

async function update(note) {
    return db.update({_id: note._id}, {$set: {...note}});
}


module.exports = {
    add,
    update,
    getNote,
    getAllSortByCompletedUntil,
    getAllSortByCreationDate,
    getAllSortByImportance
};