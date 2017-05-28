import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { UUID } from 'angular2-uuid';
import 'rxjs/add/operator/toPromise';
import { Todo } from './todo.model';

@Injectable()
export class TodoService {

  //定义你的假WebAPI地址，这个定义成什么都无所谓
  //只要确保是无法访问的地址就好
  // private api_url = 'apihahahahah/mockDatas';
  private api_url = 'http://localhost:3000/todos';
  private headers = new Headers({'Content-Type': 'application/json'});



  // todos: Todo[] = [];
  constructor(
    private http: Http
  ) { }

  // POST /todos
  addTodo(desc: string): Promise<Todo> {
    let todo = {
      id:UUID.UUID(),
      desc: desc,
      completed: false
    };
    return this.http
            .post(this.api_url, JSON.stringify(todo), {headers: this.headers})
            .toPromise()
            .then(res => res.json() as Todo)
            .catch(this.handleError);

  }
/*
  toggleTodo(todo:Todo): Promise<Todo> {
    const url = `${this.api_url}/${todo.id}`;
    console.log(url);
    let updatedTodo = Object.assign({}, todo, {completed: !todo.completed});
    return this.http
            .put(url, JSON.stringify(updatedTodo), {headers: this.headers})
            .toPromise()
            .then(() => updatedTodo)
            .catch(this.handleError);
  }
  */
  // It was PUT /todos/:id before
  // But we will use PATCH /todos/:id instead
  // Because we don't want to waste the bytes those don't change
  /**
   * 原来的put方法是将整个todo数据上传，但其实我们只改动了todo.completed属性。
   * 如果你的web api是符合REST标准的话，我们可以用Http的PATCH方法而不是PUT方法，PATCH方法会只上传变化的数据。
   */
  toggleTodo(todo: Todo): Promise<Todo> {
    const url = `${this.api_url}/${todo.id}`;
    let updatedTodo = Object.assign({}, todo, {completed: !todo.completed});
    return this.http
            .patch(url, JSON.stringify({completed: !todo.completed}), {headers: this.headers})
            .toPromise()
            .then(() => updatedTodo)
            .catch(this.handleError);
  }

  //delete /todos/:id
  deleteTodoById(id: string): Promise<void> {
    const url = `${this.api_url}/${id}`;
    return this.http
            .delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
  }
  //GET /todos
  getTodos(): Promise<Todo[]> {
    return this.http.get(this.api_url)
            .toPromise()
            .then(res => res.json() as Todo[])
            .catch(this.handleError);
  }

  // GET /todos?completed=true/false
  filterTodos(filter: string): Promise<Todo[]> {
    switch(filter){
      case 'ACTIVE': return this.http
                        .get(`${this.api_url}?completed=false`)
                        .toPromise()
                        .then(res => res.json() as Todo[])
                        .catch(this.handleError);
      case 'COMPLETED': return this.http
                          .get(`${this.api_url}?completed=true`)
                          .toPromise()
                          .then(res => res.json() as Todo[])
                          .catch(this.handleError);
      default:
        return this.getTodos();
    }
  }

  
  private handleError(error: any): Promise<any>{
    console.error('an error occurred', error);
    return Promise.reject(error.message || error);
  }
}
