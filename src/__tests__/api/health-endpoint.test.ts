import { GET } from '@/app/api/health/route';

describe('Health Endpoint', () => {
  it('returns healthy status and version', async () => {
    const res = await GET();
    const json = await res.json();
    expect(json.status).toBe('healthy');
    expect(json.version).toBe('1.0.0');
  });
});
