import {TextField} from '@material-ui/core'
import PropTypes from 'prop-types';
import React from 'react'

const DebouncingTextField = ({
 /**
  * Input field label
  */
 label,
 /**
  * Input field value
  */
 value,
 /**
  * Debounce threshold in milliseconds
  */
 debounceTime,
 /**
  * Callback function invoked {debounceTime} milliseconds after user input
  */
 onChange,
 /**
  * Input field placeholder text
  */
 placeholder,
 /**
  * CSS class name
  */
 className,
 /**
  * Callback function invoked when the text input receives focus
  */
 onFocus
}) => {

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
