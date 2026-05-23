import { Component, input } from '@angular/core';

@Component({
  selector: 'app-table-skeleton',
  standalone: true,
  template: `
    <div class="overflow-x-auto bg-base-200/40 rounded-xl border border-white/5 w-full animate-pulse">
      <table class="table w-full">
        <thead class="bg-base-300/30 border-b border-white/5">
          <tr>
            @for (col of columnsArray(); track $index) {
              <th class="py-4">
                <div class="h-3 bg-white/10 rounded w-16"></div>
              </th>
            }
          </tr>
        </thead>
        <tbody class="divide-y divide-white/5">
          @for (row of rowsArray(); track $index) {
            <tr>
              @for (col of columnsArray(); track colIndex; let colIndex = $index) {
                <td class="py-4">
                  <div class="flex items-center gap-3" [class.justify-end]="colIndex === columns() - 1">
                    @if (colIndex === 1 && hasAvatar()) {
                      <div class="w-10 h-10 rounded-xl bg-white/10 shrink-0"></div>
                    }
                    
                    @if (colIndex === columns() - 1) {
                      <div class="flex gap-2">
                        <div class="w-8 h-8 rounded-lg bg-white/10"></div>
                        <div class="w-8 h-8 rounded-lg bg-white/10"></div>
                      </div>
                    } @else {
                      <div class="h-3 bg-white/10 rounded w-full" 
                           [class.max-w-[40px]]="colIndex === 0"
                           [class.max-w-[140px]]="colIndex !== 0">
                      </div>
                    }
                  </div>
                </td>
              }
            </tr>
          }
        </tbody>
      </table>
    </div>
  `
})
export class TableSkeletonComponent {
  columns = input<number>(4);
  rows = input<number>(5);
  hasAvatar = input<boolean>(true);

  columnsArray() {
    return Array(this.columns()).fill(0);
  }

  rowsArray() {
    return Array(this.rows()).fill(0);
  }
}
