
import React, { useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import CustomButton from '../customButton/customButton';
import Loader from '../loader/loader';
import FormikControl from '../formikControl/formikControl';
import { signInSuccess } from '../../redux/auth/auth.action';

import Authlayout from '../Layout/Authlayout';

import './signin.scss';
import { signInFetch } from '../../apiCall/authApi';

import { toast } from 'react-toastify';

const SignIn = ({ match }) => {

    const [loading, setLoading] = useState(false);

    const { isAuthenticated } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const redirectUser = () => {

        if (isAuthenticated) {
            return <Redirect to="/" />
        }
        else {
            return <Redirect to="/signin" />
        }

    }

    const initialValues = {
        email: '',
        password: ''
    }
    const onSubmit = values => {

        setLoading(true);

        signInFetch(values)
            .then(res => {
                const { newtoken, role } = res.data;

                setLoading(false);

                localStorage.setItem('JWT_TOKEN', newtoken);

                dispatch(signInSuccess({ newtoken, role }));



                toast.success("Login in Success");

            })
            .catch(err => {
                setLoading(false);

                toast.error(err.response.data.error);
            })
    }

    const validationSchema = Yup.object({

        email: Yup.string()
            .required('Email is required')
            .email('Invalid Email'),

        password: Yup.string()
            .required('Password is required')
            .min(5, 'Minimum 5 Characters needed')
            .matches(/\d/, "One digit is needed")

    });




    return (
        <Authlayout>
            <div className="signin">
                <h2>Have an account ?</h2>
                <p>Sign In with your Email</p>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    <Form>
                        <FormikControl
                            control="input"
                            name="email"
                            type="email"
                            label="Email"
                        />

                        <FormikControl
                            control="input"
                            name="password"
                            type="password"
                            label="Password"
                        />

                        <CustomButton label="signin" type="submit" value="submit" >
                            {loading ? <Loader /> : 'SIGN IN'}
                        </CustomButton>



                        <div className="forgot">
                            <Link to="/signup">Register Now</Link>
                            <Link to={`${match.path}/reset`}>forgot password?</Link>
                        </div>
                    </Form>
                </Formik>
                {redirectUser()}
            </div>
        </Authlayout>
    )
}


export default withRouter(SignIn);