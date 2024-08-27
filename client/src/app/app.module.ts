import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { UserEffect } from './ngrx/effects/user.effects';
import { userReducer } from './ngrx/reducers/user.reducers';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthModule } from './auth/auth.module';
import { authReducer } from './ngrx/reducers/auth.reducers';
import { AuthEffects } from './ngrx/effects/auth.effects';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    UserModule,
    AuthModule,
    StoreModule.forRoot({
      user: userReducer,
      auth: authReducer
    }, {}),
    EffectsModule.forRoot([UserEffect, AuthEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false, // Set to true for auto login after reload
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider("195321382919-9douqjni4u680jkitrc9ri8o6nvuvt8m.apps.googleusercontent.com")
          }
        ]
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
