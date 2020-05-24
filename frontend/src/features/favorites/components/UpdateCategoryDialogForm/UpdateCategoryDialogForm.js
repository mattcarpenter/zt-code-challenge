import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

const UpdateCategoryDialogForm = ({onClose, name, description, onSave}) => {
  const [ newCategoryName, setNewCategoryName ] = useState(name);
  const [ newCategoryDescription, setNewCategoryDescription ] = useState(description);

  function handleSaveClicked() {
    onSave(newCategoryName, newCategoryDescription);
  }

  return (
    <div>
      <DialogTitle id="form-dialog-title">Update List</DialogTitle>
      <DialogContent dividers>
        <TextField
          value={newCategoryName}
          autoFocus
          margin="dense"
          id="list-name"
          label="List Name"
          type="text"
          fullWidth
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <TextField
          value={newCategoryDescription}
          autoFocus
          margin="dense"
          id="list-description"
          label="List Description"
          type="text"
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
