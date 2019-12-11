import { numericalSequence } from '../src/task6.js';

export function test6(assert, expect) {
    describe('Numerical sequence tests', function () {
        it('Pass valid parameters, check result', function () {
            assert.deepEqual(numericalSequence(6, 64), '8, 9, 10, 11, 12, 13');
            assert.deepEqual(numericalSequence(6, 74.8), '9, 10, 11, 12, 13, 14');
        });
        it('No arguments, error thrown', function () {
            expect(numericalSequence).to.throw();
        });
        it('Length <= 0 && length > 100', function () {
            const test = () => {
                numericalSequence(101, 121);
            };
            const test1 = () => {
                numericalSequence(0, 121);
            };
            const test2 = () => {
                numericalSequence(-1, 121);
            };
            expect(test).to.throw();
            expect(test1).to.throw();
            expect(test2).to.throw();
        });
    });
}