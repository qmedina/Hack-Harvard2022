window.onload = () => {
    prepareMouseMove();
}

function prepareMouseMove() {
    const maybeMouseEvent: MouseEvent
    const maybeMouseEvent: Element | null = MouseEvent.
    if (maybeInputs == null) {
        console.log("No button");
    } else if (!(maybeInputs instanceof Html))
}



let button = document.getElementById('button');

const onMouseMove = (e) =>{
  button.style.left = e.pageX + 'px';
  button.style.top = e.pageY + 'px';
}

document.addEventListener('mousemove', onMouseMove);