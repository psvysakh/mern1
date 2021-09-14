import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from '../formikControl/formikControl';

import CustomButton from '../customButton/customButton';
import Dashboard from '../Layout/Dashboard';

import { toast } from 'react-toastify';

import {
    getAddressStart,
    setAddressSuccess,
    updateAddressSuccess
} from '../../redux/user/user.action';
import {
    deleteAddressFetch,
    setAddressFetch,
    updateAddressFetch
} from '../../apiCall/api';



const Address = (props) => {
    const { _id, address } = useSelector(state => state.user);

    const [formState, setFormState] = useState({
        showForm: false,
        editForm: false,
        editId: '',
    })

    const { showForm, editForm, editId } = formState;

    const dispatch = useDispatch();
    //Creating New Address
    const setAddress = (data) => {
        setAddressFetch(data)
            .then(res => {
                dispatch(setAddressSuccess(res.data));
                setFormState({ ...formState, showForm: false });
                toast.success("Address Added");
            })
            .catch(err => {
                setFormState({ ...formState, showForm: false });
                toast.error("Address Updation Failed");
            })
    }
    //Updating Address
    const updateAddress = (data) => {
        updateAddressFetch(data)
            .then(res => {
                dispatch(updateAddressSuccess(res.data));
                setFormState({ ...formState, editForm: false });
                dispatch(getAddressStart());
                toast.success("Address Updated");
            })
            .catch(err => {
                setFormState({ ...formState, editForm: false });
                toast.error("Address Updation Failed");
            })
    }
    //Deleting Address
    const deleteAddress = (addressId) => {
        deleteAddressFetch(addressId)
            .then(res => {
                toast.success("Address Deleted");
                dispatch(getAddressStart());
            })
            .catch(err => {
                toast.error("Address Deletion Failed");
            })
    }

    const initialValues = {
        name: '',
        phone: '',
        pincode: '',
        locality: '',
        address: '',
        city: '',
        state: '',
        userid: ''
    }


    const validationSchema = Yup.object({

        name: Yup.string()
            .required('name is required')
            .min(5, 'Min Character Must be 5'),
        phone: Yup.string()
            .required('phone is required')
            .min(10, 'Min Character Must be 10')
            .trim(),
        pincode: Yup.string()
            .required('pincode is required')
            .min(6, 'Min Character Must be 6')
            .trim(),
        locality: Yup.string()
            .required('locality is required')
            .min(5, 'Min Character Must be 5'),
        address: Yup.string()
            .required('address is required')
            .min(5, 'Min Character Must be 5'),
        city: Yup.string()
            .required('city is required')
            .min(5, 'Min Character Must be 5'),
        state: Yup.string()
            .required('state is required')
            .min(5, 'Min Character Must be 5'),
    });

    function getFormData(object) {
        const formData = new FormData();
        Object.keys(object).forEach(key => formData.append(key, object[key]));
        return formData;
    }

    const showAddressForm = (address) => {
        const adValues = address;

        return (
            <Formik
                initialValues={adValues ? adValues : initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    let formdata = getFormData(values);
                    if (showForm) {
                        setAddress(formdata);
                    }
                    if (editForm) {
                        updateAddress(formdata);
                    }
                    resetForm({ values: '' });

                }}

            >
                {({ setFieldValue }) => {
                    return (
                        <Form >
                            <div className="row">
                                <div className="col-lg-6">
                                    <FormikControl
                                        control="input"
                                        name="name"
                                        label="name" />
                                </div>
                                <div className="col-lg-6">
                                    <FormikControl
                                        control="input"
                                        type="tel"
                                        name="phone"
                                        label="phone" />
                                </div>
                                <div className="col-lg-6">
                                    <FormikControl
                                        control="input"
                                        type="number"
                                        name="pincode"
                                        label="pincode" />
                                </div>
                                <div className="col-lg-6">
                                    <FormikControl
                                        control="input"
                                        name="locality"
                                        label="locality" />
                                </div>
                                <div className="col-lg-12">
                                    <FormikControl
                                        control="textarea"
                                        name="address"
                                        label="address" />
                                </div>
                                <div className="col-lg-6">
                                    <FormikControl
                                        control="input"
                                        name="city"
                                        label="city" />
                                </div>
                                <div className="col-lg-6">
                                    <FormikControl
                                        control="input"
                                        name="state"
                                        label="state" />
                                </div>
                                <div className="col-lg-6">
                                    <FormikControl
                                        control="input"
                                        name="userid"
                                        label="userid"
                                        type="hidden"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3">
                                    {showForm ? (
                                        <CustomButton
                                            label="product"
                                            type="submit"
                                            value="submit"
                                            onClick={() => setFieldValue('userid', _id)}> Submit</CustomButton>
                                    ) : (
                                        <CustomButton
                                            label="product"
                                            type="submit"
                                            value="submit"> Update</CustomButton>
                                    )}
                                </div>
                                <div className="col-lg-3">
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() => setFormState({ ...formState, showForm: false, editForm: false })}>Cancel</button>
                                </div>

                            </div>
                        </Form>
                    )
                }

                }

            </Formik>
        )
    }


    const showAddress = () => {
        return address.map((ad, i) => (
            <div key={i} className="card address my-3">
                {
                    editForm && editId === ad._id ?

                        showAddressForm(ad)
                        :
                        (
                            <div>
                                <div className="row">
                                    <div className="col-lg-12 text-right">
                                        {
                                            props.checking === true ? '' : [<button
                                                className="btn btn-outline-primary mb-3"
                                                onClick={() => setFormState({ ...formState, showForm: false, editForm: true, editId: ad._id })}>Edit</button>,
                                            <button
                                                className="btn btn-outline-danger"
                                                onClick={() => deleteAddress(ad._id)}>Delete</button>]

                                        }

                                    </div>
                                </div>
                                <ul className="d-flex p-0">
                                    <li className="mr-3">{ad.name}</li>
                                    <li>{ad.phone}</li>
                                </ul>
                                <div>
                                    <p>{ad.address}, {ad.locality}, {ad.city}, {ad.state}, {ad.pincode}</p>
                                </div>
                            </div>
                        )
                }
            </div>
        ))

    }

    useEffect(() => {
        dispatch(getAddressStart());
    }, [])


    return (
        /*  <Dashboard> */
        <div>
            <h3>{props.title}</h3>
            <div className="row">
                <div className="col-lg-12">


                    {address ? showAddress() : null}
                    <button
                        className="btn btn-outline-primary mb-3"
                        onClick={() => setFormState({ ...formState, showForm: true, editForm: false })}>
                        + New Address
                    </button>
                    {showForm ? showAddressForm() : null}

                </div>
            </div>
        </div>
        /* </Dashboard> */
    )

}



export default Address;
