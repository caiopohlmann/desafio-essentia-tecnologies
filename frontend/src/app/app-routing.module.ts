import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { ListsComponent } from './components/lists/lists.component';
import { TaskComponent } from './components/task/task.component';

const routes: Routes = [
    {
      path: 'registrarse',
      component: SignupComponent
    },
    {
      path: 'entrar',
      component: LoginComponent
    },
    {
      path: 'adicionar-lista',
      component: PublicationsComponent
    },
    {
      path: 'adicionar-tarefa',
      component: TaskComponent
    },
    {
      path: 'listas',
      component: ListsComponent
    },
    {
      path: '',
      redirectTo: '/listas',
      pathMatch: 'full'
    }
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
