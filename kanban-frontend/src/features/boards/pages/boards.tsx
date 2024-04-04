import { Container, Row, Col, Alert } from 'react-bootstrap';

export const BoardsDisplayMessage: React.FC = () => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Alert variant="info">
            This is where the boards will be displayed.
          </Alert>
        </Col>
      </Row>
    </Container>
  );
}
