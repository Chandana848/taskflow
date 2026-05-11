import { AuthService } from '@/server/services/auth.service';

describe('AuthService', () => {
  it('instantiates auth service successfully', () => {
    const service = new AuthService();
    expect(service).toBeDefined();
    expect(typeof service.login).toBe('function');
    expect(typeof service.register).toBe('function');
  });
});
