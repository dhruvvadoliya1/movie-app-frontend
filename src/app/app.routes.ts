import { Routes } from '@angular/router';
import { ListComponent } from './movie/list/list.component';
import { ShowComponent } from './movie/show/show.component';
import { CreateComponent } from './movie/create/create.component';
import { EditComponent } from './movie/edit/edit.component';

export const routes: Routes = [
    { path: '', redirectTo: 'movie', pathMatch: 'full' },
    { path: 'movie', component: ListComponent },
    { path: 'movie/:id/show', component: ShowComponent },
    { path: 'movie/create', component: CreateComponent },
    { path: 'movie/:id/edit', component: EditComponent }
];