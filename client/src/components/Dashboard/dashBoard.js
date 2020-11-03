import React,{Component} from 'react';

import {connect} from 'react-redux';
import { getDashboardStart } from '../../redux/user/user.action';
class Dashboard extends Component{
   componentDidMount(){
       this.props.getDashboard();
   }
   componentDidUpdate(){
    this.props.getDashboard();
    }
    render(){
        return(
            <section className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1>Dashboard Data..</h1>
                            <p>{this.props.secretData}</p>
                        </div>
                    </div>
                </div> 
            </section>
        )
    }
    
}
const mapStateToProps=state=>({
secretData:state.user.secret
});
const mapDispatchToProps=dispatch=>({
getDashboard:()=>dispatch(getDashboardStart())
});

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);