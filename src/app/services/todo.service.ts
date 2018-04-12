import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ToDo } from '../interfaces/todo.interface';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TodoService {
	// Variable de tipo observable para guardar la lista de ToDos
	//toDos$;
	// Nombre de la coleccion
	nameCollection = 'toDo';

	constructor(private db: AngularFirestore) {
		//	this.toDos$ = db.collection<ToDo>(this.nameCollection).valueChanges();
	}

	/**
   * Método que inserta un ToDo en la base de datos
   * @param todo, ToDo a insertar
   */
	addTodo(todo: ToDo) {
		const id = this.db.createId();
		this.db
			.collection(this.nameCollection)
			.doc(id)
			.set({ id: id, message: todo.message, state: todo.state });
	}

	/**
   * Método que lista todos los ToDo de la base de datos.
   */
	getToDo(): Observable<ToDo[]> {
		return this.db.collection<ToDo>(this.nameCollection).valueChanges();
	}

	/**
   * Método que edita el estado a un ToDo en la base de datos.
   * @param todo, ToDo al que se le cambiará el estado.
   */
	changeStateToDo(todo: ToDo) {
		this.db.collection(this.nameCollection).doc(todo.id).update({ state: todo.state });
	}

	/**
   * Método que edita el mensaje a un ToDo en la base de datos.
   * @param todo, ToDo al que se le cambiará el mensaje.
   */
	editMessageToDo(todo: ToDo) {
		this.db.collection(this.nameCollection).doc(todo.id).update({ message: todo.message });
	}

	/**
   * Método que elimina un ToDo de la base de datos.
   * @param todo, ToDo a eliminar de la base de datos.
   */
	deleteTodo(todo: ToDo): void {
		this.db.collection(this.nameCollection).doc(todo.id).delete();
	}

	/**
   * Método que cambia el estado de una lista de ToDo
   * @param status, el nuevo estado que se le asignara a toda la lista de ToDo
   * @param todoList, lista de ToDo a la cual se le cambiara el estado
   */
	changeStatusAll(state: string, todoList: ToDo[]): void {
		todoList.map((todo) => {
			this.db.collection(this.nameCollection).doc(todo.id).update({ state: state });
		});
	}

	/**
   * Método que elimina de la base de datos los ToDo completados
   * @param listToDo, lista con los ToDo completados
   */
	clearCompletedToDo(listToDo: ToDo[]): void {
		listToDo.map((todo) => {
			this.deleteTodo(todo);
		});
	}
}
