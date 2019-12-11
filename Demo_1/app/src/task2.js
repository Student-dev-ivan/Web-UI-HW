
export function envelopesAnalysis(envelope1, envelope2) {

    if (!isValidInput(envelope1, envelope2)) {
        const err = {
            status: "failed",
            reason: "the envelopes must be objects, their sides must me in the range (0,1000000]"
        };
        throw new Error(JSON.stringify(err, null, 2));
    }
    const diagonal1 = Math.sqrt(envelope1.a ** 2 + envelope1.b ** 2);
    const diagonal2 = Math.sqrt(envelope2.c ** 2 + envelope2.d ** 2);

    if (diagonal1 === diagonal2) {
        return 0;
    }

    return diagonal1 > diagonal2 ?
        checkForInsert(envelope1.a, envelope1.b, envelope2.c, envelope2.d, 1) :
        checkForInsert(envelope2.c, envelope2.d, envelope1.a, envelope1.b, 2);
}

function checkForInsert(bigEnvelopeHeight, bigEnvelopeWidth, smallEnvelopeHeight, smallEnvelopeWidth, bigEnvelopeNumber) {
    if ((bigEnvelopeHeight > smallEnvelopeHeight && bigEnvelopeWidth > smallEnvelopeWidth)
        || (bigEnvelopeHeight > smallEnvelopeWidth && bigEnvelopeWidth > smallEnvelopeHeight)) {
        return bigEnvelopeNumber;
    }
    for (let i = 1; i < 90; i++) {
        const tiltHeight = Math.cos(Math.PI / 180 * i) * smallEnvelopeHeight + Math.sin(Math.PI / 180 * i) * smallEnvelopeWidth;
        const tiltWidth = Math.cos(Math.PI / 180 * i) * smallEnvelopeWidth + Math.sin(Math.PI / 180 * i) * smallEnvelopeHeight;
        if (bigEnvelopeHeight > tiltHeight && bigEnvelopeWidth > tiltWidth) {
            return bigEnvelopeNumber;
        }
    }
    return 0;
}

function isValidInput(envelope1, envelope2) {
    return typeof envelope1 === 'object' &&
        typeof envelope2 === 'object' &&
        typeof envelope1.a === 'number' &&
        typeof envelope1.b === 'number' &&
        typeof envelope2.c === 'number' &&
        typeof envelope2.d === 'number' &&
        envelope1.a > 0 && envelope1.b <= 1000000 &&
        envelope2.c > 0 && envelope2.d <= 1000000;
}