import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// action
import { getUserProfile } from '../../redux/actions/profileActions';

// components
import Loader from '../../components/Loader';
import UpdateProfileModal from '../../components/UpdateProfileModal/index';

import './userProfile.scss';

class UserProfile extends Component {
  state = {showModal: false}
  handleOpenModal = () => this.setState({showModal: true});
  handleCloseModal = () => this.setState({showModal: false});

  componentDidMount() {
    const { getUserProfile } = this.props;
    getUserProfile();
  }

  render() {
    const { user, fetchingProfile } = this.props;
    return (
      <div className="profile-wrapper">
      {
        fetchingProfile ? <Loader /> : 
        <div>
          <hr/>
            <h3 className="text-center"><em>My Profile</em></h3>
          <hr/>		
          <div className="card">
            <img 
              className="card-img-top" src="https://static.makeuseof.com/wp-content/uploads/2018/09/ebay-vs-amazon-670x335.jpg" 
              alt="profile img"
            />
            <div className="card-body">
              <h4 className="card-title text-center"> {`${user.firstName} ${user.lastName}`} </h4>
                <ul className="list-inline text-center" id="courses">
                  <li className="list-inline-item"> <i className="fa fa-user"></i> { user.role } </li>            
                </ul> <hr/>
              <div className="address">								
                <ul className="list-group">
                  <li className="list-group-item"> 
                    <p className="profile-details-key"> Email Address </p>
                    <span className="profile-details-value"> { user.email } </span>
                  </li>
                  <li className="list-group-item"> 
                    <p className="profile-details-key"> Address I </p>
                    <span className="profile-details-value"> { user.address1 } </span>
                  </li>
                  <li className="list-group-item"> 
                    <p className="profile-details-key"> Address II </p>
                    <span className="profile-details-value"> { user.address2 } </span>
                  </li>
                  <li className="list-group-item"> 
                    <p className="profile-details-key"> City </p>
                    <span className="profile-details-value"> { user.city } </span>
                  </li>
                  <li className="list-group-item"> 
                    <p className="profile-details-key"> Postal Code </p>  
                    <span className="profile-details-value"> { user.postalCode } </span>
                  </li>
                  <li className="list-group-item"> 
                    <p className="profile-details-key"> Country </p>  
                    <span className="profile-details-value"> { user.country } </span>
                  </li>
                  <li className="list-group-item"> 
                    <p className="profile-details-key"> Day Phone </p>  
                    <span className="profile-details-value"> { user.dayPhone } </span>
                  </li>
                  <li className="list-group-item"> 
                    <p className="profile-details-key"> Evening Phone </p>  
                    <span className="profile-details-value"> { user.eveningPhone } </span>
                  </li>
                  <li className="list-group-item"> 
                    <p className="profile-details-key"> Mobile Phone </p>  
                    <span className="profile-details-value"> { user.mobilePhone } </span>
                  </li>
                </ul>  <hr/> 
              </div>       
            </div>
            <div className="card-footer text-center">
              <button
                className="btn btn-primary"
                onClick={ this.handleOpenModal }
              >
                Update Profile <span /> <i className="fa fa-pencil fa-lg"></i> 
              </button>
              <UpdateProfileModal 
                onClose={this.handleCloseModal}
                show={this.state.showModal}
              />
            </div>
          </div>
        </div>
      }
      </div>					   
    )
  }
}

UserProfile.propTypes = {
  getUserProfile: PropTypes.func,
  user: PropTypes.object.isRequired,
  fetchingProfile: PropTypes.bool.isRequired,
};

UserProfile.defaultProps = {
  getUserProfile: () => {},
  getRegions: () => {},
}

const actionCreators = {
  getUserProfile
};

export const mapStateToProps = ({ profile }) => ({
  user: profile.profile,
  fetchingProfile: profile.fetchingProfile,
});

export default connect( mapStateToProps, actionCreators)(UserProfile);
