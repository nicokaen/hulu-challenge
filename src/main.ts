import './styles';

import { fetchHuluHub } from './api/';
import { initGrid, initLazyLoading, initModal, initNavigation } from './components';

// initialize the app
document.addEventListener('DOMContentLoaded', async () => {
  const hubData = await fetchHuluHub();
  initGrid(hubData);
  initNavigation();
  initLazyLoading(hubData);
  initModal(hubData);
});
