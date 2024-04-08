import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updateProject, deleteProject } from '../projectSlice'; // Adjust the import path as necessary
import { Project } from '../../../types';
import { useAppDispatch } from '../../../app/hooks';


interface ProjectDetailsModalProps {
    show: boolean;
    onHide: () => void;
    project: Project;
    onUpdate: (formData: FormData) => void; // Ensure this is defined
    onDelete: () => void;
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  show,
  onHide,
  project,
}) => {
  const [editableProject, setEditableProject] = useState<Project>(project);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setEditableProject(project);
    setSelectedFile(null)
  }, [project, show]);

  const handleUpdate = () => {
    if (typeof editableProject.id === 'number') {
      const formData = new FormData();
      Object.entries(editableProject).forEach(([key, value]) => {
        if (key !== 'background_image' && value != null) {
          formData.append(key, String(value));
        }
      });
      if (selectedFile) {
        formData.append('background_image', selectedFile);
      }
  
      dispatch(updateProject({ id: editableProject.id, formData }));
      onHide();
    } else {
      console.error('Project ID is undefined');
    }
  };
  

  const handleDelete = () => {
    if (editableProject.id) {
      dispatch(deleteProject(editableProject.id));
      onHide();
    }
  };

  // Ensure to add inputs for any additional project properties
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Editing {editableProject.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={editableProject.title}
              onChange={(e) => setEditableProject({ ...editableProject, title: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={editableProject.description}
              onChange={(e) => setEditableProject({ ...editableProject, description: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Background Image</Form.Label>
            <Form.Control
                type="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
            />
          </Form.Group>
          {/* You may want to add a field for editing the background image here */}
        </Form>
        {/* {editableProject.background_image_url && (
          <img src={editableProject.background_image} alt="project" style={{ width: '100%', marginTop: '20px' }} />
        )} */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="warning" onClick={handleUpdate}>Update</Button>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProjectDetailsModal;