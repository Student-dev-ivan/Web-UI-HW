import { biggestPalindrome } from '../src/task4.js';

export function test4(assert, expect) {
    describe('Palindrome tests', function () {
        it('Pass palindrome number, return full number', function () {
            assert.equal(biggestPalindrome(12345654321), '12345654321');
        });
        it('Pass number that contains palindrome, return palindrome part', function () {
            assert.equal(biggestPalindrome(5434565432148), '3456543');
        });
        it('Pass number that contains 3 palindromes, return the biggest', function () {
            assert.equal(biggestPalindrome(444433332222), '4444');
        });
        it('No arguments, error thrown', function () {
            expect(biggestPalindrome).to.throw();
        });
        it('Pass string, error thrown', function () {
            const test = () => {
                biggestPalindrome('123');
            };
            expect(test).to.throw();
        });
        it('Pass number < 10, error thrown', function () {
            const test = () => {
                biggestPalindrome(9);
            };
            expect(test).to.throw();
        });
        it('Pass number > 9007199254740991, error thrown', function () {
            const test = () => {
                biggestPalindrome(9007199254740992);
            };
            expect(test).to.throw();
        });
    });
}