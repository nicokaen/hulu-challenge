export function initNavigation() {
  focusOnFirstCard();

  document.addEventListener('keydown', (event) => {
    const focusedElement = document.activeElement;
    const categories = document.querySelectorAll('.category__row');

    switch (event.key) {
      case 'ArrowRight':
        // Move to the next item in the row
        const nextElement = focusedElement?.nextElementSibling;
        nextElement instanceof HTMLElement && focusElement(nextElement);
        break;
      case 'ArrowLeft':
        // Move to the previous item in the row
        const previousElement = focusedElement?.previousElementSibling;
        previousElement instanceof HTMLElement && focusElement(previousElement);
        break;
      case 'ArrowDown':
        // Move to the same index in the next row
        focusedElement && moveFocusToNextRow(focusedElement, categories, 1);
        break;
      case 'ArrowUp':
        // Move to the same index in the previous row
        focusedElement && moveFocusToNextRow(focusedElement, categories, -1);
        break;
      case 'Backspace':
        focusedElement && onBackspaceHandler(focusedElement, categories);
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
  newElement instanceof HTMLElement && focusElement(newElement);
}

function focusElement(element: HTMLElement) {
  element?.focus();
  element?.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'nearest',
  });
}

function onBackspaceHandler(
  focusedElement: Element,
  categories: NodeListOf<Element>
) {
  const isModalOpen = document.querySelector('.modal--open');
  if (isModalOpen) {
    return;
  }
  
  const currentRow = focusedElement.parentElement;
  const currentRowChildrenArray = currentRow ? Array.from(currentRow.children) : [];
  const currentCardIndex = currentRow && currentRowChildrenArray.indexOf(focusedElement);

  // if already on first card, go to first row and first column
  if (currentCardIndex === 0) {
    const firstCategory = categories[0];
    const firstCard = firstCategory?.children[0];
    firstCard instanceof HTMLElement && focusElement(firstCard);
  } else {
    // focus on the first card of the current row
    const firstCard = currentRowChildrenArray[0];
    firstCard instanceof HTMLElement && focusElement(firstCard);
  }
}
