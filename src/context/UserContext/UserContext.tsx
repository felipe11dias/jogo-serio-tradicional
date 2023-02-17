import { createContext } from 'react';
import { User } from './UserContextProvider';

export type UserType = {
  user: User,
  saveUser: (newUser: User) => void
};

const UserContext = createContext<UserType | null>(null);

export default UserContext;