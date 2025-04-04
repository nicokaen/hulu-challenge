import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchHuluHub } from '../api/';
import { initGrid, initLazyLoading, initModal, initNavigation } from '../components';
import { onError } from '../utils/errors.utils';
import '../main'; // Importing main.ts to execute the DOMContentLoaded listener
import mock from '../api/mock';

vi.mock('../api/', () => ({
  fetchHuluHub: vi.fn(),
}));

vi.mock('../components', () => ({
  initGrid: vi.fn(),
  initLazyLoading: vi.fn(),
  initModal: vi.fn(),
  initNavigation: vi.fn(),
}));

vi.mock('../utils/errors.utils', () => ({
  onError: vi.fn(),
}));

describe('Main Application Initialization', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize components when hubData is valid', async () => {
    // Arrange
    const mockHubData = mock;
    (
      fetchHuluHub as unknown as { mockResolvedValueOnce: (data: any) => void }
    ).mockResolvedValueOnce(Promise.resolve(mockHubData));

    // Act
    await document.dispatchEvent(new Event('DOMContentLoaded'));

    // Assert
    expect(fetchHuluHub).toHaveBeenCalled();
    expect(initGrid).toHaveBeenCalledWith(mockHubData);
    expect(initLazyLoading).toHaveBeenCalledWith(mockHubData);
    expect(initModal).toHaveBeenCalledWith(mockHubData);
    expect(initNavigation).toHaveBeenCalled();
  });

  it('should call onError if no data is received', async () => {
    // Arrange
    (
      fetchHuluHub as unknown as { mockResolvedValueOnce: (data: any) => void }
    ).mockResolvedValueOnce(null);

    // Act
    await document.dispatchEvent(new Event('DOMContentLoaded'));

    // Assert
    expect(onError).toHaveBeenCalledWith(new Error('No data received from the hub.'));
  });
});
