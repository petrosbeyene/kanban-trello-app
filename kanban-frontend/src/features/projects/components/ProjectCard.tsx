// import React from 'react';
// import { Card } from 'react-bootstrap';
// import '../static/projects.css';

// interface BoardCardProps {
//   imageUrl: string;
//   title: string;
//   description: string;
//   onClick: () => void;
// }

// const ProjectCard: React.FC<BoardCardProps> = ({ imageUrl, title, description, onClick }) => {
//   return (
//     <Card className="project-card" style={{ width: '18rem', cursor: 'pointer' }} onClick={onClick}>
//       <Card.Img variant="top" src={imageUrl} alt="Placeholder" />
//       <Card.Body>
//         <Card.Title>{title}</Card.Title>
//         <Card.Text className="card-text">
//           {description}
//         </Card.Text>
//       </Card.Body>
//     </Card>
//   );
// };

// export default ProjectCard;

import React from 'react';
import { Card } from 'react-bootstrap';
import '../static/projects.css';

interface BoardCardProps {
  imageUrl: string;
  title: string;
  description: string;
  onClick: () => void;
}

const ProjectCard: React.FC<BoardCardProps> = ({ imageUrl, title, description, onClick }) => {
  return (
    <Card className="project-card" style={{ width: '18rem', cursor: 'pointer', height: 'auto' }} onClick={onClick}>
      <Card.Img  className='card-img-top' variant="top" src={imageUrl} alt="Placeholder" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text className="card-text">
          {description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProjectCard;

