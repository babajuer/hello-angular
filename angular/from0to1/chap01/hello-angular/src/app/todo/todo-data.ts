import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from './todo.model';

export class InMemoryTodoDbService implements InMemoryDbService{
    createDb(){
        let todos: Todo[] = [
                {
                "id": "f823b191-7799-438d-8d78-fcb1e468fc78",
                "desc": "fbj1",
                "completed": false
                },
                {
                "id": "c316a3bf-b053-71f9-18a3-0073c7ee3b76",
                "desc": "fbj2",
                "completed": false
                },
                {
                "id": "dd65a7c0-e24f-6c66-862e-0999ea504ca0",
                "desc": "getting up3",
                "completed": false
                }
            ];
        return { mockDatas : todos};
    }
}