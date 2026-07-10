import { AnalyticsService } from '@/server/services/analytics.service';

describe('AnalyticsService', () => {
  it('instantiates analytics service', () => {
    const service = new AnalyticsService();
    expect(service).toBeDefined();
    expect(typeof service.getProjectMetrics).toBe('function');
  });
});
