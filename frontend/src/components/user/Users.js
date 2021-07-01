import React, { useState, useContext } from "react";
import Modal from "../Modal";
import UserForm from "./UserForm";
import Toast from "../Toast";
import { UsersContext } from "../global/UsersContext";
import "./Users.css";

const Users = () => {
  const { usersData, addNewUser } = useContext(UsersContext);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: "" });

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const handleAddNewUser = (user) => {
    addNewUser(user);
    showToast("User successfully added!");
  };

  const showToast = (message) => {
    setToast({ ...toast, isOpen: true, message });
  };

  const closeToast = () => {
    setToast({ ...toast, isOpen: false, message: "" });
  };

  return (
    <div className='users'>
      <div className='header'>
        <h3>Users</h3>
        <button onClick={handleOpenModal} className='button'>
          + Add Users
        </button>
      </div>
      <div className='users-list'>
        <ul>
          {usersData.map((user) => (
            <li key={user.id} className='users-list-item'>
              {user.firstName} {user.lastName}
              <span className='user-list-item-email'> ({user.email}) </span>
            </li>
          ))}
        </ul>
      </div>

      <Modal isOpen={isOpenModal} onClose={closeModal} title='Add User'>
        <UserForm onCloseModal={closeModal} onAddUser={handleAddNewUser} />
      </Modal>

      <Toast message={toast.message} open={toast.isOpen} onClose={closeToast} />
    </div>
  );
};

export default Users;
