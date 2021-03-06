import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import React, {useState} from 'react';

const UpdateCategoryDialogForm = ({
  /**
   * Callback function invoked when the cancel button is clicked
   */
  onClose,
  /**
   * Category name to be edited
   */
  name,
  /**
   * Category description to be edited
   */
  description,
  /**
   * Callback function invoked when the save button is clicked
   */
  onSave
}) => {
  const [ newCategoryName, setNewCategoryName ] = useState(name);
  const [ newCategoryDescription, setNewCategoryDescription ] = useState(description);
  const [ errorText, setErrorText ] = useState(null);

  const handleSaveClicked = () => {
    // perform basic form validation before notifying the parent that an update should occur
    if (newCategoryName.trim() === '') {
      setErrorText('Please enter a category name');
      return;
    }
    onSave(newCategoryName, newCategoryDescription);
  };

  const handleCategoryNameTextFieldChange = (e) => {
    // clear error state
    setNewCategoryName(e.target.value);
    setErrorText(null);
  };

  return (
    <div>
      <DialogTitle id="form-dialog-title">Update List</DialogTitle>
      <DialogContent dividers>
        <TextField
          value={newCategoryName}
          margin="dense"
          id="list-name"
          label="List Name"
          type="text"
          helperText={errorText}
          error={errorText !== null}
          maxLength={64}
          fullWidth
          onChange={handleCategoryNameTextFieldChange}
        />
        <TextField
          value={newCategoryDescription}
          margin="dense"
          id="list-description"
          label="List Description"
          type="text"
          maxLength={256}
          fullWidth
          onChange={(e) => setNewCategoryDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSaveClicked} color="primary">
          Save
        </Button>
      </DialogActions>
    </div>
  );
};


UpdateCategoryDialogForm.propTypes = {
  onClose: PropTypes.func,
  categoryName: PropTypes.string,
  categoryDescription: PropTypes.string,
  onSave: PropTypes.func
};

UpdateCategoryDialogForm.defaultProps = {
  onClose: () => {},
  onSave: () => {},
  name: '',
  description: ''
};

export default UpdateCategoryDialogForm;
