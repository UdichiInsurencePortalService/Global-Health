import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userForm, setUserForm] = useState({
    username: '',
    age: '',
    mobile: '',
    registrationNumber: '',
    aadhaar: '',
    email: '',
    address: '',
  });

  return (
    <UserContext.Provider value={{ userForm, setUserForm }}>
      {children}
    </UserContext.Provider>
  );
};
