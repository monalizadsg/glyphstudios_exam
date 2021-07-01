import React, { useState, useEffect, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Input,
  Chip,
  Button,
} from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";
import { makeStyles } from "@material-ui/core/styles";
import { createEvent, updateEvent } from "./eventService";
import DatePicker from "react-datepicker";
import { setHours, setMinutes } from "date-fns";
import { UsersContext } from "../global/UsersContext";
import "react-datepicker/dist/react-datepicker.css";
import "./EventForm.css";

const useStyles = makeStyles((theme) => ({
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const EventForm = ({ onCloseModal, onSaveSuccess, selectedEvent }) => {
  const classes = useStyles();
  const { usersData } = useContext(UsersContext);
  const [eventName, setEventName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [error, setError] = useState({});

  useEffect(() => {
    if (selectedEvent) {
      const { title, start, end, users: eventUsers } = selectedEvent;
      const filteredUsers = usersData.filter(
        (user) => !!eventUsers.find((eventUser) => eventUser.id === user.id)
      );

      setEventName(title);
      setStartDate(new Date(start));
      setEndDate(new Date(end));
      setSelectedUsers(filteredUsers);
    }
  }, [usersData, selectedEvent]);

  const handleEventNameChange = (event) => {
    setEventName(event.target.value);
  };

  const handleChange = (event) => {
    setSelectedUsers(event.target.value);
  };

  const handleStartChange = (date) => {
    setStartDate(date);
  };

  const handleEndChange = (date) => {
    setEndDate(date);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validation = validateForm();
    if (!validation) {
      return;
    }

    let usersToAdd = [];

    selectedUsers.forEach((user) => usersToAdd.push(user.id));

    const eventsData = {
      title: eventName,
      start: startDate,
      end: endDate,
      users: usersToAdd,
    };

    let upsertPromise = null;
    if (selectedEvent?.id) {
      upsertPromise = updateEvent(eventsData, selectedEvent?.id);
    } else {
      upsertPromise = createEvent(eventsData);
    }

    try {
      const result = await upsertPromise;
      onSaveSuccess(result.data);
      onCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (eventName === "") {
      errors.eventName = "This field is required";
    }
    if (startDate === null) {
      errors.startDate = "This field is required";
    }
    if (endDate === null) {
      errors.endDate = "This field is required";
    }

    if (selectedUsers.length === 0) {
      errors.selectedUsers = "This field is required";
    }

    if (Object.keys(errors).length > 0) {
      isValid = false;
    }

    setError(errors);

    return isValid;
  };

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  return (
    <div className='event-form'>
      <div className='input-group'>
        <TextField
          name='eventName'
          label='Name'
          type='text'
          value={eventName}
          fullWidth
          onChange={handleEventNameChange}
          error={error.eventName}
          helperText={error.eventName}
        />
      </div>
      <div className='input-group'>
        <label className='date-time-picker-label'>Start</label>
        <DatePicker
          selected={startDate}
          onChange={handleStartChange}
          showTimeSelect
          dateFormat='MMMM d, yyyy h:mm aa'
          className={error.startDate ? "error" : ""}
          filterTime={filterPassedTime}
          minTime={setHours(setMinutes(new Date(), 0), 8)}
          maxTime={setHours(setMinutes(new Date(), 0), 20)}
        />
        {error && (
          <FormHelperText className='error-text'>
            {error.startDate}
          </FormHelperText>
        )}
      </div>
      <div className='input-group'>
        <label className='date-time-picker-label'>End</label>
        <DatePicker
          selected={endDate}
          onChange={handleEndChange}
          showTimeSelect
          dateFormat='MMMM d, yyyy h:mm aa'
          className={error.endDate ? "error" : ""}
          filterTime={filterPassedTime}
          minTime={setHours(setMinutes(new Date(), 0), 8)}
          maxTime={setHours(setMinutes(new Date(), 0), 20)}
        />
        {error && (
          <FormHelperText className='error-text'>
            {error.endDate}
          </FormHelperText>
        )}
      </div>

      <div className='input-group'>
        <FormControl variant='outlined' fullWidth error={error.selectedUsers}>
          <InputLabel id='users'>Users</InputLabel>
          <Select
            labelId='users'
            multiple
            value={selectedUsers}
            onChange={handleChange}
            input={<Input />}
            renderValue={(selected) => (
              <div className={classes.chips}>
                {selected.map((user) => (
                  <Chip
                    key={user.id}
                    label={`${user.firstName} ${user.lastName}`}
                    className={classes.chip}
                  />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {usersData.map((user) => (
              <MenuItem key={user.id} value={user}>
                {`${user.firstName} ${user.lastName}`}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>{error.selectedUsers}</FormHelperText>}
        </FormControl>
      </div>
      <div className='form-action'>
        <Button onClick={handleSubmit} color='primary' variant='contained'>
          Save
        </Button>
      </div>
    </div>
  );
};

export default EventForm;
