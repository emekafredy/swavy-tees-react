import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StripeCheckout from "react-stripe-checkout";

// action
import { getUserProfile, getRegions } from '../../redux/actions/profileActions';
import { getCheckout, makePayment } from '../../redux/actions/checkoutActions';

// components
import Loader from '../../components/Loader';
import UpdateProfileModal from '../../components/UpdateProfileModal/index';

import './checkout.scss';

class Checkout extends Component {

  state = { showModal: false, selectedRegion: 1, selectedType: null }
  handleOpenModal = () => this.setState({showModal: true});
  handleCloseModal = () => this.setState({showModal: false});

  componentDidMount() {
    const { getUserProfile, getRegions, getCheckout } = this.props;
    getUserProfile();
    getRegions();
    getCheckout();
  }

  handleChangeRegion = (e, type) => {
    this.setState({ [type]: e.target.value })
  };

  onToken = async (token) => {
    const { makePayment } = this.props;
    const { selectedType } = this.state;
    const paymentData = {
      shippingId: Number(selectedType),
      stripeToken: token.id,
      stripeEmail: token.email
    };
    await makePayment(paymentData);
  }

  render() {
    const { user, fetchingProfile, regions, fetchingRegions, totalPrice, cart } = this.props;
    const shippings = regions.filter(item => item.id === Number(this.state.selectedRegion))[0];
    const getShippingCost = shippings && shippings.Shippings.map(shipping => shipping)
      .filter(cost => cost.id === Number(this.state.selectedType));
    const cost = getShippingCost && getShippingCost[0];
    const grandTotal = (cost && cost.shippingCost) ? (totalPrice + Number(cost.shippingCost)).toFixed(2)
    : totalPrice && totalPrice.toFixed(2);
    const message = 'please update your information to proceed with payments';
  
    return (
      <div className="checkout-wrapper">
        {cart && cart.length === 0 ? 
            <div className="jumbotron text-center">
              <h4>You currently have no item in your cart</h4>
            </div>
          : <Fragment>
              {fetchingProfile ? <Loader /> : <Fragment>
                <hr/>
                <h1 className="text-center"><em>Checkout Cart</em></h1>
                <hr/>
                <div className="card">
                  <div className="card-header">
                    <p className="checkout-card-title"> User Details </p>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title checkout-user-info"> { `${user.firstName} ${user.lastName}` } </h5>
                    <p className="card-text checkout-user-info"> { user.address1 } </p>
                    <p className="card-text checkout-user-info"> { user.mobilePhone } </p>
                    <p className="card-text checkout-user-info"> <em> { user.city }, { user.country }  </em> </p>
                    { !user.address1 || !user.mobilePhone || !user.city || !user.country ?
                      <p className="little-warning"> { message } </p> : null
                    }
                  </div>
                  <div className="card-footer text-muted">
                    <button 
                      type="submit"
                      className="btn btn-primary pull-right"
                      onClick={ this.handleOpenModal }
                    >
                      Update Information
                    </button>
                    <UpdateProfileModal 
                      onClose={this.handleCloseModal}
                      show={this.state.showModal}
                    />
                  </div>
                </div>
                <hr/>
                <div className="card">
                  <div className="card-header">
                    <p className="checkout-card-title"> Shipping Details </p>
                  </div>
                  <div className="card-body region-div">
                    <div>
                      {fetchingRegions ? <div className="text-center">
                          Fetching Regions...
                        </div> : <div className="form-group row">
                          <div className="col-md-6">
                            <label htmlFor="sel1">Shipping Region:</label>
                            <select 
                              className="form-control" 
                              id="sel1"
                              defaultValue={regions.filter(item => item.id === 1)[0].id}
                              onChange={(e) => this.handleChangeRegion(e, 'selectedRegion')}
                            >                         
                              {regions.map(region => {
                                return (
                                  <option key={region.id} value={region.id}>
                                    { region.shippingRegion }
                                  </option>
                              )})}
                            </select>
                            { Number(this.state.selectedRegion) === 1 ? 
                              <label htmlFor="sel1" className='little-warning'>Please select a shipping region</label> : null
                            }
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="sel1">Shipping Type:</label>
                            <select 
                              className="form-control"
                              onChange={(e) => this.handleChangeRegion(e, 'selectedType')}
                            >
                            <option key="unique" value={null}>Please Select</option>                        
                            {shippings && shippings.Shippings.map(shipping => {
                              return (
                                <option key={shipping.id} value={shipping.id}>
                                  { shipping.shippingType }
                                </option>
                            )})}
                            </select>
                            { Number(this.state.selectedType) === 0 ? 
                              <label htmlFor="sel1" className='little-warning'>Please select a shipping type</label> : null
                            }
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                </div>
                <hr/>
                <div className="card">
                  <div className="card-header">
                    <p className="checkout-card-title"> Cost Breakdown </p>
                  </div>
                  <div className="card-body">
                    <p>
                      <span className="pull-left"> Subtotal Cost </span>
                      <span className="pull-right"> ${ totalPrice && totalPrice.toFixed(2) } </span>
                    </p>
                    <hr/>
                    <p>
                      <span className="pull-left"> Shipping Cost </span>
                      <span className="pull-right"> ${ cost && Number(cost.shippingCost) } </span>
                    </p>
                  </div>
                  <div className="card-footer text-muted">
                    <p>
                      <span className="pull-left"> Total </span>
                      <span className="pull-right"> 
                        ${ grandTotal } 
                      </span>
                    </p>
                  </div>
                </div> 
                <hr/>
                <div className="pull-right">
                  <StripeCheckout
                    className="btn btn-success pull-right"
                    label="Proceed with payment"
                    panelLabel="Confirm payment"
                    name="Swavy Tees"
                    description="Payment for ordered products."
                    amount={ grandTotal * 100 }
                    token={this.onToken}
                    stripeKey='pk_test_Dd2IUOC4Lxnin6RXIjuSzGeC'
                    image="https://t3.ftcdn.net/jpg/01/18/87/58/240_F_118875860_IERKvtHdaL0vPBQVamWNLdRgz3gDUL3c.jpg"
                    billingAddress={false}
                    disabled={
                      Number(this.state.selectedType) === 0 || !user.address1 || !user.mobilePhone || !user.city || !user.country
                    }
                  />
                </div>
              </Fragment>}
          </Fragment>}
      </div>
    )
  }
}

Checkout.propTypes = {
  getUserProfile: PropTypes.func,
  user: PropTypes.object.isRequired,
  fetchingProfile: PropTypes.bool.isRequired,
  getRegions: PropTypes.func,
  fetchingRegions: PropTypes.bool.isRequired,
  regions: PropTypes.array.isRequired,
  getCheckout: PropTypes.func.isRequired,
  makePayment: PropTypes.func.isRequired,
  cart: PropTypes.array,
};

Checkout.defaultProps = {
  getUserProfile: () => {},
  getRegions: () => {},
  cart: []
}

const actionCreators = {
  getUserProfile,
  getRegions,
  getCheckout,
  makePayment
};

export const mapStateToProps = ({ profile, cart }) => ({
  user: profile.profile,
  fetchingProfile: profile.fetchingProfile,
  regions: profile.regions,
  fetchingRegions: profile.fetchingRegions,
  totalPrice: cart.products.totalPrice,
  cart: cart.products.cart,
});

export default connect( mapStateToProps, actionCreators)(Checkout);
