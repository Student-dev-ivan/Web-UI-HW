import { envelopesAnalysis } from '../src/task2.js';

export function test2(assert, expect) {
    describe('Envelopes tests', function () {
        it('The first envelope is bigger than the second, should return 1', function () {
            assert.equal(envelopesAnalysis({ a: 10, b: 5 }, { c: 9, d: 4 }), 1);
        });
        it('The second envelope is bigger than the first, should return 2', function () {
            assert.equal(envelopesAnalysis({ a: 5, b: 5 }, { c: 9, d: 6 }), 2);
        });
        it('Both elnvelopes have the same width (10) but different height (5,1), the second could be stored inside the first, should return 1', function () {
            assert.equal(envelopesAnalysis({ a: 5, b: 10 }, { c: 1, d: 10 }), 1);
        });
        it('Both elnvelopes have the same width (10) but different height (2,1), shoud return 0', function () {
            assert.equal(envelopesAnalysis({ a: 2, b: 10 }, { c: 1, d: 10 }), 0);
        });
        it('Envelopes sides are equal, should return 0', function () {
            assert.equal(envelopesAnalysis({ a: 2, b: 3 }, { c: 2, d: 3 }), 0);
        });
        it('The first envelope is bigger than the second (larger sides), should return 1', function () {
            assert.equal(envelopesAnalysis({ a: 10000, b: 50000 }, { c: 6789, d: 40000 }), 1);
        });
        it('No arguments, error thrown', function () {
            expect(envelopesAnalysis).to.throw();
        });
        it('Width and height are negative, error thrown', function () {
            const test = () => {
                envelopesAnalysis({ a: -10000, b: -50000 }, { c: 6789, d: 40000 })
            };
        });
    });
}