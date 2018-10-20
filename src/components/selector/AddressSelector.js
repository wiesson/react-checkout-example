import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddressSelector extends Component {
  handleAddressChange = ev => {
    const { value } = ev.target;
    if (value) {
      const addressId = parseInt(ev.target.value, 10);
      const address = this.props.addresses.find(a => a.id === addressId);

      if (!address) {
        return;
      }

      this.props.setAddress({
        addressType: 'delivery',
        address,
      });
      return;
    }

    this.props.setAddress({
      addressType: 'delivery',
      address: undefined,
    });
  };

  componentWillMount() {
    const { address, addresses } = this.props;
    if (addresses.length === 0) {
      return;
    }

    if (address && address.hasOwnProperty('id')) {
      return;
    }

    if (address) {
      return;
    }

    this.props.setAddress({
      addressType: 'delivery',
      address: addresses[0],
    });
  }

  render() {
    const { address, addresses } = this.props;
    const addressId = address && address.hasOwnProperty('id') ? address.id : '';
    const optionList = addresses.map(a => (
      <option key={`addressId${a.id}`} value={a.id}>
        {a.firstName} {a.lastName}, {a.street}, {a.zip} {a.city}
      </option>
    ));

    return (
      <div className="form-control__group">
        <select
          className="form-control"
          name=""
          id=""
          onChange={this.handleAddressChange}
          value={addressId}
        >
          {optionList}
          <option value="">-- Create new address --</option>
        </select>
        {addressId ? (
          <div
            className="link link__form"
            onClick={() =>
              this.props.setAddress({
                addressType: 'delivery',
                address: undefined,
              })
            }
          >
            Create new address
          </div>
        ) : null}
      </div>
    );
  }
}

AddressSelector.propTypes = {
  setAddress: PropTypes.func.isRequired,
  addresses: PropTypes.array,
};

export default AddressSelector;
