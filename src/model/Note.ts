class Note {
    title: string;
    content: string;
    importance: number;
    completed: boolean;
    completedUntil: Date;
    creationDate: Date;

    constructor(title: string, content: string, importance: number, completed: boolean, completedUntil: Date, creationDate: Date) {
        this.title = title;
        this.content = content;
        this.importance = importance;
        this.completed = completed;
        this.completedUntil = completedUntil;
        this.creationDate = creationDate;
    }
}

module.exports = {Note};