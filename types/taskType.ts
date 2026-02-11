export type Todo = {
     id: string;
     title: string;
     completed: boolean 
}
export type Action =
  | { type: 'ADD'; payload: string }
  | { type: 'TOGGLE'; payload: string }
  | { type: 'LOAD'; payload: Todo[] }