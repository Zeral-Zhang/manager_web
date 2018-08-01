import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'my-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
    @Input() page: number;
    @Input() count: number;
    @Input() perPage: number;
    @Input() loading: boolean;
    @Input() pagesToShow: number;

    @Output() goPrev = new EventEmitter<boolean>();
    @Output() goNext = new EventEmitter<number>();
    @Output() goPage = new EventEmitter<number>();

    constructor() {
    }

    getMin(): number {
        return ((this.perPage * this.page) - this.perPage) + 1;
    }

    getMax(): number {
        let max = this.perPage * this.page;
        if (max > this.count) {
            max = this.count;
        }
        return max;
    }

    onPage(n: number): void {
        // document.getElementById('infoLoad').setAttribute('style', 'display: ');
        this.goPage.emit(n);
        // document.getElementById('infoLoad').setAttribute('style', 'display: none');
    }

    onPrev(): void {
        // document.getElementById('infoLoad').setAttribute('style', 'display: ');
        this.goPrev.emit(true);
        // document.getElementById('infoLoad').setAttribute('style', 'display: none');
    }

    onNext(res): void {
        // document.getElementById('infoLoad').setAttribute('style', 'display: ');
        this.goNext.emit(res);
        // document.getElementById('infoLoad').setAttribute('style', 'display: none');
    }

    totalPages(): number {
        return Math.ceil(this.count / this.perPage) || 0;
    }

    lastPage(): boolean {
        // console.log(this.perPage * this.page >= this.count);
        return this.perPage * this.page >= this.count;
    }

    getPages(): number[] {
        const c = Math.ceil(this.count / this.perPage);
        const p = this.page || 1;
        const pagesToShow = this.pagesToShow || 9;
        const pages: number[] = [];
        pages.push(p);
        const times = pagesToShow - 1;
        for (let i = 0; i < times; i++) {
            if (pages.length < pagesToShow) {
                if (Math.min.apply(null, pages) > 1) {
                    pages.push(Math.min.apply(null, pages) - 1);
                }
            }
            if (pages.length < pagesToShow) {
                if (Math.max.apply(null, pages) < c) {
                    pages.push(Math.max.apply(null, pages) + 1);
                }
            }
        }
        pages.sort((a, b) => a - b);
        return pages;
    }
}
