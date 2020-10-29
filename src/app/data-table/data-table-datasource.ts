import { map } from 'rxjs/operators';
import { ApiUser } from '../models/api-user';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { UserService } from '../services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, of as observableOf, merge } from 'rxjs';

export class DataTableDataSource extends DataSource<ApiUser> {
  data: ApiUser[] = [];

  sort: MatSort;
  paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private filteredUsers: ApiUser[]
  ) {
    super();
  }

  // Connects data source to the table and a stream of the items to be rendered
  connect(): Observable<ApiUser[]> {
    return new Observable<ApiUser[]>(observer => {

      // Bind filtered users to data source
      if (this.filteredUsers) {
        return this.applyMutations(this.filteredUsers).subscribe(users => {
          observer.next(users);
        });
      } else {

        // Bind api users to data source
        this.userService.getUsers().subscribe((users) => {
          if (users) {

            // Set global api users
            this.userService.setUserData(users);

            // Apply sorting and pagination mutations
            return this.applyMutations(users).subscribe(mutatedData => {
              observer.next(mutatedData);
            });
          }
        });
      }
    });
  }

  applyMutations(users: ApiUser[]): Observable<ApiUser[]> {
    const dataMutations = [
      observableOf(users),
      this.paginator.page,
      this.sort.sortChange
    ];

    this.paginator.length = users.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...users]));
    }));
  }

  // Clean up any open table connections
  // Free-up any held resources that were set up during connect
  disconnect() { }

  // Client-side pagination
  private getPagedData(users: ApiUser[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return users.splice(startIndex, this.paginator.pageSize);
  }

  // Client-side sorting
  private getSortedData(users: ApiUser[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return users;
    }

    return users.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return this.compare(a.name, b.name, isAsc);
        case 'dob': return this.compare(a.dob, b.dob, isAsc);
        case 'city': return this.compare(a.city, b.city, isAsc);
        case 'email': return this.compare(a.email, b.email, isAsc);
        case 'phone': return this.compare(a.phone, b.phone, isAsc);
        default: return 0;
      }
    });
  }

  // Simple sort comparator for client-side sorting
  private compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
