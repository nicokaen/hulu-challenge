import './styles';

import { fetchHuluHub } from './api/';
import { initGrid, initLazyLoading, initModal, initNavigation } from './components';
import { onError } from './utils/errors.utils';

// initialize the app
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const hubData = await fetchHuluHub();

    // Check if hubData is valid before initializing components
    if (!hubData) {
      throw new Error('No data received from the hub.');
    }

    initGrid(hubData);
    initNavigation();
    initLazyLoading(hubData);
    initModal(hubData);
  } catch (error) {
    onError(error);
  }
});
