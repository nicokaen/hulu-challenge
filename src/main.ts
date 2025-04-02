import './style.css';

import { fetchHuluHub } from './api.ts';
import { initNavigation } from './navigation.ts';
import { initLazyLoading } from './lazyLoading.ts';
import { initGrid } from './grid.ts';

// initialize the app
document.addEventListener('DOMContentLoaded', async () => {
  const hubData = await fetchHuluHub();
  initGrid(hubData);
  initNavigation();
  initLazyLoading(hubData);
});
