import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaginationComponent } from 'ngx-pagination-andy';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PaginationComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'my-app';
  users = Array.from({ length: 100 }, (_, i) => `User ${i + 1}`);
  pageSize = 5;
  page = 1;

  get paginatedUsers() {
    const start = (this.page - 1) * this.pageSize;
    return this.users.slice(start, start + this.pageSize);
  }

  onPageChange(newPage: any) {
    console.log('Page changed to:', newPage);
    this.page = newPage.page; // Assuming newPage is an object with a 'page' property
    // this.page = newPage;
  }
}
