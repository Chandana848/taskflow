import { UserRepository } from '@/server/repositories/user.repository';

describe('UserRepository', () => {
  it('exposes standard CRUD lookup signatures', () => {
    const repo = new UserRepository();
    expect(typeof repo.findById).toBe('function');
    expect(typeof repo.findByEmail).toBe('function');
  });
});
