import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RebirthPermissionModule, AuthRolePermission} from 'rebirth-permission';
import {RebirthStorageModule, StorageType} from 'rebirth-storage';
import {RouterModule} from '@angular/router';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {UserPageComponent} from './user-page/user-page.component';
import {HomePageComponent} from './home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminPageComponent,
    UserPageComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home',
      },
      {
        path: 'home',
        component: HomePageComponent
      },
      {
        path: 'manage',
        component: AdminPageComponent,
        data: {roles: ['admin']},
        canActivate: [AuthRolePermission]
      },
      {
        path: 'user',
        component: UserPageComponent,
        data: {roles: ['user']},
        canActivate: [AuthRolePermission]
      }
    ]),
    RebirthStorageModule,
    RebirthPermissionModule.forRoot({loginPage: '/home', storageType: StorageType.sessionStorage})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
