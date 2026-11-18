import { GET } from '@/app/api/version/route';

describe('Version Endpoint', () => {
  it('returns JSON response with 1.0.0 version', async () => {
    const res = await GET();
    const json = await res.json();
    expect(json.version).toBe('1.0.0');
  });
});
