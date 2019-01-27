import {HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Routes, RouterModule} from '@angular/router'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { DirectoryTreeComponent } from './explorer/directory-tree/directory-tree.component';
import { DirectoryContentComponent } from './explorer/directory-content/directory-content.component';
import { MaterialModule } from './material-modules';
import { CurrentSelectionDirective } from './explorer/shared/directives/current-selection.directive';
import { FileDatabaseService } from './explorer/shared/services/file-database.service';

const routes : Routes = [
  {path:'root', component:ExplorerComponent},
  {path:'', redirectTo:'root', pathMatch:'full'},
  {path:'**', redirectTo:'root'}// component: ErrorPageComponent, data:{message : 'Page not found'}}
]

@NgModule({
  declarations: [
    AppComponent,
    ExplorerComponent,
    DirectoryTreeComponent,
    DirectoryContentComponent,
    CurrentSelectionDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [FileDatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
