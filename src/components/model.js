import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ModalComponent = ({ initialShow = false, initialRecordID = null, children }) => {
  const [showModal, setShowModal] = useState(initialShow);
  const [recordID, setRecordID] = useState(initialRecordID);
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setShowModal(false);
    setRecordID(null);
    navigate('/')
    // Additional logic or reset any necessary states
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Update Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
            {children}
      </Modal.Body>
    </Modal>
  );
};

export default ModalComponent;
