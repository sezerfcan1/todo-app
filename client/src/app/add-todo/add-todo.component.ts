import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  todo = {
    title: '',
    description: '',
    status: false
  };

  submitted = false;

  constructor(private todoService: TodoService) { }
  
  ngOnInit(): void {
  }

  saveTodo(): void {

    const data = {
      title: this.todo.title,
      description: this.todo.description,
      status: this.todo.status
    };


    this.todoService.create(data)
      .subscribe(
        response => {
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newTodo(): void {
    this.submitted = false;
    this.todo = {
      title: '',
      description: '',
      status: false
    };
  }

}