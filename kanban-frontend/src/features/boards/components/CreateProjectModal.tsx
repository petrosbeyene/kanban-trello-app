import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Project } from '../../../types';

interface CreateProjectModalProps {
  show: boolean;
  onHide: () => void;
  createProject: (project: Project) => void;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ show, onHide, createProject }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createProject({ title, description, background: image });
    onHide(); // Reset form and close modal
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create a New Project</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="projectTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="projectDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Project description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Project Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImage(e.target.files ? e.target.files[0] : null)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Create Project
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateProjectModal;
