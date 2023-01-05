// zone contain dragable element
const container = document.getElementById('container');
// Matrix size
let SIZE = 3;
// Game Width
let WIDTH = 600;
let SUCCESS = false;
// folder contain image
let folder = SIZE == 3 ? 'img-3' : 'img-4';

/**
 * Drag drop element
 * created by: tlkhanh 6/1/2023
 * @param {*} container zone contain dragable element
 */
function sortable(container) {
    let dragItem, nextItem;
    function handleDragOver(e) {
        e.preventDefault();
        // get current target
        let target = e.target;

        if (target && target !== dragItem && target.nodeName == 'DIV') {

            let box = target.getBoundingClientRect();
            // check to swap element
            let next = (e.clientY - box.top) / (box.bottom - box.top) > 0.5 ||
                (e.clientX - box.left) / (box.right - box.left) > 0.5;
            container.insertBefore(dragItem, next && target.nextSibling || target);
        }
    }
    /**
     * Drag end event
     * created by: tlkhanh 6/1/2023
     * @param {*} evt 
     */
    function handleDragEnd(e) {
        e.preventDefault();
        dragItem.classList.remove('dragging');
        checkSuccess();
        container.removeEventListener('dragover', handleDragOver, false);
        container.removeEventListener('dragend', handleDragEnd, false);
    }
    /**
     * Drag start event
     * created by: tlkhanh 6/1/2023
     */
    container.addEventListener('dragstart', function (e) {
        dragItem = e.target;
        nextItem = dragItem.nextSibling;
        container.addEventListener('dragover', handleDragOver, false);
        container.addEventListener('dragend', handleDragEnd, false);
        setTimeout(function () {
            dragItem.classList.add('dragging');
        }, 0)

    });

}
/**
 * init Game 
 * created by: tlkhanh 6/1/2023
 */
function loadGame() {
    let arr = [];

    while (arr.length != SIZE) {
        let num = Math.ceil(Math.random() * SIZE);
        if (arr.includes(num)) {
            num = Math.ceil(Math.random() * SIZE);
        } else {
            arr.push(num)
        }
    }
    let revertArr = arr.reverse();
    let html = '';
    for (let i = 0; i < SIZE * SIZE; i++) {

    }
    for (let i = 1; i <= SIZE; i++) {
        for (let j = 1; j <= SIZE; j++) {
            html += `<div draggable="true" style="background:url('./${folder}/row-${arr[j - 1]}-column-${revertArr[i - 1]}.jpg');" class='item'></div>`;
        }
    }

    container.innerHTML = html;
    let items = Array.from(document.querySelectorAll('.item'));
    items.forEach(item => {
        item.style.width = WIDTH / SIZE + 'px'
        item.style.height = WIDTH / SIZE + 'px'
    });
}
/**
 * Check game succes
 * created by: tlkhanh 6/1/2023
 */
function checkSuccess() {
    let items = Array.from(document.querySelectorAll('.item'));
    res = items.map(item => item.style.background);
    let val = '';
    for (let i = 1; i <= SIZE; i++) {
        for (let j = 1; j <= SIZE; j++) {
            val += `url("./${folder}/row-${i}-column-${j}.jpg");`;
        }
    }
    SUCCESS = res.join(';') + ';' == val;
    if (SUCCESS) {
        items.forEach(item => {
            item.style.border = 'unset';
            item.setAttribute('draggable', false);
            item.style.cursor = 'unset';
        });
    }

}
/**
 * Restart game
 * created by: tlkhanh 6/1/2023
 */
function restart() {
    SUCCESS = false;
    loadGame();
    let items = Array.from(document.querySelectorAll('.item'));
    items.forEach(item => {
        item.style.borderRight = '1px solid #fff';
        item.style.borderBottom = '1px solid #fff';
    });

}
/**
 * handle selection changed
 * created by: tlkhanh 6/1/2023
 * @param {*} e 
 */
function changeSelect(e) {
    SIZE = document.querySelector(".select-matrix").value;
    folder = SIZE == 3 ? 'img-3' : 'img-4'
    loadGame();
}


loadGame();
sortable(container);
checkSuccess();




