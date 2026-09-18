export interface UserSchema {
  authData?: User;
}

export interface User {
  id: string;
  username: string | null;
}
