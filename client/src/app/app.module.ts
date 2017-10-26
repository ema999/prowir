import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http, RequestOptions, ConnectionBackend } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';
import { SharedModule } from './core/modules/shared.module';
import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { FuseSplashScreenService } from './core/services/splash-screen.service';
import { FuseConfigService } from './core/services/config.service';
import { FuseNavigationService } from './core/components/navigation/navigation.service';
import { AuthService } from './core/services/auth.service';
import { UserService } from './core/services/user.service';
import { FuseSampleModule } from './main/content/sample/sample.module';
import { PagesModule } from './main/content/pages/pages.module';
import { AuthGuard } from './core/services/authguard.service';
import { AuthHttp, AuthConfig, AUTH_PROVIDERS, provideAuth } from 'angular2-jwt';

const appRoutes: Routes = [
    {
        path      : '',
        redirectTo: 'sample',
        pathMatch: 'full'
    },
    {
        path      : 'unauthorized',
        redirectTo: 'pages/auth/login'
    }
];



export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('token'))
  }), http, options);
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes),
        SharedModule,
        FuseMainModule,
        FuseSampleModule,
        PagesModule
    ],
    providers   : [
        FuseSplashScreenService,
        FuseConfigService,
        FuseNavigationService,
        AuthService,
        AuthGuard,
        UserService,
        {
          provide: AuthHttp,
          useFactory: authHttpServiceFactory,
          deps: [Http, RequestOptions]
        }
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
