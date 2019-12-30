export class Pagination {
    constructor(array, countPerPage) {
        this.list = array;
        this.itemsPerPage = countPerPage;
        this.currentPage = 1;
    }
    getPagesCount() {
        return Math.ceil(array.length / this.itemsPerPage);
    }
    getItemsCount() {
        return this.list.length;
    }
    getPageItemCount(pageIndex) {
        return pageIndex < this.getPagesCount() - 1 ? this.itemsPerPage : this.getItemsCount() % this.itemsPerPage;
    }
    getPageElements(page) {
        this.currentPage = page;
        const start = (page - 1) * this.itemsPerPage;
        return this.list.slice(start, start + this.itemsPerPage);
    }
}