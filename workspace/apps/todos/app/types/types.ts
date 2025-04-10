export interface Todo {
    text: string;
    status: "completed" | "active" ;
    id?: string;  
}