import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'box', loadChildren: () => import('./box/box.module').then(m => m.BoxModule) },
{ path: 'filter', loadChildren: () => import('./filter/filter.module').then(m => m.FilterModule)
},
  { path: 'dynamic-form', loadChildren: () => import('./dynamic-form/dynamic-form.module').then(m => m.DynamicFormModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
