import React, { createContext, useEffect, useState } from "react";
import { getUsers } from "../user/userService";

export const UsersContext = createContext();

const UsersContextProvider = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    const result = await getUsers();
    setUsers(result.data);
  };

  const addUser = (user) => {
    const newUsers = [...users];
    newUsers.push(user);
    setUsers(newUsers);
  };

  return (
    <UsersContext.Provider value={{ usersData: users, addNewUser: addUser }}>
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersContextProvider;
