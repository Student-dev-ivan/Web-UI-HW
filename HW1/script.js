// Football Task:
// Most football fans love it for the goals and excitement. You are to handle the referee's 
// little notebook and count the players who were sent off for fouls and misbehavior.


// The rules: Two teams, named "A" and "B" have 11 players each; players on each team are 
// numbered from 1 to 11. Any player may be sent off the field by being given a red card. A 
// player can also receive a yellow warning card, which is fine, but if he receives another 
// yellow card, he is sent off immediately (no need for a red card in that case). If one of the 
// teams has less than 7 players remaining, the game is stopped immediately by the referee, 
// and the team with less than 7 players loses.


// A card is a string with the team's letter ('A' or 'B'), player's number, and card's color ('Y' or 
// 'R') - all concatenated and capitalized. e.g the card 'B7Y' means player #7 from team B 
// received a yellow card.


// The task: Given a list of cards (could be empty), return the number of remaining players 
// on each team at the end of the game (as a tuple of 2 integers, team "A" first). If the game 
// was terminated by the referee for insufficient number of players, you are to stop the game
// immediately, and ignore any further possible cards.
// If a player that has already been sent off receives another card - ignore it.

function menStillStanding(array) {
    let teamA = 11,
        teamB = 11;

    if (array.length === 0) {
        return [teamA, teamB];
    }

    let cardsArray = [...array];

    cardsArray.forEach((item) => {
        let yellowCards = 0;
        let redCards = 0;
        let player = item.substring(0, 2);

        for (let card of cardsArray) {
            card === `${player}Y` ? ++yellowCards : null;
            card === `${player}R` ? ++redCards : null;
            if (teamA < 7 || teamB < 7) {
                break;
            }
            if (redCards === 1 || yellowCards == 2) {
                player.includes('A') ? --teamA : --teamB;
                break;
            }

        }
        cardsArray = cardsArray.filter(card => card != item);
    });
    return [teamA, teamB];
}
console.log(menStillStanding([]), '[11,11]');
console.log(menStillStanding(['A1R', 'B3Y', 'B3Y']), '[10,10]');
console.log(menStillStanding(['A1R', 'A2R', 'A3R', 'A4R', 'A5R', 'A6R', 'A7R']),'[6,11]');

