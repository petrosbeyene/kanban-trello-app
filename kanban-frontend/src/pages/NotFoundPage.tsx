import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const NotFoundPage = () => {
    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
            <Row>
                <Col className="text-center">
                    <h1 className="mb-4" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>404 - Page Not Found</h1>
                    <p className="mb-4" style={{ fontSize: '1.25rem' }}>The page you are looking for does not exist.</p>
                    <Link to="/" className="btn btn-primary btn-lg">
                        Go to Home
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFoundPage;
