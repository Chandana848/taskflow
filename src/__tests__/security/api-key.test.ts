import { generateApiKey, hashApiKey } from '@/lib/security/api-key';

describe('API Key Security', () => {
  it('generates prefixed keys and reproducible hashes', () => {
    const { key, hash } = generateApiKey();
    expect(key.startsWith('tf_')).toBe(true);
    expect(hashApiKey(key)).toBe(hash);
  });
});
