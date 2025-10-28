import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ZardAvatarComponent } from './components/avatar/avatar.component';
import { ZardBreadcrumbModule } from './components/breadcrumb/breadcrumb.module';
import { ZardButtonComponent } from './components/button/button.component';
import { ZardCardComponent } from './components/card/card.component';
import { ZardEmptyComponent } from './components/empty/empty.component';
import { ZardIconComponent } from './components/icon/icon.component';
import { ContentComponent } from './components/layout/content.component';
import { FooterComponent } from './components/layout/footer.component';
import { HeaderComponent } from './components/layout/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ZardToastComponent } from './components/toast/toast.component';

@NgModule({
  imports: [
    CommonModule,
    ContentComponent,
    LayoutComponent,
    ZardButtonComponent,
    ZardIconComponent,
    HeaderComponent,
    FooterComponent,
    ZardBreadcrumbModule,
    RouterLink,
    ZardEmptyComponent,
    ZardCardComponent,
    ZardAvatarComponent,
    ZardToastComponent,
  ],
  exports: [
    CommonModule,
    CommonModule,
    ContentComponent,
    LayoutComponent,
    ZardButtonComponent,
    ZardIconComponent,
    HeaderComponent,
    FooterComponent,
    ZardBreadcrumbModule,
    RouterLink,
    ZardEmptyComponent,
    ZardCardComponent,
    ZardAvatarComponent,
  ]
})
export class SharedModule { }
