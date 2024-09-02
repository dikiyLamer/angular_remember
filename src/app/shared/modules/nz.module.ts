import { NgModule } from '@angular/core';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { CommonModule, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzTableModule } from 'ng-zorro-antd/table';

registerLocaleData(en);

@NgModule({
  imports: [
    CommonModule,
    NzModalModule,
    NzSelectModule,
    NzIconModule,
    NzButtonModule,
    NzCardModule,
    NzInputModule,
    NzFormModule,
    NzToolTipModule,
    NzPopoverModule,
    NzCheckboxModule,
    NzNotificationModule,
    NzTableModule,
  ],
  exports: [
    NzModalModule,
    NzSelectModule,
    NzIconModule,
    NzButtonModule,
    NzCardModule,
    NzInputModule,
    NzFormModule,
    NzToolTipModule,
    NzPopoverModule,
    NzCheckboxModule,
    NzNotificationModule,
    NzTableModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
})
export class NzComposedModule {}
