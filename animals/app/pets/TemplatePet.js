export class TemplaterPet {
    getPetTemplate(animal) {
        return `<div class="ui card">
        <img src="${animal.image}" alt="animal">
        <div class="content">
            <h1 class="header left aligned">${animal.breed}</h1>
            <div class="meta left aligned age">Age: ${animal.age}</div>
            <div class="ui two column centered grid">
                <div class="column">
                    Price: $${animal.price}
                </div>
                <div class="column">
                    Gender: ${animal.gender}
                </div>
            </div>
        </div>
        <div class="extra content">
            <div class="ui two buttons">
                <button class="ui blue button">Add to cart</button>
                <button class="ui yellow button">Details</button>
            </div>
        </div>
    </div>`;
    }
}


// `<div class="ui card">
// <div class="image">
//     <img class="small" src="${animal.image}" alt="cat">
// </div>
// <div class="content">
//     <h1 class="header left aligned">${animal.breed}</h1>
//     <div class="meta left aligned age">Age: ${animal.age}</div>
//     <div class="ui two column centered grid">
//         <div class="column">
//             Price: $${animal.price}
//         </div>
//         <div class="column">
//             Gender: ${animal.gender}
//         </div>
//     </div>
// </div>
// <div class="extra content">
//     <div class="ui two buttons">
//         <button class="ui blue button">Add to cart</button>
//         <button class="ui yellow button">Details</button>
//     </div>
// </div>
// </div>`;