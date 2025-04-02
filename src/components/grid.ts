import { CollectionItem, HuluHub } from "../api";
import { getImage } from "../utils/image.utils";

export async function initGrid(hubData: HuluHub) {
    // hydrate main hub title
    const hubTitle = document.getElementById('hub-title');
    if (hubTitle) {
      hubTitle.innerText = hubData.name;
    }
  
    // hydrate hero image
    const hubHero = document.getElementById('hero');
    const hubHeroImage = hubData?.artwork['detail.horizontal.hero']?.path;
    if (hubHero && hubHeroImage) {
      // TODO: implement hue from artwork data
      hubHero.style.backgroundImage = `linear-gradient(to bottom, rgba(0, 0, 0, .9), #1e2126), url(${hubHeroImage}&size=1280x720&format=jpeg)`;
    }
  
    // hydrate categories/collections
    const categoryTemplateElement = document.getElementById('category-0');
    const categoriesContainerElement = document.getElementById('categories');
  
    // remove loading state class "category--loading"
    categoryTemplateElement && categoryTemplateElement.classList.remove('category--loading');
  
    // clone as many category elements as there are in the hubData.components array
    if (categoryTemplateElement && categoriesContainerElement) {
      // Clone and append category elements to the fragment
      const categoriesCount = hubData.components.length - 1;
      for (let i = 0; i < categoriesCount; i++) {
        const categoryElement = categoryTemplateElement.cloneNode(true) as HTMLElement;
        categoryElement.id = `category-${i}`;
  
        // TODO: research about performance!
        categoriesContainerElement.appendChild(categoryElement);
      }
    }
  
    const categories = document.querySelectorAll('.category');
    hubData.components.forEach((collection: CollectionItem, index) => {
      const categoryElement = categories[index];
  
      if (categoryElement) {
        const title: HTMLElement | null = categoryElement.querySelector('.category__title');
        if (title) {
          title.innerText = collection.name ?? 'Untitled';
        }
  
        hydrateCategoryCards(categoryElement, collection);
      }
    });
  };
  
  export function hydrateCategoryCards(categoryElement: Element, categoryData: CollectionItem) {
    const categoryRow = categoryElement.querySelector('.category__row');
    const categoryItems = categoryRow?.querySelectorAll('.card');
  
    categoryData?.items?.forEach((item, index) => {
      const itemElement = categoryItems?.[index] as HTMLDivElement;
      if (itemElement) {
        // hydrate card title
        const cardTitleElement: HTMLElement | null = itemElement.querySelector('.card__title');
        if (cardTitleElement) {
          cardTitleElement.innerText = item?.visuals?.headline ?? 'Untitled';
        }

        // Set data-id attribute to the card element
        // don't use id attribute as it's may not be unique
        itemElement.dataset.id = item.id;
  
        const cardThumbnailElement: HTMLElement | null =
          itemElement.querySelector('.card__thumbnail');
        const cardThumbnailImage = item?.visuals?.artwork.horizontal_tile?.image.path;
        if (cardThumbnailElement && cardThumbnailImage) {
          cardThumbnailElement.style.backgroundImage = `url(${getImage(
            cardThumbnailImage,
            '400x225'
          )})`;
        }
      }
    });
  }