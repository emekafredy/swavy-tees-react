import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import Loader from '../../components/Loader/index';

import { getOrders } from '../../redux/actions/ordersAction';

const imageUrlPrefix = process.env.REACT_APP_CLOUDINARY_URL;
class Orders extends Component {
  
  componentDidMount() {
    const { getOrders } = this.props;
    getOrders();
  }

  render() {
    const { orders, fetchingOrders } = this.props;
    return (
      <div>
        {
          fetchingOrders ? <Loader /> 
          :  <div className="container text-center">
              <div className="text-center">
                <hr className="first-cart-hr"/>
                <h2><em>My Orders</em></h2>
                <hr className="second-cart-hr"/>
              </div> 
              {
                orders.order ? 
                <table className="table-fill">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product</th>
                      <th>Color</th>
                      <th>Size</th>
                      <th>Quantity</th>
                      <th>Unit Price</th>
                      <th>Total Price</th>
                      <th>Current Status</th>
                      <th>Ordered On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      orders.order.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td>
                              <img src={`${imageUrlPrefix}/${item.product.thumbnail}`} alt=""/>
                            </td>
                            <td> { item.product.name } </td>
                            <td> { item.color } </td>
                            <td> { item.size } </td>
                            <td> { item.quantity } </td>
                            <td> { (item.totalAmount / item.quantity).toFixed(2) } </td>
                            <td> { item.totalAmount }  </td>
                            <td> { item.status }  </td>
                            <td> { moment(item.createdOn).format('D MMM, YYYY') }  </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table> : <div className="jumbotron">
                            You have no placed order(s)
                          </div>
              }
              <hr/> <hr/>
            </div>
        }
      </div>
    )
  }
}

Orders.propTypes = {
  orders: PropTypes.object.isRequired,
  fetchingOrders: PropTypes.bool.isRequired,
  getOrders: PropTypes.func.isRequired,
};

const actionCreators = {
  getOrders
};

export const mapStateToProps = ({ orders }) => ({
  orders: orders.orders,
  fetchingOrders: orders.fetchingOrders,
});

export default connect( mapStateToProps, actionCreators)(Orders);
