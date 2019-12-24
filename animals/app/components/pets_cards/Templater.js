export class Templater {
    static getPetTemplate({ id, image, breed, age, price, gender, species }) {
        return `<div class="ui card zoomInDown animated delay-fast">
        <img src="${image}" alt="${species}">
        <div class="content">
            <h1 class="header">${breed}</h1>
            <div class="meta left aligned age">Age: ${age}</div>
            <div class="ui two column centered grid">
                <div class="column">
                    Price: $${price}
                </div>
                <div class="column">
                    Gender: ${gender}
                </div>
            </div>
        </div>
        <div class="extra content">
            <div class="ui two buttons">
                <button class="ui to_cart button">Add to cart</button>
                <button class="ui details button" data-id="${id}">Details</button>
            </div>
        </div>
    </div>`;
    }
    static getPageButtonsTemplate(page, pagesCount) {
        let str = '';

        if (pagesCount === 0) {
            return str;
        }
        let leftMost = page - 3;
        let rightMost = page + 3;
        if (leftMost < 1) {
            leftMost = 1;
            rightMost = pagesCount >= 7 ? 7 : pagesCount;
        }
        if (rightMost > pagesCount) {
            const left = pagesCount - 6;
            leftMost = left > 0 ? left : 1;
            rightMost = pagesCount;
        }
        // leftMost = leftMost < 1 ? 1 : leftMost;
        // rightMost = rightMost > pagesCount ? pagesCount : rightMost;

        for (leftMost; leftMost <= rightMost; leftMost++) {
            if (leftMost === page) {
                str += `<button class="active item">${leftMost}</button>`;
            } else {
                str += `<button class="item">${leftMost}</button>`;
            }
        }
        if (pagesCount <= 7) {
            return `<div class="center aligned column zoomInDown animated delay-fast">
            <div class="ui pagination menu">${str}</div>
       </div>`;
        }
        if (page !== 1) {
            str = `<button class="item first__page">First</button>` + str;
        }
        if (page !== pagesCount) {
            str += `<button class="item first__page">Last</button>`;
        }
        return `<div class="center aligned column zoomInDown animated delay-fast">
             <div class="ui pagination menu">${str}</div>
        </div>`;
    }
    static getModalInfoTemplate({ species, price, gender, weight, age, color, breed, image, is_sterile, hair, type, activity, water_type, temper }) {
        return `<div class="ui modal flip animated faster">
        <div class="header">Breed: ${breed[0].toUpperCase() + breed.slice(1)}</div>
        <div class="image content">
            <div class="ui large image">
                <img src="${image}">
            </div>
            <div class="description">
                <div class="info__container">
                    <div class="ui header">Pet info:</div>
                    <div class="item row">
                        <div class="item name">Species:</div>
                        <div class="item value">${species}</div>
                    </div>
                    <div class="item row">
                        <div class="item name">Gender:</div>
                        <div class="item value">${gender}</div>
                    </div>
                    <div class="item row">
                        <div class="item name">Age:</div>
                        <div class="item value">${age}</div>
                    </div>
                    <div class="item row">
                        <div class="item name">Weight:</div>
                        <div class="item value">${weight}</div>
                    </div>
                    <div class="item row">
                        <div class="item name">Color:</div>
                        <div class="item value">${color}</div>
                    </div>
                    
                    ${is_sterile != undefined ?
                    `<div class="item row">
                        <div class="item name">Sterile:</div>
                        <div class="item value">${is_sterile ? 'yes' : 'no'}</div>
                    </div>` : ''} 
                    ${!!hair ? 
                    `<div class="item row">
                        <div class="item name">Hair:</div>
                        <div class="item value">${hair}</div>
                    </div>` : ''}
                    ${!!type ? 
                    `<div class="item row">
                        <div class="item name">Type:</div>
                        <div class="item value">${type}</div>
                    </div>` : ''}
                    ${!!water_type ? 
                    `<div class="item row">
                        <div class="item name">Type:</div>
                        <div class="item value">${water_type}</div>
                    </div>` : ''}
                    ${!!activity ? 
                    `<div class="item row">
                        <div class="item name">Activity:</div>
                        <div class="item value">${activity}</div>
                    </div>` : ''}
                    ${!!temper ? 
                    `<div class="item row">
                        <div class="item name">Temper:</div>
                        <div class="item value">${temper}</div>
                    </div>` : ''}
                    <div class="item row">
                        <div class="item name">Price:</div>
                        <div class="item value">$${price}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="actions">
            <button class="ui positive button">Close</button>
        </div>
    </div>`;
    }
    static getNoPetTemplate(query) {
        return `<div class="ui massive message zoomInDown animated delay-fast">Sorry, but we did not found "${query}"</div>`;
    }
}