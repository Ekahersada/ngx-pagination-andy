import { Component, Input, Output, EventEmitter } from '@angular/core';

export const Paginator = {
  page: 1,
  limit: 10,
  totalItem: 0,
};

export interface Paginator_m {
  page: number;
  limit: number;
  totalItem: number;
}

@Component({
  selector: 'pagination',
  standalone: true,
  template: `
  tesswewedsdsds
    <div class="pagination-wrapper">
      <!-- Page size selector -->

      @if (showSelector) {
      <div class="page-size">
        <label for="pageSize">Show: </label>
        <select
          id="pageSize"
          [value]="data.limit"
          (change)="changePageSize($any($event.target).value)"
        >
          @for (size of customOpt; track $index) {
          <option [value]="size">
            {{ size }}
          </option>
          }
        </select>
      </div>

      }

      <!-- Pagination -->
      <nav class="pagination-container">
        <button
          class="page-btn"
          [disabled]="data.page == 1"
          (click)="goToPage(1)"
        >
          First
        </button>

        <button
          class="page-btn"
          [disabled]="data.page == 1"
          (click)="goToPage(data.page - 1)"
        >
          &lsaquo;
        </button>

        <!-- Always show page 1 -->
        <button
          class="page-btn"
          [class.active]="data.page === 1"
          (click)="goToPage(1)"
        >
          1
        </button>

        <!-- Left ellipsis -->
        @if (showLeftEllipsis()) {
        <span class="ellipsis">...</span>
        }

        <!-- Middle pages -->
        @for (page of middlePages(); track $index) {
        <button
          class="page-btn"
          [class.active]="page === data.page"
          (click)="goToPage(page)"
        >
          {{ page }}
        </button>
        }

        <!-- Right ellipsis -->
        @if (showRightEllipsis()) {
        <span class="ellipsis">...</span>
        }

        <!-- Always show last page -->
        @if (totalPages > 1) {
        <button
          class="page-btn"
          [class.active]="data.page === totalPages"
          (click)="goToPage(totalPages)"
        >
          {{ totalPages }}
        </button>
        }

        <button
          class="page-btn"
          [disabled]="data.page === totalPages"
          (click)="goToPage(data.page + 1)"
        >
          &rsaquo;
        </button>

        <button
          class="page-btn"
          [disabled]="data.page === totalPages"
          (click)="goToPage(totalPages)"
        >
          Last
        </button>
      </nav>
    </div>
  `,
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() customOpt: number[] = [10, 20, 50, 100];
  @Input() showSelector = false;

  @Input() data: Paginator_m = Paginator;

  @Output() pageChange = new EventEmitter<Paginator_m>();
  @Output() limitChange = new EventEmitter<number>();

  get totalPages() {
    return Math.ceil(this.data.totalItem / this.data.limit);
  }

  middlePages(): number[] {
    const total = this.totalPages;
    const current = this.data.page;

    if (total <= 5) {
      return Array.from({ length: total - 2 }, (_, i) => i + 2);
    }

    let start = Math.max(2, current - 1);
    let end = Math.min(total - 1, current + 1);

    if (current <= 3) {
      start = 2;
      end = 4;
    }

    if (current >= total - 2) {
      start = total - 3;
      end = total - 1;
    }

    const pages: number[] = [];
    for (let i = start; i <= end; i++) {
      if (i > 1 && i < total) {
        pages.push(i);
      }
    }
    return pages;
  }

  showLeftEllipsis() {
    return this.totalPages > 5 && this.data.page > 3;
  }

  showRightEllipsis() {
    return this.totalPages > 5 && this.data.page < this.totalPages - 2;
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.data.page = page;
    this.pageChange.emit(this.data);
  }

  changePageSize(newSize: number) {
    this.data.limit = Number(newSize);

    this.data.page = 1; // reset ke halaman pertama
    this.limitChange.emit(this.data.limit);
    this.pageChange.emit(this.data);
  }
}
