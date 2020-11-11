function Note(title, content, importance, completed, completedUntil, creationDate) {
    this.title = title;
    this.content = content;
    this.importance = importance;
    this.completed = completed;
    this.completedUntil = completedUntil;
    this.creationDate = creationDate;
}

module.exports = {Note: Note};