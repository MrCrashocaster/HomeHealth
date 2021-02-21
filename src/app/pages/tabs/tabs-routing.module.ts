import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [


  {
    path: '', component: TabsPage, children: [


      {
        path: 'group',
        loadChildren: () => import('./group/group.module').then(m => m.GroupPageModule)
      },
      {
        path: 'chats',
        loadChildren: () => import('./chats/chats.module').then(m => m.ChatsPageModule)
      },
      {
        path: 'calendar',
        loadChildren: () => import('./calendar/calendar.module').then( m => m.CalendarPageModule)
      },

      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(m => m.AccountPageModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
      }, {

        path: '',
        redirectTo: '/tabs/users',
        pathMatch: 'full'

      }

    ]
  }, {
    path: '**', redirectTo: '/tabs/users', pathMatch: 'full'
  }, {
    path: 'group',
    loadChildren: () => import('./group/group.module').then(m => m.GroupPageModule)
  },
  
 


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
