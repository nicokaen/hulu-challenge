
import { CollectionItem, HuluHub } from "../api";
import { getImage } from "../utils/image.utils";


export function initModal(hubData: HuluHub) {
  const modal = document.getElementById('modal')!;
  const modalClose = document.getElementById('modalClose')!;
  const modalTitle = document.getElementById('modalTitle')!;
  const modalSubtitle = document.getElementById('modalSubtitle')!;
  const modalDetail = document.getElementById('modalDetail')!;
  const modalCover = document.getElementById('modalCover') as HTMLImageElement;

  const openModal = (hubItem: CollectionItem) => {
    console.log('hubItem', hubItem);
    if (hubItem) {
      modalTitle.textContent = hubItem.visuals?.headline || 'Unknown Title';
      modalSubtitle.textContent = hubItem.visuals?.subtitle || 'Unknown Subtitle';
      modalDetail.textContent = hubItem.visuals?.body || 'No description available.';
      
      // cover image
      const coverImagePath =
        hubItem.visuals?.artwork?.vertical_tile?.image?.path &&
        getImage(hubItem.visuals?.artwork?.vertical_tile?.image?.path, '300x450');
      modalCover.src = coverImagePath || '';
      modalCover.alt = hubItem.visuals?.headline || 'Show Cover';
    }
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
  };

  const closeModal = () => {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  };

  const onEnterHandler = () => {
    const focusedElement = document.activeElement;
    const hubItemId = focusedElement instanceof HTMLElement && focusedElement?.dataset?.id;
    const hubItem = hubItemId && getHubItemById(hubData, hubItemId);
    hubItem && openModal(hubItem);
  };

  // close modal when the close button is clicked
  modalClose.addEventListener('click', closeModal);

  // Optional: Close modal on clicking outside the modal content
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'Enter':
        onEnterHandler();
        break;
      case 'Escape':
        closeModal();
        break;
    }
  });

  // temp: open modal on first card focus
//   const firstCard = document.querySelector('.card');
//   const hubItemId = firstCard?.dataset?.id;
//   const hubItem = hubItemId && getHubItemById(hubData, hubItemId);
//   hubItem && openModal(hubItem);
}

// TODO: may be moved to api.ts
function getHubItemById(hubData: HuluHub, id: string) {
  const allItems = hubData.components.flatMap((category) => category.items || []);
  return allItems.find((item) => item.id === id);
}
