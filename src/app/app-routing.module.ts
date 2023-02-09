import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './components/add-item/add-item.component';
import { EditItemComponent } from './components/edit-item/edit-item.component';
import { ItemComponent } from './components/item/item.component';

const routes: Routes = [
  { path: '', component: ItemComponent },
  { path: 'additem', component: AddItemComponent },
  { path: 'edititem/:id', component: EditItemComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
