import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Rutas
import { AppRoutingModule } from './app-routing.module';

//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

// modulos
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';

//servicios
import { ServicesModule } from './services/services.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,    
    RegisterComponent,  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    ComponentsModule,
    ServicesModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
