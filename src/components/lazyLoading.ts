import { fetchHubById, HuluHub } from '../api';
import { onError } from '../utils/errors.utils';
import { hydrateCategoryCards } from './grid';

export function initLazyLoading(hubData: HuluHub) {
  document.addEventListener('keydown', (event) => {
    const categories = document.querySelectorAll('.category__row');

    switch (event.key) {
      case 'ArrowDown':
        // Fetch more data if the next row is empty
        fetchMoreData(categories, hubData);
        break;
    }
  });
}

function shouldFetchMoreData(futureRowIndex: number, hubData: HuluHub) {
  const rowExists = futureRowIndex < hubData.components.length;
  const categoryIsEmpty = rowExists && hubData.components[futureRowIndex]?.items?.length === 0;
  return categoryIsEmpty;
}

async function fetchMoreData(categories: NodeListOf<Element>, hubData: HuluHub) {
  const focusedElement = document.activeElement;
  const currentRow = focusedElement?.parentElement;
  const categoriesArray = Array.from(categories);
  const currentCategoryIndex = (currentRow && categoriesArray.indexOf(currentRow)) ?? 0;

  // check if third row from current row has elements
  const ROW_PRELOAD_OFFSET = 3;
  const futureRowIndex = currentCategoryIndex + ROW_PRELOAD_OFFSET;
  if (currentCategoryIndex && shouldFetchMoreData(futureRowIndex, hubData)) {
    const category = hubData.components[futureRowIndex];

    try {
      const categoryData = await fetchHubById(category.id);
      if (categoryData?.items) {
        category.items = [...categoryData.items];
      }

      // Hydrate the new category data
      categoriesArray[futureRowIndex]?.parentElement &&
        hydrateCategoryCards(categoriesArray[futureRowIndex]?.parentElement, category);
    } catch (error) {
      onError(error);
    }
  }
}
