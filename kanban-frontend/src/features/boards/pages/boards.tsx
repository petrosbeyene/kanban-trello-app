import { Container, Row, Col, Alert } from 'react-bootstrap';
import BoardNavigationBar from '../../../components/BoardNavBar';

export const BoardsDisplayMessage: React.FC = () => {
  return (
    <>
      <BoardNavigationBar />
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Alert variant="info" className='mt-5'>
              This is where the boards will be displayed.
            </Alert>
          </Col>
        </Row>
      </Container>
    </>
  );
}
