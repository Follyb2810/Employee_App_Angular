import { Component, inject, OnInit, signal } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { Todo } from '../../model/todos.type';
import { catchError } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  imports:[NgIf]
})
export class TodosComponent implements OnInit {
  // constructor(private todoService: TodosService) {}
  // @Inject(TodosService) todoService!: TodosService;
  todoService =inject(TodosService);
  todoItem = signal<Todo[]>([]);
  todoItemfromApi = signal<Todo[]>([]);
  newTodo: Todo = { id: 0, userId: 1, title: 'default', completed: false };

  ngOnInit(): void {
    console.log(this.todoService.todoItem);
    this.todoService.getTodoFromApi()
    .pipe(
      catchError((err)=>{
        console.log(err)
        throw err;
      })
    ).subscribe((todo)=>{
      
      this.todoItemfromApi.set(todo)
    })
    ;
    this.todoItem.set(this.todoService.todoItem)
  }
  loadTodos(): void {
    this.todoService.getTodoFromApi()
      .pipe(catchError(err => {
        console.error(err);
        throw err;
      }))
      .subscribe(todo => {
        this.todoItemfromApi.set(todo);
      });
  }

  // Add a new todo
  addTodo(): void {
    this.todoService.addTodo(this.newTodo).subscribe(todo => {
      this.todoItemfromApi.update(existingTodos => [...existingTodos, todo]); // Update list
      this.newTodo = { id: 0, userId: 1, title: '', completed: false }; // Reset form
    });
  }

  // Update an existing todo
  updateTodo(todo: Todo): void {
    this.todoService.updateTodo(todo).subscribe(updatedTodo => {
      this.todoItemfromApi.update(existingTodos => existingTodos.map(t => t.id === updatedTodo.id ? updatedTodo : t));
    });
  }

  // Delete a todo
  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todoItemfromApi.update(existingTodos => existingTodos.filter(t => t.id !== id));
    });
  }
}

//? with header
// import { Component, inject, OnInit, signal } from '@angular/core';
// import { TodosService } from '../../services/todos.service';
// import { Todo } from '../../model/todos.type';
// import { HttpHeaders, HttpParams, catchError } from 'rxjs';

// @Component({
//   selector: 'app-todos',
//   templateUrl: './todos.component.html',
//   styleUrls: ['./todos.component.css']
// })
// export class TodosComponent implements OnInit {
//   todoService = inject(TodosService);
//   todoItem = signal<Todo[]>([]);
//   todoItemfromApi = signal<Todo[]>([]);

//   newTodo: Todo = { id: 0, userId: 1, title: '', completed: false }; // Default for new todo

//   ngOnInit(): void {
//     this.loadTodos();
//   }

//   // Load todos with query params, API key, and custom headers
//   loadTodos(): void {
//     // Setup query params, API key, and headers
//     const params = new HttpParams().set('completed', 'true');
//     const headers = new HttpHeaders()
//       .set('Authorization', 'Bearer YOUR_API_KEY')
//       .set('Content-Type', 'application/json');
      
//     this.todoService.getTodoFromApi(params, headers)
//       .pipe(catchError(err => {
//         console.error(err);
//         throw err;
//       }))
//       .subscribe(todo => {
//         this.todoItemfromApi.set(todo);
//       });
//   }

//   // Add a new todo with query params, API key, and custom headers
//   addTodo(): void {
//     // Setup query params, API key, and headers
//     const params = new HttpParams().set('userId', '1');
//     const headers = new HttpHeaders()
//       .set('Authorization', 'Bearer YOUR_API_KEY')
//       .set('Content-Type', 'application/json');

//     this.todoService.addTodo(this.newTodo, params, headers).subscribe(todo => {
//       this.todoItemfromApi.update(existingTodos => [...existingTodos, todo]);
//       this.newTodo = { id: 0, userId: 1, title: '', completed: false }; // Reset form
//     });
//   }

//   // Update an existing todo with query params, API key, and custom headers
//   updateTodo(todo: Todo): void {
//     // Setup query params, API key, and headers
//     const params = new HttpParams().set('userId', '1');
//     const headers = new HttpHeaders()
//       .set('Authorization', 'Bearer YOUR_API_KEY')
//       .set('Content-Type', 'application/json');
    
//     this.todoService.updateTodo(todo, params, headers).subscribe(updatedTodo => {
//       this.todoItemfromApi.update(existingTodos => existingTodos.map(t => t.id === updatedTodo.id ? updatedTodo : t));
//     });
//   }

//   // Delete a todo with query params, API key, and custom headers
//   deleteTodo(id: number): void {
//     // Setup query params, API key, and headers
//     const params = new HttpParams().set('force', 'true');
//     const headers = new HttpHeaders()
//       .set('Authorization', 'Bearer YOUR_API_KEY');
    
//     this.todoService.deleteTodo(id, params, headers).subscribe(() => {
//       this.todoItemfromApi.update(existingTodos => existingTodos.filter(t => t.id !== id));
//     });
//   }
// }

