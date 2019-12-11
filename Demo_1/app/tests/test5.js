import { luckyTickets } from '../src/task5.js';

export function test5(assert, expect) {
    describe('Lucky tickets tests', function () {
        it('Pass valid context object, check result', function () {
            assert.deepEqual(luckyTickets({ min: 0, max: 11 }), { winner: 'Complex', simple: 1, complex: 2 });
        });
        it('Pass max range, check result', function () {
            assert.deepEqual(luckyTickets({ min: 0, max: 999999 }), { winner: 'No winner', simple: 55252, complex: 55252 });
        });
        it('No arguments, error thrown', function () {
            expect(luckyTickets).to.throw();
        });
        it('Pass empty object, error thrown', function () {
            const test = () => {
                luckyTickets({});
            };
            expect(test).to.throw();
        });
        it('Pass object with invalid values, error thrown', function () {
            const test = () => {
                luckyTickets({ min: -1, max: '999999' });
            };
            expect(test).to.throw();
        });
        it('Pass object with min>max, error thrown', function () {
            const test = () => {
                luckyTickets({ min: 9999, max: 10 });
            };
            expect(test).to.throw();
        });
    });
}