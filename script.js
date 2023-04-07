const draggables = document.querySelectorAll(".draggable");
const droppables = document.querySelectorAll(".droppable");

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", (e) => {
    draggable.classList.add("dragged");
  });

  draggable.addEventListener("dragend", (e) => {
    draggable.classList.remove("dragged");
  });
});

droppables.forEach((droppable) => {
  droppable.addEventListener("dragover", (e) => {
    e.preventDefault();

    const afterElement = getDragAfterElement(droppable, e.clientY);

    const dragged = document.querySelector(".dragged");

    if (afterElement === null) droppable.appendChild(dragged);
    else droppable.insertBefore(dragged, afterElement);
  });
});

function getDragAfterElement(droppable, y) {
  const draggableElements = [
    ...document.querySelectorAll(".draggable:not(.dragged)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset)
        if (child.parentElement === droppable)
          return { offset, element: child };

      return closest;
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
