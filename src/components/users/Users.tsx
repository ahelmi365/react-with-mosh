import React, { useEffect, useState } from "react";

import { IUser } from "../../services/userService";
import userService from "../../services/userService";

const Users = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  // get all users
  const handleGetUsers = () => {
    console.log("get user is clicked");
    const { request, cancel } = userService.getAll<IUser>();
    request
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error.message));
  };

  // delete user
  const handleDelete = (id: number) => {
    userService
      .delete(id)
      .then(() => setUsers(users.filter((user) => user.id !== id)));
  };

  useEffect(() => {
    const { request, cancel } = userService.getAll<IUser>();
    request
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error.message));
    return () => cancel();
  }, []);
  return (
    <div>
      <button className="btn btn-primary mb-3" onClick={() => handleGetUsers()}>
        Get Users
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.id}: {user.name}
            <button
              className="btn btn-outline-danger"
              onClick={() => handleDelete(user.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
