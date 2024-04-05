import React, {useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Row, Col, Card, Alert, Form as BootstrapForm } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { login } from '../authSlice';
import { useNavigate } from 'react-router-dom';
import LoginImg from '../../../assets/bg4.jpg'

export const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginStatus = useAppSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    if (loginStatus) {
      navigate('/boards');
    }
  }, [loginStatus]);

  return (
    <Container fluid className="p-0 m-0 d-flex" style={{ minHeight: '100vh' }}>
      <Row className="g-0 flex-grow-1">
        <Col md={4} className="d-none d-md-block">
            <div style={{ backgroundImage: `url(${LoginImg})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%' }}>
            </div>
        </Col>
        <Col md={8} className="d-flex align-items-center justify-content-center">
          <Card style={{ width: '100%', maxWidth: '500px', margin: 'auto', boxShadow: '0 4px 8px rgba(0,0,0,.1)' }}>
            <Card.Body>
              <Card.Title className="text-center mb-4">Login Form</Card.Title>
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={Yup.object({
                  email: Yup.string().email('Invalid email address').required('Required'),
                  password: Yup.string().required('Required'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                  dispatch(login(values.email, values.password));
                  setSubmitting(false);
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <BootstrapForm.Group className='mb-3'>
                      <BootstrapForm.Label htmlFor="email">Email Address</BootstrapForm.Label>
                      <Field as={BootstrapForm.Control} name="email" type="email" />
                      <ErrorMessage
                        name="email"
                        component={(props: any) => <Alert variant="danger">{props.children}</Alert>}
                      />
                    </BootstrapForm.Group>

                    <BootstrapForm.Group className='mb-3'>
                      <BootstrapForm.Label htmlFor="password">Password</BootstrapForm.Label>
                      <Field as={BootstrapForm.Control} name="password" type="password" />
                      <ErrorMessage
                        name="password"
                        component={(props: any) => <Alert variant="danger">{props.children}</Alert>}
                      />
                    </BootstrapForm.Group>

                    <Button type="submit" className='w-100' disabled={isSubmitting}>Login</Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};