export * from './Authorization.service';
export * from './AuthRolePermission';
export * from './RebirthRole.directive';
export * from './PermissionConfig';

import { NgModule, ModuleWithProviders } from '@angular/core';
import { AuthorizationService } from './Authorization.service';
import { AuthRolePermission } from './AuthRolePermission';
import { PermissionConfig } from './PermissionConfig';
import { RebirthRoleDirective } from './RebirthRole.directive';
import { RebirthStorageModule } from 'rebirth-storage';

const AUTH_ROLE_PERMISSIONS_PROVIDERS: any[] = [
    AuthorizationService,
    AuthRolePermission
];

export function providePermission(permissionConfig: PermissionConfig): any[] {
    return [
        ...AUTH_ROLE_PERMISSIONS_PROVIDERS,
        { provide: PermissionConfig, useValue: permissionConfig }
    ];
};


@NgModule({
    imports: [RebirthStorageModule],
    declarations: [RebirthRoleDirective],
    exports: [
        RebirthRoleDirective,
        RebirthStorageModule
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
}
