import { CollectionItem, HuluHub } from '../api';
import { getImage } from '../utils/image.utils';

const HERO_IMAGE_SIZE = '1280x720';
const CARD_IMAGE_SIZE = '400x225';
const WATERMARK_IMAGE_SIZE = '60x60';

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
    hubHero.style.backgroundImage = `linear-gradient(to bottom, rgba(0, 0, 0, .9), #1e2126), url(${getImage(hubHeroImage, HERO_IMAGE_SIZE)})`;
  }

  // hydrate categories/collections
  const categoryTemplateElement = document.getElementById('category-0');
  const categoriesContainerElement = document.getElementById('categories');

  // remove loading state class "category--loading"
  categoryTemplateElement && categoryTemplateElement.classList.remove('category--loading');

  // clone as many category elements as there are in the hubData.components array
  if (categoryTemplateElement && categoriesContainerElement) {
    // Create a document fragment to hold the cloned category elements
    const fragment = document.createDocumentFragment();

    const categoriesCount = hubData.components.length - 1;
    for (let i = 0; i < categoriesCount; i++) {
      const categoryElement = categoryTemplateElement.cloneNode(true) as HTMLElement;
      categoryElement.id = `category-${i}`;
      // Append the cloned element to the fragment
      fragment.appendChild(categoryElement);
    }

    // Append the fragment to the categories container once
    categoriesContainerElement.appendChild(fragment);
  }

  const categories = document.querySelectorAll('.category');
  hubData.components.forEach((collection: CollectionItem, index) => {
    const categoryElement = categories[index];

    if (categoryElement) {
      const title: HTMLElement | null = categoryElement.querySelector('.category__title');
      if (title) {
        title.innerText = collection.name ?? 'Untitled';
      }
      const categoryTheme =
        collection.theme === 'standard_horizontal_promptless'
          ? 'category__default__theme'
          : 'category__medium__theme';
      categoryElement.classList.add(categoryTheme);

      hydrateCategoryCards(categoryElement, collection);
    }
  });
}

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
      const watermarkPath = item?.visuals?.primary_branding?.artwork?.['brand.watermark.bottom.right']?.path;
      
      if (cardThumbnailElement && watermarkPath) {
        cardThumbnailElement.classList.add('card__thumbnail__watermark');
        cardThumbnailElement.style.backgroundImage += `url(${getImage(
          watermarkPath,
          WATERMARK_IMAGE_SIZE,
          'png'
        )})`;
      }

      if (cardThumbnailElement && cardThumbnailImage) {
        cardThumbnailElement.style.backgroundImage += `${watermarkPath ? ', ' : ''}url(${getImage(
          cardThumbnailImage,
          CARD_IMAGE_SIZE,
        )})`;
      }

    }
  });
}
