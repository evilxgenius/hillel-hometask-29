// 1. Створити квадрат і розмістити його по центру body.
// 2. При натисканні на стрілки квадрат зміщується у відповідному напрямку на 10px. Квадрат не повинен виходити за межі body.
//   - При кожному "врізанні" в body - квадрат відстрибує на 10px * 2 (20px) у протилежному напрямку.
//   - При кожному відстрибуванні – по центру квадрату з'являється напис "БЕМС", який зникає через 2 секунди.
// 3. При натисканні на пробіл – квадрат підстрибує на 10px вгору і повертається на початкове місце.
//    Для плавності анімації можна використовувати transition.
// 4. При натисканні на CTRL – квадрат присідає: зменшуємо його висоту на 40% і збільшуємо ширину на 25%.
//    Для плавності анімації можна використовувати transition.

const step = 10;
const bodyField = document.body;
const square = bodyField.querySelector('.square');
const squareMessage = square.querySelector('span');
const hideBemsMessageWithTimeout = ((timeout) => {
    let timeoutId = 0;

    return function () {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            squareMessage.className = 'hidden';
        }, timeout);
    }
})(2000);

function arrowUpAction(params) {
    const nextPosition = square.offsetTop - step;

    if (nextPosition <= params.squareHalfHeight) {
        document.removeEventListener('keydown', squareMovesHandler);
        square.style.top = params.squareHalfHeight + 'px';
        squareMessage.className = 'visible';

        setTimeout(() => {
            hideBemsMessageWithTimeout();

            square.addEventListener('transitionend', transitionEndHandler);
            square.style.transition = 'top .5s ease-out';
            square.style.top = params.squareHalfHeight + 20 + 'px';
        }, 100)
    } else {
        square.style.top = nextPosition + 'px';
    }
}

function arrowDownAction(params) {
    const nextPosition = square.offsetTop + params.squareHalfHeight + step;

    if (nextPosition >= params.bodyHeight) {
        document.removeEventListener('keydown', squareMovesHandler);
        square.style.top = params.bodyHeight - params.squareHalfHeight + 'px';
        squareMessage.className = 'visible';

        setTimeout(() => {
            hideBemsMessageWithTimeout();

            square.addEventListener('transitionend', transitionEndHandler);
            square.style.transition = 'top .5s ease-out';
            square.style.top = params.bodyHeight - params.squareHalfHeight - 20 + 'px';
        }, 100)
    } else {
        square.style.top = square.offsetTop + step + 'px';
    }
}

function arrowLeftAction(params) {
    const nextPosition = square.offsetLeft - step;

    if (nextPosition <= params.squareHalfWidth) {
        document.removeEventListener('keydown', squareMovesHandler);
        square.style.left = params.squareHalfWidth + 'px';
        squareMessage.className = 'visible';

        setTimeout(() => {
            hideBemsMessageWithTimeout();

            square.addEventListener('transitionend', transitionEndHandler);
            square.style.transition = 'left .5s ease-out';
            square.style.left = params.squareHalfHeight + 20 + 'px';
        }, 100)
    } else {
        square.style.left = nextPosition + 'px';
    }
}

function arrowRightAction(params) {
    const nextPosition = square.offsetLeft + params.squareHalfWidth + step;

    if (nextPosition >= params.bodyWidth) {
        document.removeEventListener('keydown', squareMovesHandler);
        square.style.left = params.bodyWidth - params.squareHalfHeight + 'px';
        squareMessage.className = 'visible';

        setTimeout(() => {
            hideBemsMessageWithTimeout();

            square.addEventListener('transitionend', transitionEndHandler);
            square.style.transition = 'left .5s ease-out';
            square.style.left = params.bodyWidth - params.squareHalfHeight - 20 + 'px';
        }, 100)
    } else {
        square.style.left = square.offsetLeft + step + 'px';
    }
}

function spaceAction() {
    document.removeEventListener('keydown', squareMovesHandler);

    square.style.transition = 'top .5s ease-out';
    square.style.top = square.offsetTop - 10 + 'px';

    setTimeout(() => {
        square.addEventListener('transitionend', transitionEndHandler);

        square.style.transition = 'top .5s ease-in';
        square.style.top = square.offsetTop + 10 + 'px';
    }, 500)
}

function controlAction() {
    const startHeight = square.clientHeight;
    const startWidth = square.clientWidth;
    const startPosition = square.offsetTop;

    document.removeEventListener('keydown', squareMovesHandler);

    square.style.transition = 'height .5s, width .5s, top .5s';
    square.style.height = (40 * startHeight / 100) + 'px';
    square.style.width = startWidth + (25 * startWidth / 100) + 'px';
    square.style.top = startPosition + (startHeight - parseInt(square.style.height)) / 2 + 'px';

    setTimeout(() => {
        square.addEventListener('transitionend', transitionEndHandler);

        square.style.transition = 'all .5s ease-in';
        square.style.height = startHeight + 'px';
        square.style.width = startWidth + 'px';
        square.style.top = startPosition + 'px';
    }, 500)
}

function transitionEndHandler() {
    square.removeEventListener('transitionend', transitionEndHandler);
    document.addEventListener('keydown', squareMovesHandler);
    square.style.transition = null;
}

function squareMovesHandler (event) {
    console.log(event);

    const fieldItemParams = {
        bodyWidth: bodyField.clientWidth,
        bodyHeight: bodyField.clientHeight,
        squareHalfWidth: square.clientWidth / 2,
        squareHalfHeight: square.clientHeight / 2,
    }

    switch (event.code) {
        case 'ArrowUp':
            arrowUpAction(fieldItemParams);
            break;
        case 'ArrowDown':
            arrowDownAction(fieldItemParams);
            break;
        case 'ArrowLeft':
            arrowLeftAction(fieldItemParams);
            break;
        case 'ArrowRight':
            arrowRightAction(fieldItemParams);
            break;
        case 'Space':
            spaceAction();
            break;
        default:
            if (event.key === 'Control') controlAction();
    }
}

document.addEventListener('keydown', squareMovesHandler);
