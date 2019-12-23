export class Templater {
    static getPetTemplate({ id, image, breed, age, price, gender, species }) {
        return `<div class="ui card">
        <img src="${image}" alt="${species}">
        <div class="content">
            <h1 class="header">${breed[0].toUpperCase() + breed.slice(1)}</h1>
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
            return `<div class="center aligned column">
            <div class="ui pagination menu">${str}</div>
       </div>`;
        }
        if (page !== 1) {
            str = `<button class="item first__page">First</button>` + str;
        }
        if (page !== pagesCount) {
            str += `<button class="item first__page">Last</button>`;
        }
        return `<div class="center aligned column">
             <div class="ui pagination menu">${str}</div>
        </div>`;
    }
    static getModalInfoTemplate({ species, price, gender, weight, age, color, breed, image, is_sterile, hair, type, activity, water_type, temper }) {
        return `<div class="ui modal">
        <div class="header">Breed: ${breed[0].toUpperCase() + breed.slice(1)}</div>
        <div class="image content">
            <div class="ui fluid image">
                <img src="${image}">
            </div>
            <div class="description">
                <div class="info__container">
                    <div class="ui header">Pet info:</div>
                    <div class="item">Species: ${species}</div>
                    <div class="item">Gender: ${gender}</div>
                    <div class="item">Age: ${age}</div>
                    <div class="item">Weight: ${weight}</div>
                    <div class="item">Color: ${color}</div>
                    ${is_sterile != undefined ? `<div class="item">Sterile: ${is_sterile ? 'yes' : 'no'}</div>` : ''} 
                    ${!!hair ? `<div class="item">Hair: ${hair}</div>` : ''}
                    ${!!type ? `<div class="item">Type: ${type}</div>` : ''}
                    ${!!water_type ? `<div class="item">Type: ${water_type}</div>` : ''}
                    ${!!activity ? `<div class="item">Activity: ${activity}</div>` : ''}
                    ${!!temper ? `<div class="item">Temper: ${temper}</div>` : ''}
                    <div class="item">Price: $${price}</div>
                </div>
            </div>
        </div>
        <div class="actions">
            <button class="ui positive button">Close</button>
        </div>
    </div>`;
    }
    static getNoPetTemplate(query) {
        return `<div class="ui massive message">Sorry, but we did not found "${query}"</div>`;
    }
}