import {NgModule, ModuleWithProviders, Optional} from '@angular/core';
import {AuthorizationService} from './Authorization.service';
import {AuthRolePermission} from './AuthRolePermission';
import {AuthLoginPermission} from './AuthLoginPermission';
import {PermissionConfig} from './PermissionConfig';
import {RebirthRoleDirective} from './RebirthRole.directive';
import {RebirthStorageModule} from 'rebirth-storage';

export const AUTH_ROLE_PERMISSIONS_PROVIDERS: any[] = [
  AuthorizationService,
  AuthLoginPermission,
  AuthRolePermission
];

export function providePermission(permissionConfig: PermissionConfig): any[] {
  return [
    ...AUTH_ROLE_PERMISSIONS_PROVIDERS,
    {provide: PermissionConfig, useValue: permissionConfig}
  ];
};


@NgModule({
  imports: [
    RebirthStorageModule
  ],
  declarations: [RebirthRoleDirective],
  exports: [
    RebirthStorageModule,
    RebirthRoleDirective
  ],
  providers: []
})
export class RebirthPermissionModule {

  static forRoot(permissionConfig: PermissionConfig): ModuleWithProviders {
    return {
      ngModule: RebirthPermissionModule,
      providers: [
        ...providePermission(permissionConfig)
      ]
    };
  }

  constructor(@Optional()  parentModule: RebirthStorageModule) {
    if (!parentModule) {
      throw 'Should import rebirth-storage(RebirthStorageModule)!';
    }
  }
}
