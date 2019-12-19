export class Paginator {
    constructor(array, countPerPage) {
        this.list = array;
        this.itemsPerPage = countPerPage;
        this.currentPageIndex = 0;
    }
    setList(array) {
        this.list = array;
    }
    getPagesCount() {
        return Math.ceil(array.length / this.itemsPerPage);
    }
    getItemCount() {
        return this.list.length;
    }
    getPageItemCount(pageIndex) {
        return pageIndex < this.getPagesCount() - 1 ? this.itemsPerPage : this.getItemCount() % this.itemsPerPage;
    }

}