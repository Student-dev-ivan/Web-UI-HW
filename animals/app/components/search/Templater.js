export class Templater {
    static getMenuTemplate() {
        return `<div class="ui container search__menu">
        <a href="./">
            <div class="header item">
                <i class="paw icon"></i>
                Pet Shop
            </div>
        </a>
        <div class="item">Dogs</div>
        <div class="item">Cats</div>
        <div class="item">Birds</div>
        <div class="item">Fishes</div>
        <div class="right menu">
            <div class="ui search">
                <div class="ui icon input">
                    <input class="prompt input__search" type="text" placeholder="breed">
                    <button class="ui button search__button" name="search"><i class="search icon"></i></button>
                </div>
            </div>
        </div>
    </div>`;
    }
}