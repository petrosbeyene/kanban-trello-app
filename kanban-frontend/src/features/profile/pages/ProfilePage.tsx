import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import { fetchUserProfile, updateUserProfile } from '../profileSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import ProjectsNavigationBar from '../../projects/components/ProjectNavBar';


const ProfilePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { user, error } = useAppSelector(state => state.profile);
    const [editMode, setEditMode] = useState(false);
    const [profileData, setProfileData] = useState({ first_name: '', last_name: '' });

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setProfileData({ first_name: user.first_name, last_name: user.last_name });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData(prevState => ({
          ...prevState,
          [name]: value
        }));
    };
      

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(updateUserProfile({ profileData }));
        setEditMode(false);
    };

    if (error) return <Alert variant="danger">{error}</Alert>;
    return (
        <>
            <ProjectsNavigationBar />
            <Container className="">
                <Row className="justify-content-md-center item">
                <Col md={6}>
                    <div className="fade-border p-3">
                    {editMode ? (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" name="first_name" value={profileData.first_name} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" name="last_name" value={profileData.last_name} onChange={handleChange} />
                            </Form.Group>
                        <Button variant="primary" type="submit">Save Changes</Button>
                        <Button variant="secondary" onClick={() => setEditMode(false)} style={{ marginLeft: '10px' }}>Cancel</Button>
                        </Form>
                    ) : (
                        <Card>
                        <Card.Body>
                            <Card.Title>{`${user?.first_name} ${user?.last_name}`}</Card.Title>
                            <Card.Text>{user?.email}</Card.Text>
                            <Button variant="primary" onClick={() => setEditMode(true)}>Edit Profile</Button>
                        </Card.Body>
                        </Card>
                    )}
                    </div>
                </Col>
                </Row>
            </Container>
      </>
    );
};

export default ProfilePage;
