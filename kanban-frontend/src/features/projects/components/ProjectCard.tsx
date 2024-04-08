import React from 'react';
import { Card } from 'react-bootstrap';
import '../static/board.css';

interface BoardCardProps {
  imageUrl: string;
  title: string;
  description: string;
  onClick: () => void; // Add onClick prop
}

const ProjectCard: React.FC<BoardCardProps> = ({ imageUrl, title, description, onClick }) => {
  return (
    <Card className="project-card" style={{ width: '18rem', cursor: 'pointer' }} onClick={onClick}>
      <Card.Img variant="top" src={imageUrl} alt="Placeholder" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProjectCard;
