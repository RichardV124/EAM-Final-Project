import { Observable } from 'rxjs/Observable';
import { TodoService } from './services/todo.service';
import { element } from 'protractor';
import { ToDo } from './interfaces/todo.interface';
import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent {
	title = 'MVC ToDo Angular 5';

	// Lista de tipo observable con los todo de la base de datos
	listToDo$: ToDo[];
	// Lista de todos
	toDoList: ToDo[] = [];
	// El todo a crear
	nuevo: ToDo;
	// campo de filtro para el pipe
	campoFiltro = 'all';
	// contador de los toDo activos
	todoCount = 0;
	checkTodos = false;

	/**
   * Constructor
   * @param toDoService, Inyeccion del servicio donde se encuentran las operaciones
   *para la insercion a la base de datos
   */
	constructor(private todoService: TodoService) {
		// Se realiza el llamado al método utilizado para consultar los ToDo.
		this.getTodo();
	}

	/**
   * Método que inserta un ToDo en la base de datos
   * @param message, ToDo a insertar
   */
	public addToDo(message: HTMLInputElement) {
		this.nuevo = {
			id: '',
			message: message.value,
			state: 'active'
		};
		this.todoService.addTodo(this.nuevo);
		message.value = '';
	}

	/**
   * Método que lista todos los ToDo de la base de datos y
   */
	getTodo() {
		this.todoService.getToDo().subscribe((content) => {
			this.listToDo$ = content;
			this.toDoList = this.listToDo$.filter(
				(todo) => todo.state === 'active' || todo.state === 'completed'
			);
			this.todoCount = this.toDoList.filter((todo) => todo.state === 'active').length;
		});
		// this.countToDo();
	}

	/**
   * Método que elimina un ToDo de la base de datos.
   * @param todo, ToDo a eliminar de la base de datos.
   */
	deleteTodo(todo: ToDo) {
		this.todoService.deleteTodo(todo);
	}

	/**
  * Método que edita el estado a un ToDo en la base de datos.
   * @param todo ToDo al que se le cambiará el estado.
   * @param status, el nuevo estado que se le asignara al ToDo
   */
	changeStatusTodo(todo: ToDo, state: boolean) {
		let estado = 'active';
		if (state === true) {
			estado = 'completed';
		}
		todo.state = estado;
		this.todoService.changeStateToDo(todo);
	}

	/**
   * Método que edita el mensaje a un ToDo en la base de datos.
   * @param todo, ToDo al que se le cambiará el mensaje.
   *@param message, el nuevo mensaje que se le asignara al ToDo
   */
	public editMessageToDo(message: string, todo: ToDo) {
		todo.message = message;
		this.todoService.editMessageToDo(todo);
	}

	/**
	 * Metodo que cambia el estado a una lista de ToDo
	 * @param value, el nuevo estado que se le asignara a la lista de ToDo
	 */
	public checkAll(value: boolean) {
		this.checkTodos = value;
		const valueState = value ? 'completed' : 'active';

		this.todoService.changeStatusAll(valueState, this.listToDo$);
	}

	/**
   * Método que elimina de la base de datos los ToDo completados
   */
	public deleteCompleteToDo() {
		const completed: ToDo[] = this.listToDo$.filter((todo) => todo.state === 'completed');
		this.todoService.clearCompletedToDo(completed);
	}

	/**
   * Método que elimina un ToDo de la base de datos.
   * @param todo, ToDo a eliminar de la base de datos.
   */
	public removeToDo(todo: ToDo) {
		this.todoService.deleteTodo(todo);
	}

	public cambiarFiltro(filtro: string) {
		this.campoFiltro = filtro;
	}
}
