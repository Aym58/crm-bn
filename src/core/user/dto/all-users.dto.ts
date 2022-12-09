interface User {
  id: number;
  name: string;
  email: string;
}

export interface AllUsersDto {
  users: User[];
}
