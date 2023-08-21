export interface ITask {
    id: number;
    name: string;
    score: number;
    createdBy: string;
    editedBy: string;
}

export class Task implements ITask {
    id: number;
    name: string;
    score: number;
    createdBy: string;
    editedBy: string;
    constructor(task?: any) {
        this.id = task?.id;
        this.name = task?.name;
        this.score = task?.score;
        this.createdBy = task?.createdBy;
        this.editedBy = task?.editedBy;
    }
}