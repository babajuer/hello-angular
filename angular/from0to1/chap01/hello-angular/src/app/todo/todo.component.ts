import { Component, OnInit, Inject } from '@angular/core';
import { Todo } from './todo.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  desc = '';
  constructor(
    @Inject('todoService') private todoService,
    private route: ActivatedRoute,
    private router: Router
    
  ) { }

  ngOnInit() {
    // this.getTodos();
    this.route.params.forEach((params: Params) => {
      let filter = params['filter'];
      this.filterTodos(filter);
    });

  }

  onTextChanges(value){
    this.desc = value;
  }

  addTodo(){
    this.todoService
      .addTodo(this.desc)
      .then(todo => {
        this.todos = [...this.todos, todo];
        this.desc = '';
      });
  }
/*
  toggleTodo(todo: Todo) {
    const i = this.todos.indexOf(todo);
    this.todoService
      .toggleTodo(todo)
      .then( t => {
        this.todos = [
          ...this.todos.slice(0, i),
          t,
          ...this.todos.slice(i + 1)
        ];
      });
  }

  removeTodo(todo: Todo) {
    const i = this.todos.indexOf(todo);
    this.todoService
      .deleteTodoById(todo.id)
      .then(() => {
        this.todos = [
          ...this.todos.slice(0, i),
          ...this.todos.slice(i + 1)

        ];
      })
  }
  */

  /*
  getTodos(): void {
    this.todoService
      .getTodos()
      .then(todos => this.todos = [...todos]);
  }
*/
  filterTodos(filter: string): void{
    this.todoService
        .filterTodos(filter)
        .then(todos => this.todos = [...todos]);
  }

/*
  toggleAll(){
    this.todos.forEach(
      todo => this.toggleTodo(todo)
    );
  }

  clearCompleted(){
    const todos = this.todos.filter (todo => todo.completed === true);
    todos.forEach( todo => this.removeTodo(todo));
  }
*/


  //todo.component.ts片段   返回promise
toggleTodo(todo: Todo): Promise<void> {
    const i = this.todos.indexOf(todo);
    return this.todoService
      .toggleTodo(todo)
      .then(t => {
        this.todos = [
          ...this.todos.slice(0,i),
          t,
          ...this.todos.slice(i+1)
          ];
        return null;
      });
  }
  removeTodo(todo: Todo): Promise<void>  {
    const i = this.todos.indexOf(todo);
    return this.todoService
      .deleteTodoById(todo.id)
      .then(()=> {
        this.todos = [
          ...this.todos.slice(0,i),
          ...this.todos.slice(i+1)
        ];
        return null;
      });
  }
  toggleAll(){
    Promise.all(this.todos.map(todo => this.toggleTodo(todo)));
  }
  clearCompleted(){
    const completed_todos = this.todos.filter(todo => todo.completed === true);
    const active_todos = this.todos.filter(todo => todo.completed === false);
    Promise.all(completed_todos.map(todo => this.todoService.deleteTodoById(todo.id)))
      .then(() => this.todos = [...active_todos]);
  }

}
