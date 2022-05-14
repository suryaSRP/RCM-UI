import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth.interceptor';
import { BaseComponentModule } from './base-component/base-component.module';
import { LayoutsModule } from './layouts/layouts/layouts.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppMaterialModule } from './app.module.material';
import { ModalModule } from './common/modal/modal/modal.module';
import { CredComponentRoutingModule } from './cred-component/cred-component-routing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BaseComponentModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    LayoutsModule,
    AppMaterialModule,
    ModalModule,
    CredComponentRoutingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
