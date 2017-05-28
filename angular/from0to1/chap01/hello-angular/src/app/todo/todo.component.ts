import { Component, OnInit, Inject } from '@angular/core';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  desc = '';
  constructor(
    @Inject('todoService') private todoService
  ) { }

  ngOnInit() {
    this.getTodos();
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
  getTodos(): void {
    this.todoService
      .getTodos()
      .then(todos => this.todos = [...todos]);
  }
}
