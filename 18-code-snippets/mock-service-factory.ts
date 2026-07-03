export interface UserService {
  getUser(id: string): Promise<{ id: string; name: string }>;
  createUser(data: { name: string }): Promise<{ id: string }>;
}

export function createMockUserService(): jest.Mocked<UserService> {
  return {
    getUser: jest.fn(),
    createUser: jest.fn(),
  };
}
