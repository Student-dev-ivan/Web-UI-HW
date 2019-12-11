import { fibonacciSequence } from '../src/task7.js';

export function test7(assert, expect) {
    describe('Fibonacci sequence tests', function () {
        it('Pass valid parameters, check result', function () {
            assert.deepEqual(fibonacciSequence({ min: 0, max: 500 }), [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377]);
            assert.deepEqual(fibonacciSequence({ length: 15 }), [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377]);
        });
        it('No arguments, error thrown', function () {
            expect(fibonacciSequence).to.throw();
        });
        it('Object contains min, max and length values, error thrown', function () {
            const test = () => {
                fibonacciSequence({ min: 0, max: 500, length: 15 });
            };
            expect(test).to.throw();
        });
        it('Object contains invalid values, error thrown', function () {
            const test = () => {
                fibonacciSequence({ min: '0', max: 500 });
            };
            const test1 = () => {
                fibonacciSequence({ length: NaN });
            };
            expect(test).to.throw();
            expect(test1).to.throw();
        });
    });
}