# @rebirth/rebirth-permission([![Build Status](https://travis-ci.org/greengerong/rebirth-permission.svg?branch=master)](https://travis-ci.org/greengerong/rebirth-permission))
> Angular2 front end permission



## Install
```bash
npm install rebirth-permission --save
```

## How to use?

### Register `rebirth-permission` lib

    import { providePermission, PermissionConfig, RebirthRoleDirective } from 'rebirth-permission';
    
    // auth config
    const permissionConfig: PermissionConfig = { loginPage: '/manage/login' };
    
    
    bootstrap(AppComponent,[...providePermission(permissionConfig)]);

### Register CurrentUser when login

```typescript

  login(loginInfo: {email: string; password: string }): Observable<CurrentUser> {
    const authorizationService = this.authorizationService;
    const rebirthHttpProvider = this.rebirthHttpProvider;

    return this.innerLogin(loginInfo)
      .map(user => {
        authorizationService.setCurrentUser(user);
        rebirthHttpProvider.headers({ Authorization: user.token }); // rebirth-http register global token header
        return user;
      });
  }
  
```

### Config route role
 
```typescript

    import { RouterConfig } from '@angular/router';
    import { ManageAppComponent } from './manage-app.component';
    import { AuthRolePermission } from 'rebirth-permission';
    
    export const routes: RouterConfig = [
      {
        path: 'manage', component: ManageAppComponent,
        children: [
          { path: '', pathMatch: 'full', redirectTo: '/manage/login' },
          { path: 'login', component: 'LoginComponent' },
          {
            path: 'home',
            component: 'ManageHomeComponent',
            data: { roles: ['Admin', 'User'] }, // can access roles
            canActivate: [AuthRolePermission] // role access CanActivate
          },
        ]
      }
    ];

```

** `/manage/home` resource can be access by Admin and User.
** We can use `AuthRolePermission` to control access by roles.
** We can use `AuthLoginPermission` to control access by login or not.
** We can setup `jwt` token by another lib [`rebirth-http`](https://github.com/greengerong/rebirth-http).

### HTML resource access by role

```typescript
    import { Component } from '@angular/core';
    import { AUTH_ROLE_PERMISSIONS_DIRECTIVE } from 'rebirth-permission';
    
    @Component({
      selector: 'manage-home',
      pipes: [],
      providers: [],
      directives: [...AUTH_ROLE_PERMISSIONS_DIRECTIVE],
      styles: [
        require('./manage-home.scss')
      ],
      template: require('./manage-home.html')
    })
    export class ManageHomeComponent {
    
    }
```

```html
  <h2 *reRole="['Admin']">admin role</h2>
  <h2 *reRole="['User']">user role</h2>
```

###  Permission in TypeScript

We can inject `AuthorizationService` to call `isLogin` or 'hasRight' method.

```typescript
import { Observable } from 'rxjs/Observable';
import { StorageType, StorageService } from 'rebirth-storage';
import { PermissionConfig } from './PermissionConfig';
export declare class AuthorizationService {
    constructor(storageService: StorageService, permissionConfig: PermissionConfig);
    setStorageType(storageType: StorageType): void; // set storage type, default is localstroage
    setCurrentUser(currentUser: any): void;
    getCurrentUser(): any;
    logout(): any; // clean current user storage
    isLogin(): boolean;
    hasRight(roles: any | any[]): Observable<boolean> | boolean;
}
```

