import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './subHeader.scss'

class SubHeader extends Component {
  render() {
    const { subHeaderMessage, subHeaderTitle } = this.props;
    return (
      <div>
        <div className="sub-header-hero sub-header">
          <div className="sub-header-message">
            <h2 className="sub-header-title">
              { subHeaderTitle }
            </h2>
            <h5 className="sub-header-sub-title">
              <em>
                { subHeaderMessage }
              </em>
            </h5>
          </div>
        </div>
        <hr />
      </div>
    )
  }
}

SubHeader.propTypes = {
  subHeaderMessage: PropTypes.string.isRequired,
  subHeaderTitle: PropTypes.string.isRequired,
};


export default  SubHeader;
