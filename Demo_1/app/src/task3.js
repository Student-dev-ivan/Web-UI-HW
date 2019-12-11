
export function triangleSort(listTriangle) {
    if (!isValidInput(listTriangle)) {
        const err = {
            status: "failed",
            reason: "max triangle list length must be in the range (0,1000000], make sure that all your traingles are valid, they have names and sum of any two sides must be greater then third side length"
        }
        throw new Error(JSON.stringify(err, null, 2));
    }
    listTriangle.forEach(triangle => {
        const tops = triangle.name.toLowerCase().split('');
        const p = (triangle[`${tops[0]}`] + triangle[`${tops[1]}`] + triangle[`${tops[2]}`]) / 2;
        triangle['area'] = Math.sqrt(p * (p - triangle[`${tops[0]}`]) * (p - triangle[`${tops[1]}`]) * (p - triangle[`${tops[2]}`]));
    });
    const result = [];
    listTriangle.sort((triangle1, triangle2) => triangle2.area - triangle1.area).forEach(triangle => {
        result.push(triangle.name);
    });
    return result;
}

function isValidInput(listTriangle) {
    switch (true) {
        case listTriangle === undefined:
        case listTriangle.length === 0:
        case listTriangle.some(triangle => triangle.name === undefined || triangle.name.length !== 3):
        case listTriangle.some(triangle => {
            const tops = triangle.name.toLowerCase().split('');
            return typeof triangle[`${tops[0]}`] !== 'number' || typeof triangle[`${tops[1]}`] !== 'number' || typeof triangle[`${tops[2]}`] !== 'number' || isNaN(triangle[`${tops[0]}`]) || isNaN(triangle[`${tops[1]}`] || isNaN(triangle[`${tops[2]}`]));
        }):
        case listTriangle.some(triangle => {
            const tops = triangle.name.toLowerCase().split('');
            return triangle[`${tops[0]}`] + triangle[`${tops[1]}`] <= triangle[`${tops[2]}`] ||
                triangle[`${tops[1]}`] + triangle[`${tops[2]}`] <= triangle[`${tops[0]}`] ||
                triangle[`${tops[2]}`] + triangle[`${tops[0]}`] <= triangle[`${tops[1]}`];
        }):
            return false;
    }
    return true;
}
