import { chessBoard } from '../src/task1.js';

export function test1(assert, expect) {
    describe('Chess board tests', function () {
        it('Height and width equal to 5, symbol is %', function () {
            assert.equal(chessBoard(5, 5, '%'), '%  %  %  %  %\n %  %  %  %  %\n%  %  %  %  %\n %  %  %  %  %\n%  %  %  %  %\n')
        });
        it('Height and width equal to 2, symbol is #', function () {
            assert.equal(chessBoard(2, 2, '#'), '#  #\n #  #\n');
        });
        it('String type check', function () {
            assert.typeOf(chessBoard(100, 100, 'H'), 'string');
        });
        it('No arguments, error thrown', function () {
            expect(chessBoard).to.throw();
        });
        it('Height of type string, error thrown', function () {
            const test = () => {
                chessBoard('d', 4, '8');
            };
            expect(test).to.throw();
        });
        it('Symbol of type number, error thrown', function () {
            const test = () => {
                chessBoard(5, 4, 5);
            };
            expect(test).to.throw();
        });
        it('Symbol length != 1, error thrown', function () {
            const test = () => {
                chessBoard(5, 4, '&&');
            };
            expect(test).to.throw();
        });
    });
}