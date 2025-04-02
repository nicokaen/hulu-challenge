export function initNavigation() {
  focusOnFirstCard();

  document.addEventListener('keydown', (event) => {
    const focusedElement = document.activeElement;
    const categories = document.querySelectorAll('.category__row');

    switch (event.key) {
      case 'ArrowRight':
        // Move to the next item in the row
        const nextElement = focusedElement?.nextElementSibling;
        nextElement instanceof HTMLElement && nextElement?.focus();
        break;
      case 'ArrowLeft':
        // Move to the previous item in the row
        const previousElement = focusedElement?.previousElementSibling;
        previousElement instanceof HTMLElement && previousElement?.focus();
        break;
      case 'ArrowDown':
        // Move to the same index in the next row
        focusedElement && moveFocusToNextRow(focusedElement, categories, 1);
        break;
      case 'ArrowUp':
        // Move to the same index in the previous row
        focusedElement && moveFocusToNextRow(focusedElement, categories, -1);
        break;
    }
  });
}

function focusOnFirstCard() {
  const firstCard = document.querySelector('.card');
  firstCard instanceof HTMLElement && firstCard?.focus();
}

function moveFocusToNextRow(
  currentElement: Element,
  categories: NodeListOf<Element>,
  direction: number
) {
  const currentRow = currentElement.parentElement;
  const currentRowChildrenArray = currentElement.parentElement
    ? Array.from(currentElement.parentElement?.children)
    : [];
  const currentCardIndex = currentRowChildrenArray.indexOf(currentElement);

  const categoriesArray = Array.from(categories);
  const currentCategoryIndex = currentRow && categoriesArray.indexOf(currentRow);

  const newRow = currentCategoryIndex !== null && categories[currentCategoryIndex + direction];
  const newElement = newRow && newRow?.children[currentCardIndex];
  newElement instanceof HTMLElement && newElement?.focus();
}
