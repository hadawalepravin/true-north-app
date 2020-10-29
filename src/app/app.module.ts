import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule, MatInputModule, MatMenuModule, MatSnackBarModule, MatTooltipModule } from '@angular/material';

import { AppComponent } from './app.component';
import { DataTableComponent } from './data-table/data-table.component';

import { DateUtil } from './lib/date-util';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSortModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  providers: [
    UserService,
    DateUtil
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
