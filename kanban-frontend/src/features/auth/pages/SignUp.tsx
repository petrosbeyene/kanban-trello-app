import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';

import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Button, Form as BootstrapForm, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import { SignupFormValues } from '../../../types';
import SignUpImg from '../../../assets/bg4.jpg'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useEffect } from 'react';
import { performSignup } from '../authSlice';


const initialValues: SignupFormValues = {
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password1: '',
    password2: '',
};

export const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    first_name: Yup.string().required('Required'),
    last_name: Yup.string().required('Required'),
    password1: Yup.string().min(8, 'Password must be 8 characters or longer').required('Required'),
    password2: Yup.string().oneOf([Yup.ref('password1'), null as any], 'Passwords must match').required('Required'),
});

export const SignupForm: React.FC = () => {
    const navigate = useNavigate();
    const loginStatus = useAppSelector(state => state.auth.isLoggedIn);
    const signupStatus = useAppSelector(state => state.auth.signupStatus);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (loginStatus) {
        navigate('/boards');
        }
    }, [loginStatus]);

    useEffect(() => {
        if (signupStatus === 'success') {
            navigate('/verification-sent');
        }
    }, [signupStatus, navigate]);

    const handleSubmit = async (
        values: SignupFormValues,
        { setSubmitting, setErrors }: FormikHelpers<SignupFormValues>
      ) => {
        try {
          dispatch(performSignup(values));
        } catch (error: any) {
          const errorMessage = error.response?.data.detail || "An error occurred during signup.";
          setErrors({email: errorMessage});
          alert(error.response.data.detail || "An error occurred during signup.");
        } finally {
          setSubmitting(false);
        }
      };

    // const handleSubmit = async (
    //   values: SignupFormValues,
    //   { setSubmitting }: FormikHelpers<SignupFormValues>
    // ) => {
    //   try {
    //     await signup(values); // Directly call the signup service with form values
    //     navigate('/verification-sent'); // Navigate on successful signup
    //   } catch (error: any) {
    //     alert(error.response.data.detail || "An error occurred during signup."); // Simplistic error handling, consider improving
    //   } finally {
    //     setSubmitting(false); // Ensure submitting is set to false in all cases
    //   }
    // };
    
    return(
        <Container fluid className="p-0 m-0 d-flex" style={{ minHeight: '100vh' }}>
            <Row className="g-0 flex-grow-1">
            <Col md={4} className="d-flex align-items-stretch">
                {/* Full height image on the left side */}
                <div style={{ backgroundImage: `url(${SignUpImg})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%' }}>
                </div>
            </Col>
            <Col md={8} className="d-flex align-items-center justify-content-center">
                <Card style={{ width: '100%', maxWidth: '500px', margin: 'auto', boxShadow: '0 4px 8px rgba(0,0,0,.1)' }}>
                <Card.Body>
                    <Card.Title className="text-center mb-4">Signup Form</Card.Title>
                    <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    >
                    {({ isSubmitting }) => (
                        <Form>
                        {/* Form fields and submit button go here */}
                            <BootstrapForm.Group className='p-2'>
                                <Field as={BootstrapForm.Control} type="text" name="username" placeholder="Username" />
                                <ErrorMessage
                                    name="username"
                                    component={(props: any) => <Alert {...props} variant="danger" />}
                                />
                            </BootstrapForm.Group>
                            
                            <BootstrapForm.Group className='p-2'>
                                <Field as={BootstrapForm.Control} type="email" name="email" placeholder="Email" />
                                <ErrorMessage
                                    name="email"
                                    component={(props: any) => <Alert {...props} variant="danger" />}
                                />
                            </BootstrapForm.Group>
                            
                            <BootstrapForm.Group className='p-2'>
                                <Field as={BootstrapForm.Control} type="text" name="first_name" placeholder="First Name" />
                                <ErrorMessage
                                    name="first_name"
                                    component={(props: any) => <Alert {...props} variant="danger" />}
                                />
                            </BootstrapForm.Group>
                            
                            <BootstrapForm.Group className='p-2'>
                                <Field as={BootstrapForm.Control} type="text" name="last_name" placeholder="Last Name" />
                                <ErrorMessage
                                    name="last_name"
                                    component={(props: any) => <Alert {...props} variant="danger" />}
                                />
                            </BootstrapForm.Group>
                            
                            <BootstrapForm.Group className='p-2'>
                                <Field as={BootstrapForm.Control} type="password" name="password1" placeholder="Password" />
                                <ErrorMessage
                                    name="password1"
                                    component={(props: any) => <Alert {...props} variant="danger" />}
                                />
                            </BootstrapForm.Group>
                            
                            <BootstrapForm.Group className='p-2'>
                                <Field as={BootstrapForm.Control} type="password" name="password2" placeholder="Confirm Password" />
                                <ErrorMessage
                                    name="password2"
                                    component={(props: any) => <Alert {...props} variant="danger" />}
                                />
                            </BootstrapForm.Group>

                            <Button type="submit" className='p-2' disabled={isSubmitting}>Sign Up</Button>
                        {/* Redirect to login */}
                        <div className="mt-3 text-center">
                            Already have an account? <a href="/login">Login</a>
                        </div>
                        </Form>
                    )}
                    </Formik>
                </Card.Body>
                </Card>
            </Col>
            </Row>
        </Container>
    )
}