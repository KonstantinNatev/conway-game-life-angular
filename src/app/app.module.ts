import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { controlReducer } from './states/control-buttons/control-buttons.reducer'; // Update the path as needed

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ controls: controlReducer }) // Register the root store
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
