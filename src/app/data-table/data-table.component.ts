import * as _ from 'underscore';
import * as constants from './data-table.constants.json';

import { ApiUser } from '../models/api-user';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { UserService } from '../services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { DataTableDataSource } from './data-table-datasource';
import { MatMenuTrigger, MatSnackBar } from '@angular/material';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements AfterViewInit, OnInit {
  constructor(
    public userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<ApiUser>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatMenuTrigger, { static: true }) matMenuTrigger: MatMenuTrigger;

  dataSource: DataTableDataSource;
  displayedColumns = constants.userTableColumns;
  menuTopLeftPosition = constants.menuTopLeftPosition;

  onRightClick(event: MouseEvent, item) {
    event.preventDefault();
    this.menuTopLeftPosition.x = event.clientX + 'px';
    this.menuTopLeftPosition.y = event.clientY + 'px';
    this.matMenuTrigger.menuData = { item };
    this.matMenuTrigger.openMenu();
  }

  ngOnInit() {
    this.dataSource = new DataTableDataSource(this.userService, undefined);
  }

  ngAfterViewInit() {
    this.refreshDataSource();
  }

  refreshDataSource() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.paginator.pageIndex = 0;
    this.snackBar.open('User data filtered successfully!', 'Info', {
      duration: 2000
    });
  }

  applyColumnFilter(filterValue) {
    filterValue = this.sanitizeFilterParam(filterValue);
    this.userService.filteredUsers = _.filter(this.userService.users, u => {
      return u.city.trim().toLowerCase().includes(filterValue);
    });
    this.dataSource = new DataTableDataSource(
      this.userService, this.userService.filteredUsers
    );
    this.refreshDataSource();
  }

  applySearchFilter(filterValue: string) {
    filterValue = this.sanitizeFilterParam(filterValue);
    this.userService.filteredUsers = _.filter(this.userService.users, u => {
      return u.city.trim().toLowerCase().includes(filterValue) ||
        u.name.trim().toLowerCase().includes(filterValue) ||
        u.dob.trim().toLowerCase().includes(filterValue) ||
        u.email.trim().toLowerCase().includes(filterValue) ||
        u.phone.trim().toLowerCase().includes(filterValue);
    });
    this.dataSource = new DataTableDataSource(
      this.userService, this.userService.filteredUsers
    );
    this.refreshDataSource();
  }

  sanitizeFilterParam(filterValue) {
    filterValue = filterValue.trim();
    return filterValue.toLowerCase();
  }

  refreshUsers() {
    this.dataSource = new DataTableDataSource(this.userService, this.userService.users);
    this.refreshDataSource();
  }
}
