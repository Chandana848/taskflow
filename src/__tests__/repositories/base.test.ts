import { BaseRepository } from '@/server/repositories/base.repository';

class MockRepo extends BaseRepository<any, any, any> {
  async findById() { return null; }
  async create(data: any) { return data; }
  async update(_id: string, data: any) { return data; }
  async delete() { return null; }
}

describe('BaseRepository', () => {
  it('instantiates derived repository correctly', () => {
    const repo = new MockRepo();
    expect(repo).toBeDefined();
  });
});
