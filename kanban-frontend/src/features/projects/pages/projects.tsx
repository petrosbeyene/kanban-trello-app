import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchProjects, selectProjects, createProject, updateProject, deleteProject } from '../projectSlice';
import ProjectsNavigationBar from '../components/ProjectNavBar';
import ProjectCard from '../components/ProjectCard';
import ProjectDetailsModal from '../components/ProjectDetailModal';
import CreateProjectModal from '../components/CreateProjectModal';
import { Project } from '../../../types';


export const ProjectsDisplay: React.FC = () => {
  const dispatch = useAppDispatch();
  const projects = useAppSelector(selectProjects);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleCreateProject = (project: Project) => {
    dispatch(createProject(project))
      .unwrap()
      .then(() => {
        setShowCreateModal(false);
      })
      .catch((error) => console.error('Error creating project:', error));
  };


  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
    setShowEditModal(true);
  };

  const handleUpdateProject = (formData: FormData) => {
    if (selectedProject && selectedProject.id) {
      dispatch(updateProject({ id: selectedProject.id, formData }));
      setShowEditModal(false);
    } else {
      console.error('Project ID is undefined');
    }
  };

  const handleDeleteProject = () => {
    if (selectedProject && selectedProject.id) {
      dispatch(deleteProject(selectedProject.id));
    }
  };

  return (
    <>
      <ProjectsNavigationBar />
      <Container fluid className="px-5">
        <Row className="justify-content-end my-3">
          <Col xs="auto">
            <Button variant="primary" onClick={() => setShowCreateModal(true)}>Create Project</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Container>
              {projects.length > 0 ? (
                <Row xs={1} md={2} lg={3} className="g-4 mt-5">
                {projects.map((project) => (
                  <Col key={project.id}>
                    <ProjectCard
                      imageUrl={project.background_image || "https://images.app.goo.gl/4ZvEz1QuLvCMu1k37"}
                      title={project.title}
                      description={project.description}
                      onClick={() => handleCardClick(project)}
                    />
                  </Col>
                ))}
              </Row>
              ) : (
                <Alert variant="info" className="mt-5">
                  No projects to display. Create a new project to get started.
                </Alert>
              )}
            </Container>
          </Col>
        </Row>
        <CreateProjectModal
          show={showCreateModal}
          onHide={() => setShowCreateModal(false)}
          createProject={handleCreateProject}
        />
      </Container>
      {selectedProject && (
        <ProjectDetailsModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          project={selectedProject}
          onUpdate={handleUpdateProject}
          onDelete={handleDeleteProject}
        />
      )}
    </>
  );
};
