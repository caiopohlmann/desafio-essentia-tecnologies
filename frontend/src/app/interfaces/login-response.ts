export interface LoginResponse {
    user: {
      id: number;
      username: string;
      email: string;
    };
    token: string;
  }
  