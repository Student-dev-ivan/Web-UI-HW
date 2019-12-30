export class TemplaterSearch {
    static getMenuTemplate() {
        return `<div class="ui container search__menu">
        <a href="./">
            <div class="header item">
                <i class="paw icon"></i>
                Pet Shop
            </div>
        </a>
        <div class="item" data-species="all">All</div>
        <div class="item" data-species="dog">Dogs</div>
        <div class="item" data-species="cat">Cats</div>
        <div class="item" data-species="bird">Birds</div>
        <div class="item" data-species="fish">Fishes</div>
        <div class="right menu">
            <div class="ui search item">
                <div class="ui icon input">
                    <input class="prompt input__search" type="text" placeholder="breed">
                    <button class="ui button search__button" name="search"><i class="search icon"></i></button>
                </div>
            </div>
            <div class="ui cart item"></div>
        </div>
    </div>`;
    }
}