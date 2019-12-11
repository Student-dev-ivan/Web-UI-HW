import { chessBoard } from './src/task1.js';
import { envelopesAnalysis } from './src/task2.js';
import { triangleSort } from './src/task3.js'
import { biggestPalindrome } from './src/task4.js';
import { luckyTickets } from './src/task5.js';
import { numericalSequence } from './src/task6.js';
import { fibonacciSequence } from './src/task7.js';


const btns = document.querySelectorAll('.button');
const tasks = document.querySelectorAll('.task');
const forms = document.querySelectorAll('[id^="form"]');
const output = document.querySelector('.output');
let autoReset = false;

document.querySelector('#autoreset').addEventListener('click', () => {
    autoReset = autoReset === false ? true : false;
});

btns.forEach(btn => btn.addEventListener('click', function () {
    tasks.forEach(task => {
        if (this.nextElementSibling != task) {
            task.classList.remove('task-shown');
        }
    });
    [...forms].forEach(form => form.reset());
    this.nextElementSibling.classList.toggle('task-shown');
}));

document.querySelector('#chess_apply').addEventListener('click', () => {
    const values = [...forms[0].elements].reduce((res, input) => {
        if (input.value !== 'Apply') {
            input.placeholder === 'Symbol' ? res.push(input.value) : res.push(Number(input.value));
        }
        return res;
    }, []);
    output.innerHTML = '';
    const pre = document.createElement('pre');
    try {
        pre.innerText = chessBoard(...values);
        output.style.backgroundColor = 'lightseagreen';
        output.appendChild(pre);
    } catch (err) {
        const p = document.createElement('p');
        p.innerText = err;
        output.style.backgroundColor = '#b22020';
        output.appendChild(p);
    }
    resetForm(forms[0], autoReset);
});

document.querySelector('#envelopes_apply').addEventListener('click', () => {
    const values = [...forms[1]].reduce((res, input) => {
        if (input.value !== 'Apply') {
            res.push(Number(input.value));
        }
        return res;
    }, []);

    const envelope1 = {
        a: values[0],
        b: values[1]
    };
    const envelope2 = {
        c: values[2],
        d: values[3]
    };

    output.innerHTML = '';
    const p = document.createElement('p');
    try {
        p.innerText = envelopesAnalysis(envelope1, envelope2);
        output.style.backgroundColor = 'lightseagreen';
        output.appendChild(p);
    } catch (err) {
        p.innerText = err;
        output.style.backgroundColor = '#b22020';
        output.appendChild(p);
    }
    resetForm(forms[1], autoReset);
});

document.querySelector('#triangles_apply').addEventListener('click', () => {
    const values = [...forms[2]].reduce((res, input) => {
        if (input.value !== 'Apply') {
            input.name === 'triangleName' ?
                res.push(input.value) : res.push(input.value.split(',').map(Number));
        }
        return res;
    }, []);
    const listTriangle = [];
    for (let i = 0; i < 3; i++) {
        const triangle = {};
        const tops = values[i].toLowerCase().split('');
        triangle.name = values[i];
        triangle[`${tops[0]}`] = values[i + 3][0];
        triangle[`${tops[1]}`] = values[i + 3][1];
        triangle[`${tops[2]}`] = values[i + 3][2];
        listTriangle.push(triangle);
    }
    output.innerHTML = '';
    const p = document.createElement('p');
    try {
        p.innerText = triangleSort(listTriangle).join(', ');
        output.style.backgroundColor = 'lightseagreen';
        output.appendChild(p);
    } catch (err) {
        p.innerText = err;
        output.style.backgroundColor = '#b22020';
        output.appendChild(p);
    }
    resetForm(forms[2], autoReset);
});

document.querySelector('#palindrome_apply').addEventListener('click', () => {
    output.innerHTML = '';
    const p = document.createElement('p');
    try {
        p.innerText = biggestPalindrome(Number(forms[3][0].value));
        output.style.backgroundColor = 'lightseagreen';
        output.appendChild(p);
    } catch (err) {
        p.innerText = err;
        output.style.backgroundColor = '#b22020';
        output.appendChild(p);
    }
    resetForm(forms[3], autoReset);
});

document.querySelector('#tickets_apply').addEventListener('click', () => {
    output.innerHTML = '';
    const min = forms[4][0].value;
    const max = forms[4][1].value;
    const p = document.createElement('p');
    try {
        p.innerText = JSON.stringify(luckyTickets({
            min: min === '' ? undefined : Number(min),
            max: max === '' ? undefined : Number(max)
        }), null, 2);
        output.style.backgroundColor = 'lightseagreen';
        output.appendChild(p);
    } catch (err) {
        p.innerText = err;
        output.style.backgroundColor = '#b22020';
        output.appendChild(p);
    }
    resetForm(forms[4], autoReset);
});

document.querySelector('#sequence_apply').addEventListener('click', () => {
    output.innerHTML = '';
    const p = document.createElement('p');
    try {
        p.innerText = numericalSequence(Number(forms[5][0].value), Number(forms[5][1].value));
        output.style.backgroundColor = 'lightseagreen';
        output.appendChild(p);
    } catch (err) {
        p.innerText = err;
        output.style.backgroundColor = '#b22020';
        output.appendChild(p);
    }
    resetForm(forms[5], autoReset);
});

document.querySelector('#fibonacci_apply').addEventListener('click', () => {
    const range = forms[6][0].value.split(',');
    const context = {
        min: range[0] === '' ? undefined : Number(range[0]),
        max: range[1] === '' || range[1] === undefined ? undefined : Number(range[1]),
        length: forms[6][1].value === '' ? undefined : Number(forms[6][1].value)
    }
    output.innerHTML = '';
    const p = document.createElement('p');
    try {
        p.innerText = fibonacciSequence(context).join(', ');
        output.style.backgroundColor = 'lightseagreen';
        output.appendChild(p);
    } catch (err) {
        p.innerText = err;
        output.style.backgroundColor = '#b22020';
        output.appendChild(p);
    }
    resetForm(forms[6], autoReset);
});

function resetForm(form, autoreset) {
    if (autoreset) {
        form.reset();
    }
}































// console.log(envelopesAnalysis({ a: 100, b: 100 }, { c: 140, d: 1 }));

// const listTriangle = [{ name: 'ABC', a: 10, b: 7, c: 6 }, { name: 'DEF', d: 8, e: 12, f: 6 }, { name: 'GHI', g: 3, h: 4, i: 5 }];

// console.log(triangleSort(listTriangle));
// console.log(listTriangle);



// const form1 = document.querySelector('#form1');
// const submit = document.querySelector('#form1').querySelector('[type="button"]');
// submit.addEventListener('click', () => {

//     const values = [...form1.elements].reduce((res, input) => {
//         if (input.value !== 'Apply') {
//             res.push(input.value);
//         }
//         return res;
//     }, []);
//     // [...form1.elements].reduce((elementsValues, element) => elementsValues.push(element.value), []);
//     form1.reset();
//     console.log(chessBoard(+values[0], +values[1], values[2]));
// })

// console.log(biggestPalindrome(1000099254740991));

// console.log(luckyTickets({ min: 0, max: 100500 }));

// console.log(numericalSequence(4,50));


