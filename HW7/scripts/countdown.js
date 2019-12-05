
function countdown(duration = 0) {
    return `${duration >= 0 ? '+' : ''}${(duration / 3600000).toFixed().padStart(2, '0')}:${Math.abs((duration / 60000 % 60)).toFixed().padStart(2, '0')}:${Math.abs(duration / 1000 % 60).toFixed().padStart(2, '0')}`;
}

console.log(countdown(-154800000) === '-43:00:00', '-43:00:00');

console.log(countdown(0) === '+00:00:00', '+00:00:00');

console.log(countdown(61000) === '+00:01:01', '+00:01:01');

console.log(countdown(360000000) === '+100:00:00', '+100:00:00');
