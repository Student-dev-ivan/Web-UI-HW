import { triangleSort } from '../src/task3.js';

export function test3(assert, expect) {
    describe('Triangle sort tests', function () {
        it('Passing different triangles', function () {
            assert.deepEqual(triangleSort([{ name: 'ABC', a: 3, b: 4, c: 5 },
            { name: 'DEF', d: 5, e: 6, f: 7 },
            { name: 'GHI', g: 150, h: 140, i: 170 },
            { name: 'POQ', p: 8, o: 9, q: 11 },
            { name: 'YTR', y: 2, t: 2, r: 2 },
            ]), ['GHI', 'POQ', 'DEF', 'ABC', 'YTR']);
        });
        it('No arguments, error thrown', function () {
            expect(triangleSort).to.throw();
        });
        it('One of the triangles does not have one side, error thrown', function () {
            const test = () => {
                triangleSort([{ name: 'ABC', a: 3, b: 4, c: 5 },
                { name: 'DEF', d: 5, e: 6 },
                { name: 'GHI', g: 150, h: 140, i: 170 },
                ]);
            };
            expect(test).to.throw();
        });
        it('One of the triangles does not have a name, error thrown', function () {
            const test = () => {
                triangleSort([{ a: 3, b: 4, c: 5 },
                { name: 'DEF', d: 5, e: 6 },
                { name: 'GHI', g: 150, h: 140, i: 170 },
                ]);
            };
            expect(test).to.throw();
        });
        it('One of the triangles has invalid side name, error thrown', function () {
            const test = () => {
                triangleSort([{ a: 3, b: 4, c: 5 },
                { name: 'DEF', d: 5, e: 6 },
                { name: 'GHI', f: 150, h: 140, i: 170 },
                ]);
            };
            expect(test).to.throw();
        });
        it('One of the triangles has invalid sides length, error thrown', function () {
            const test = () => {
                triangleSort([{ a: 3, b: 2, c: 1 },
                { name: 'DEF', d: 5, e: 6 },
                { name: 'GHI', f: 150, h: 140, i: 170 },
                ]);
            };
            expect(test).to.throw();
        });
    });
}