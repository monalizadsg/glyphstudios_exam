import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { createUser } from "./userService";
import "./UserForm.css";

const UserForm = ({ onCloseModal, onAddUser }) => {
  const initialDetails = {
    firstName: "",
    lastName: "",
    email: "",
  };
  const [userDetails, setUserDetails] = useState(initialDetails);
  const [error, setError] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { firstName, lastName, email } = userDetails;
    const validation = validateForm();

    if (!validation) {
      return;
    }

    const userData = {
      firstName,
      lastName,
      email,
    };

    try {
      const result = await createUser(userData);
      onAddUser(result.data);
      onCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  const validateForm = () => {
    const { firstName, lastName, email } = userDetails;
    let errors = {};
    let isValid = true;

    if (firstName === "") {
      errors.firstName = "This field is required";
    }
    if (lastName === "") {
      errors.lastName = "This field is required";
    }
    if (email === "") {
      errors.email = "This field is required";
    }

    if (Object.keys(errors).length > 0) {
      isValid = false;
    }

    setError(errors);

    return isValid;
  };

  return (
    <form className='user-form'>
      <div className='input-group'>
        <TextField
          name='firstName'
          label='First Name'
          type='text'
          fullWidth
          onChange={handleInputChange}
          error={error.firstName}
          helperText={error.firstName}
        />
      </div>
      <div className='input-group'>
        <TextField
          name='lastName'
          label='Last Name'
          type='text'
          fullWidth
          onChange={handleInputChange}
          error={error.lastName}
          helperText={error.lastName}
        />
      </div>
      <div className='input-group'>
        <TextField
          name='email'
          label='Email'
          type='email'
          fullWidth
          onChange={handleInputChange}
          error={error.email}
          helperText={error.email}
        />
      </div>
      <div className='form-action'>
        <Button onClick={handleSubmit} color='primary' variant='contained'>
          Save
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
