import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../model/todos.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
//  http =Inject(HttpClient)
private apiUrl = 'https://jsonplaceholder.typicode.com/todos';
  constructor(private http: HttpClient) {}

  todoItem: Todo[] = [
    {
      userId: 0,
      completed: true,
      title: 'power app',
      id: 1,
    },
    {
      userId: 1,
      completed: true,
      title: 'Angular',
      id: 2,
    },
  ];


  // getTodoFromApi() {
  //   const url = "https://jsonplaceholder.typicode.com/todos";
  //   return this.http.get<Todo[]>(url);
  // }
  getTodoFromApi(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  // Post new todo to API
  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  // Update existing todo
  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${todo.id}`, todo);
  }

  // Delete todo
  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

//? with header and params
// import { Injectable } from '@angular/core';
// import { Todo } from '../model/todos.type';
// import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class TodosService {
//   private apiUrl = 'https://jsonplaceholder.typicode.com/todos'; // Example API URL

//   constructor(private http: HttpClient) {}

//   // Get todos from API with query params, API key, and headers
//   getTodoFromApi(params?: HttpParams, headers?: HttpHeaders): Observable<Todo[]> {
//     const options = {
//       headers: headers,
//       params: params
//     };
//     return this.http.get<Todo[]>(this.apiUrl, options);
//   }

//   // Post new todo to API with query params, API key, and headers
//   addTodo(todo: Todo, params?: HttpParams, headers?: HttpHeaders): Observable<Todo> {
//     const options = {
//       headers: headers,
//       params: params
//     };
//     return this.http.post<Todo>(this.apiUrl, todo, options);
//   }

//   // Update an existing todo
//   updateTodo(todo: Todo, params?: HttpParams, headers?: HttpHeaders): Observable<Todo> {
//     const options = {
//       headers: headers,
//       params: params
//     };
//     return this.http.put<Todo>(`${this.apiUrl}/${todo.id}`, todo, options);
//   }

//   // Delete todo with query params, API key, and headers
//   deleteTodo(id: number, params?: HttpParams, headers?: HttpHeaders): Observable<void> {
//     const options = {
//       headers: headers,
//       params: params
//     };
//     return this.http.delete<void>(`${this.apiUrl}/${id}`, options);
//   }
// }

