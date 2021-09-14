import React,{useState} from 'react';
import { Formik , Form  } from 'formik';
import * as Yup from 'yup';


import CustomButton from '../customButton/customButton';
import FormikControl from '../formikControl/formikControl';
import Loader from '../loader/loader';
import Authlayout from '../Layout/Authlayout';


import './reset.scss';
import { resetFetch } from '../../apiCall/authApi';
import { toast } from 'react-toastify';

const GetResetForm=()=>{

    const [loading,setLoading] = useState(false);

    /* const [emailValue,setEmailValue]=useState({email:''});

    const {email}=emailValue;

    const handleChange=(e)=>{
            const {name,value}=e.target;
            setEmailValue({...emailValue,[name]:value});
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        getResetForm({email});
    }    */
    const initialValues={
        email:''
    }
    const onSubmit=values=>{
      
        setLoading(true);
        resetFetch(values)
        .then(res=>{
            setLoading(false);
            toast.success(res.data.message);
        })
        .catch(err=>{
            setLoading(false);
            toast.error(err.response.data.error);
        })

    }

    const validationSchema=Yup.object({
        email:Yup.string()
        .required('Email is required')
        .email('Invalid Email')

    });
 
    return(
        <Authlayout>
            <div className="reset">
                    <h2>Need Password Recovery ?</h2>
                    <p>Enter your email</p>
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
                                 label="Email" />
                                   
                                <CustomButton 
                                label="reset"
                                type="submit"
                                value="submit" >
                                    {loading ? <Loader/> : 'RECOVER PASSWORD'}
                                </CustomButton>

                            </Form>
                        </Formik>
                   
        </div>
        </Authlayout>
           
    )
}


export default GetResetForm;