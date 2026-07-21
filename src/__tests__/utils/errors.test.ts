import { NotFoundError, BadRequestError, UnauthorizedError, ForbiddenError, ConflictError } from '@/lib/errors';

describe('Domain Errors', () => {
  it('assigns correct HTTP status codes', () => {
    expect(new NotFoundError('Task', '1').statusCode).toBe(404);
    expect(new BadRequestError('Bad input').statusCode).toBe(400);
    expect(new UnauthorizedError().statusCode).toBe(401);
    expect(new ForbiddenError().statusCode).toBe(403);
    expect(new ConflictError('Exists').statusCode).toBe(409);
  });
});
