import { getAppInfo, APP_VERSION } from '@/lib/version';

describe('App Version Utility', () => {
  it('returns valid semver version 1.0.0', () => {
    const info = getAppInfo();
    expect(info.version).toBe('1.0.0');
    expect(APP_VERSION).toBe('1.0.0');
  });
});
