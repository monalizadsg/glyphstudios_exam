import React, { useState, useEffect } from "react";
import { Button, DialogActions, Card } from "@material-ui/core";
import { getEvents, deleteEvent } from "./eventService";
import Modal from "../Modal";
import EventForm from "./EventForm";
import Toast from "../Toast";
import EventCalendar from "./EventCalendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Events.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: "" });

  const getEventsList = () => {
    let lists = [];

    events.forEach((event) => {
      let start = new Date(event.start);
      let end = new Date(event.end);
      lists.push({ id: event.id, title: event.title, start, end });
    });

    return lists;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await getEvents();
    setEvents(result.data);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setSelectedEvent(null);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setSelectedEvent(null);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setIsOpenModal(true);
  };

  const handleDeleteEvent = (event) => {
    setSelectedEvent(event);
    setIsConfirmModalOpen(true);
  };

  const onDeleteEvent = async () => {
    await deleteEvent(selectedEvent.id);
    closeConfirmModal();
    fetchData();
    showToast("Event successfully deleted!");
  };

  const showToast = (message) => {
    setToast({ ...toast, isOpen: true, message });
  };

  const closeToast = () => {
    setToast({ ...toast, isOpen: false, message: "" });
  };

  const handleCreateSuccess = () => {
    fetchData();
    showToast("Event successfully added!");
  };

  const handleUpdateSuccess = () => {
    fetchData();
    showToast("Event successfully updated!");
  };

  return (
    <div className='events'>
      <div className='header'>
        <h3>Events</h3>
        <button onClick={handleOpenModal} className='button'>
          + Add Events
        </button>
      </div>
      <div className='events-list'>
        <h3>List View</h3>
        {events.map((event) => (
          <Card key={event.id} className='events-list-item'>
            {event.title}
            <div className='events-list-item-actions'>
              <button
                style={{ marginRight: 10 }}
                onClick={() => handleEditEvent(event)}
                className='button'
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteEvent(event)}
                className='button'
              >
                Delete
              </button>
            </div>
          </Card>
        ))}
      </div>

      <div className='calendar'>
        <h3>Calendar View</h3>
        <EventCalendar eventsList={getEventsList()} />
      </div>

      <Toast message={toast.message} open={toast.isOpen} onClose={closeToast} />

      <Modal
        isOpen={isOpenModal}
        onClose={closeModal}
        title={selectedEvent ? "Edit Event" : "Add Event"}
      >
        <EventForm
          onCloseModal={closeModal}
          onSaveSuccess={
            selectedEvent ? handleUpdateSuccess : handleCreateSuccess
          }
          selectedEvent={selectedEvent}
        />
      </Modal>

      <Modal
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
        title='Delete Event'
      >
        <h3 style={{ textAlign: "center" }}>
          Are you sure you want to delete this event?
        </h3>
        <DialogActions>
          <Button onClick={closeConfirmModal} color='primary'>
            No
          </Button>
          <Button onClick={onDeleteEvent} color='primary'>
            Yes
          </Button>
        </DialogActions>
      </Modal>
    </div>
  );
};

export default Events;
