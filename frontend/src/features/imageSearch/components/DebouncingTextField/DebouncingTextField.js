import {TextField} from '@material-ui/core'
import PropTypes from 'prop-types';
import React from 'react'

const DebouncingTextField = ({label, value, debounceTime, onChange, placeholder, className, onFocus}) => {

  const handleChange = debounceEvent((value) => {
    onChange(value);
  }, debounceTime);

  return (
    <TextField
      className={className}
      label={label}
      type="text"
      variant="outlined"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      onFocus={onFocus}
      fullWidth={true}
    />
  );
};

DebouncingTextField.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onFocus: PropTypes.func
};

DebouncingTextField.defaultProps = {
  debounceTime: 250,
  onChange: () => {},
  onFocus: () => {}
};

export const debounceEvent = (callback, time, interval) => {
  return (event) => {
    const value = event.target.value;
    clearTimeout(interval, interval = setTimeout(() => callback(value), time));
  }
};

export default DebouncingTextField;
