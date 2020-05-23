import React from 'react'
import { TextField } from '@material-ui/core'
import PropTypes from 'prop-types';

const DebouncingTextField = ({label, value, debounceTime, onChange, placeholder}) => {

  const handleChange = debounce((value) => {
    onChange(value);
  }, 250);

  return (
    <TextField
      label={label}
      type="text"
      variant="outlined"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

DebouncingTextField.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string
};

DebouncingTextField.defaultProps = {
  debounceTime: 250,
  onChange: () => {}
};

export const debounce = (callback, time, interval) => {
  return (event) => {
    const value = event.target.value;
    clearTimeout(interval, interval = setTimeout(() => callback(value), time));
  }
};

export default DebouncingTextField;
