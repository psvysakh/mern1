import React from 'react';
import {connect} from 'react-redux';
import { Formik , Form , Field} from 'formik';
import * as Yup from 'yup';
import Dashboard from '../Layout/Dashboard';
import FormInput from '../formInput/formInput';
import CustomButton from '../customButton/customButton';
import Loader from '../loader/loader';
import { clearAdminError, clearAdminMsg, createCategoryStart } from '../../redux/admin/admin.action';

const Createcategory=({
    createCategory,
    loading,
    message,
    error,
    clearMsg,
    clearError
})=>{

    const initialValues={
        name:''
}
/* const onSubmit=values=>{
    createCategory(values);
} */

const validationSchema=Yup.object({
    name:Yup.string()
    .required('Category is required')
    
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
    return (
       <Dashboard>
           <div>
                <h3>Create Category</h3>
                <div className="row">
                    <div className="col-lg-5">
                    {messageAlerts()}
                    {errorAlerts()}
                    <Formik 
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values,{resetForm})=>{
                        createCategory(values);
                        resetForm({name:''})
                    }}
                    >
                    <Form>
                        <Field  
                        name="name" 
                        type="text" 
                        label="name" 
                        component={FormInput}/>
                        <CustomButton label="signin" type="submit" value="submit" >
                            {loading ? <Loader/> : 'CREATE CATEGORY' }
                        </CustomButton>
                    </Form>
                </Formik>
                    </div>
                </div>
            </div>
            
       </Dashboard>
    )
}
const mapStateToProps=state=>({
    loading:state.admin.requesting,
    message:state.admin.message,
    error:state.admin.errors
    });
const mapDispatchToProps=dispatch=>({
    createCategory:(category)=>dispatch(createCategoryStart(category)),
    clearMsg:()=>dispatch(clearAdminMsg()),
    clearError:()=>dispatch(clearAdminError())
})
export default connect(mapStateToProps,mapDispatchToProps)(Createcategory);
