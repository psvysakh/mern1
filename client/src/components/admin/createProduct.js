import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import { Formik , Form , Field} from 'formik';
import * as Yup from 'yup';
import FormInput from '../formInput/formInput';
import Select from '../customSelect/customSelect';
import CustomButton from '../customButton/customButton';
import Dashboard from '../Layout/Dashboard';
import Loader from '../loader/loader';
import {getCategoriesStart} from '../../redux/core/core.action';
import { 
    createProductStart, 
    clearAdminError, 
    clearAdminMsg, } from '../../redux/admin/admin.action';



const Createproduct=({
    createProduct,
    getCategories,
    categories, 
    loading,
    message,
    error,
    clearMsg,
    clearError})=>{
    
    
    const initialValues={
        photo:'',
        name:'',
        description:'',
        price:'',
        quantity:'',
        category:'',

        }   
    function getFormData(object) {
        const formData = new FormData();
        Object.keys(object).forEach(key => formData.append(key, object[key]));
        return formData;
    }


    const validationSchema=Yup.object({
   
        name:Yup.string()
        .required('name is required')
        .min(5,'Min Character Must be 5'),
        description:Yup.string()
        .required('description is required')
        .min(10,'Min Character Must be 10'),
        price:Yup.number()
        .required('price is required')
        .min(1,'Min value must be 1'),
        quantity:Yup.number()
        .required('quantity is required'),
        category:Yup.string()
        .required('category is required'),

    });
    const messageAlerts=()=>{
        if(message){
            setTimeout(()=>{
                clearMsg();
            },5000);
            return (
                <div className="alert alert-success" role="alert">
                  {message}
                </div>
            );
        }
    }
    const errorAlerts=()=>{
        if(error){
            setTimeout(()=>{
                clearError();
            },5000);
            return (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
            );
        }
    }

    useEffect(()=>{
        getCategories();
    },[])

    return(
        <Dashboard>
             <div>
                <h3>Create Product</h3>
                <div className="row">
                    <div className="col-lg-12">
                    {messageAlerts()}
                    {errorAlerts()}
                    </div>
                    <div className="col-lg-5">
                    
            <Formik 
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values,{resetForm})=>{
                    let formdata = getFormData(values);
                    createProduct(formdata);
                    resetForm({values:''}) 
                }}
            
            >
                {
                ({ setFieldValue }) => {
                    return (
                        <Form >
                             <input 
                                id="file" 
                                name="file" 
                                type="file" 
                                onChange={(event) => {
                                            setFieldValue("photo", event.target.files[0]);
                                        }} 
                             />
                       
                            <Field  
                            name="name" 
                            type="name" 
                            label="Name" 
                            component={FormInput}/>
    
                            <Field  
                            name="description" 
                            type="description" 
                            label="Description" 
                            component={FormInput}/>
    
                            <Field  
                            name="price" 
                            type="number" 
                            label="Price" 
                            component={FormInput}/>
    
                            <Field  
                            name="quantity" 
                            type="number" 
                            label="Quantity" 
                            component={FormInput}/>
    
                            <Select 
                            name="category"
                            options={categories}
                            />
    
                                        
                            <CustomButton label="product" type="submit" value="submit" >
                                {loading ? <Loader/> : 'CREATE PRODUCT'}
                            </CustomButton>
                    

                        </Form>
                         
                       
                    );
                  }
                }
               
            </Formik>
            </div>
            </div>
            </div>
        </Dashboard>
    )
    
}

const mapStateToProps=state=>({
    categories:state.core.categories,
    loading:state.admin.requesting,
    message:state.admin.message,
    error:state.admin.errors
    });
    const mapDispatchToProps=dispatch=>({
        createProduct:(data)=>dispatch(createProductStart(data)),
        getCategories:()=>dispatch(getCategoriesStart()),
        clearMsg:()=>dispatch(clearAdminMsg()),
        clearError:()=>dispatch(clearAdminError())
    });
    export default connect(mapStateToProps,mapDispatchToProps)(Createproduct);
