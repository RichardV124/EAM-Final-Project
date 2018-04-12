import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FiltroBusquedaPipe } from './pipes/filtro-busqueda.pipe';
import { TodoService } from './services/todo.service';

@NgModule({
	declarations: [ AppComponent, FiltroBusquedaPipe ],
	imports: [
		BrowserModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule
	],
	providers: [ TodoService ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
