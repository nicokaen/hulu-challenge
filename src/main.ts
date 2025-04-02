import './styles/tokens.css'
import './styles/base.css';
import './styles/grid.css';
import './styles/modal.css';

import { fetchHuluHub } from './api/api.ts';
import { initNavigation } from './components/navigation.ts';
import { initLazyLoading } from './components/lazyLoading.ts';
import { initGrid } from './components/grid.ts';
import { initModal } from './components/modal.ts';

// initialize the app
document.addEventListener('DOMContentLoaded', async () => {
  const hubData = await fetchHuluHub();
  initGrid(hubData);
  initNavigation();
  initLazyLoading(hubData);
  initModal(hubData);
});
