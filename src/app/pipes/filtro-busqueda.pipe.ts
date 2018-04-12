import { Pipe, PipeTransform } from '@angular/core';
import { ToDo } from '../interfaces/todo.interface';

/**
 * Filtra por el estado de los ToDo ya sea all,active,completed
 */
@Pipe({
	name: 'filtroBusqueda'
})
export class FiltroBusquedaPipe implements PipeTransform {
	transform(lista: ToDo[], pipe: any): any {
		if (pipe === 'all') {
			return lista;
		}

		return lista.filter((x) => x.state.toLowerCase() === pipe.toLowerCase());
	}
}
