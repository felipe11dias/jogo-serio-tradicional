import { useState } from 'react';
import UserContext from './UserContext';

export interface User {
  userId: number
  username: string,
  profile: string
};

export const userObjDefault: User = {
  userId: 0,
  username: "",
  profile: ""
}

export default function UserContextProvider(props: any) {
  const [user, setUser] = useState<User>(userObjDefault);

  const saveUser = (user: User) => {
    const newUser: User = {
      userId: user.userId,
      username: user.username,
      profile: user.profile
    };
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, saveUser }}>
      {props.children}
    </UserContext.Provider>
  );
}