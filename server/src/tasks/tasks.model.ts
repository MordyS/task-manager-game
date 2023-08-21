import { IsInt, IsNotEmpty } from "class-validator";

export class Task {
    id: number;
    name: string;
    score: number;
    createdBy: string;
    editedBy: string;
}

export class TaskDto {
    
    // @IsInt()
    // id?: number;
    
    @IsNotEmpty()
    name: string;

    @IsInt()
    score: number;

}