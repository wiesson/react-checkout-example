import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Form.css';

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  initialState = {
    firstName: '',
    lastName: '',
    street: '',
    zip: '',
    city: '',
    country: '',
  };

  componentWillMount() {
    const { address } = this.props;

    if (address) {
      this.setState(address);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.address) {
      this.setState(this.initialState);
      return;
    }

    const { id, ...address } = nextProps.address;

    const addressHasUpdated =
      JSON.stringify(address) !== JSON.stringify(this.state);

    if (addressHasUpdated) {
      this.setState({ ...address });
    }
  }

  fieldIsValid = f => f && f !== '' && f.length > 2;

  addressIsValid = fields =>
    Object.values(fields).every(f => this.fieldIsValid(f), false);

  handleInput = name => event => {
    const value = event.target.value;
    this.setState({ [name]: value });
    if (this.fieldIsValid) {
      this.props.setAddressField({
        addressType: 'delivery',
        field: name,
        value,
      });
    }
  };

  render() {
    return (
      <div>
        <div className="form-control__group">
          <label className="form-control__label" htmlFor="">
            First Name
          </label>
          <input
            required
            className="form-control"
            type="text"
            value={this.state.firstName}
            onChange={this.handleInput('firstName')}
          />
        </div>

        <div className="form-control__group">
          <label className="form-control__label" htmlFor="">
            Last Name
          </label>
          <input
            required
            className="form-control"
            type="text"
            value={this.state.lastName}
            onChange={this.handleInput('lastName')}
          />
        </div>

        <div className="form-control__group">
          <label className="form-control__label" htmlFor="">
            Street
          </label>
          <input
            required
            className="form-control"
            type="text"
            value={this.state.street}
            onChange={this.handleInput('street')}
          />
        </div>

        <div className="form-control__group">
          <label className="form-control__label" htmlFor="">
            City
          </label>
          <input
            required
            className="form-control"
            type="text"
            value={this.state.city}
            onChange={this.handleInput('city')}
          />
        </div>

        <div className="form-control__group">
          <label className="form-control__label" htmlFor="">
            ZIP
          </label>
          <input
            required
            className="form-control"
            type="text"
            value={this.state.zip}
            onChange={this.handleInput('zip')}
          />
        </div>

        <div className="form-control__group">
          <label className="form-control__label" htmlFor="">
            Country
          </label>
          <input
            required
            className="form-control"
            type="text"
            value={this.state.country}
            onChange={this.handleInput('country')}
          />
        </div>
      </div>
    );
  }
}

Address.propTypes = {
  setAddressField: PropTypes.func.isRequired,
  address: PropTypes.object,
};

export default Address;
