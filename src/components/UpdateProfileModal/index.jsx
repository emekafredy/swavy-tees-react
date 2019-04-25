import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './updateProfileModal.scss';

import { updateUserProfile } from '../../redux/actions/profileActions';

class UpdateProfileModal extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      city: '',
      country: '',
      postalCode: '',
      dayPhone: '',
      eveningPhone: '',
      mobilePhone: ''
    }
  
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(props, state) {
    const { user } = props;
    this.setState({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      address1: user.address1 || '',
      address2: user.address2 || '',
      city: user.city || '',
      country: user.country || '',
      postalCode: user.postalCode || '',
      dayPhone: user.dayPhone || '',
      eveningPhone: user.eveningPhone || '',
      mobilePhone: user.mobilePhone || '',
    })
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleProfileUpdate = (event) => {
    event.preventDefault();
    let { updateUserProfile } = this.props;
    const {
      firstName, lastName, address1, address2, city, country, postalCode, dayPhone, eveningPhone, mobilePhone
    } = this.state;
    const userUpdateData = {
      firstName, lastName, address1, address2, city, country, postalCode, dayPhone, eveningPhone, mobilePhone
    }
    updateUserProfile(userUpdateData);
  }

  render() {
    const { onClose, show, updatingProfile } = this.props;
    const {
      firstName, lastName, address1, address2, city, country, postalCode, dayPhone, eveningPhone, mobilePhone
    } = this.state;
    return (
      <Fragment>
        {show ? <div className="modal-wrapper">
            <div className="inner-content">
              <div><h2>Update Profile</h2></div>
              <hr/>
              <form>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={firstName}
                      onChange={ this.handleChange }
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text" 
                      className="form-control" 
                      name="lastName"
                      value={lastName}
                      onChange={ this.handleChange }
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="address1">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address1" 
                    value={address1}
                    onChange={ this.handleChange }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address2">Address II</label>
                  <input
                    type="text" 
                    className="form-control" 
                    name="address2"
                    value={address2}
                    onChange={ this.handleChange }
                  />
                </div>
                <div className="form-row">
                  <div className="form-group col-md-5">
                    <label htmlFor="city">City</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="city"
                      value={city}
                      onChange={ this.handleChange }
                    />
                  </div>
                  <div className="form-group col-md-5">
                    <label htmlFor="country">Country</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="country"
                      value={country}
                      onChange={ this.handleChange }
                    />
                  </div>
                  <div className="form-group col-md-2">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input
                      type="text" 
                      className="form-control" 
                      name="postalCode"
                      value={postalCode}
                      onChange={ this.handleChange }
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="dayPhone">Day Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    name="dayPhone"
                    value={dayPhone}
                    onChange={ this.handleChange }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="eveningPhone">Evening Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    name="eveningPhone"
                    value={eveningPhone}
                    onChange={ this.handleChange }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="mobilePhone">Mobile Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    name="mobilePhone"
                    value={mobilePhone}
                    onChange={ this.handleChange }
                  />
                </div>
                <hr/>
                <div>
                  <button 
                    className="btn btn-default btn-align" 
                    onClick={ onClose }
                  > Close 
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-align"
                    onClick={ this.handleProfileUpdate }
                  >
                  { updatingProfile ? <i className="fa fa-spinner fa-spin"></i> : ''}
                  Update
                  </button>
                </div>
              </form>
            </div>
          </div> : null}
      </Fragment>
    )
  }
}

UpdateProfileModal.propTypes = {
  user: PropTypes.object.isRequired,
  fetchingProfile: PropTypes.bool.isRequired,
  updateUserProfile: PropTypes.func.isRequired,
  updatingProfile: PropTypes.bool.isRequired,
};

export const mapStateToProps = ({ profile }) => ({
  user: profile.profile,
  fetchingProfile: profile.fetchingProfile,
  updatingProfile: profile.updatingProfile
});

const actionCreators = {
  updateUserProfile
};

export default connect( mapStateToProps, actionCreators)(UpdateProfileModal);
