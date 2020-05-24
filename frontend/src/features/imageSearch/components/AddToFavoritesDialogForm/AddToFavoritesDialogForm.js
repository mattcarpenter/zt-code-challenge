import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

const AddToFavoritesDialogForm = ({onClose, categories, onSave}) => {
  const [ selectedCategoryIds, setSelectedCategoryIds ]  = useState({});
  const [ newCategoryName, setNewCategoryName ] = useState('');
  const [ newCategoryDescription, setNewCategoryDescription ] = useState('');

  function handleCheckboxChange(id, checked) {
    setSelectedCategoryIds({ ...selectedCategoryIds, [id]: checked })
  }

  function handleSaveClicked() {
    onSave({
      categories: Object.keys(selectedCategoryIds).filter(id => selectedCategoryIds[id]),
      newCategoryName,
      newCategoryDescription
    });
  }

  return (
    <div>
      <DialogTitle id="form-dialog-title">Add to List</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          Select one or more lists to add this image to.
        </DialogContentText>
        <FormGroup>
          { categories.map(category => (
            <FormControlLabel
              key={category.id}
              control={
                <Checkbox
                  onChange={(e) => handleCheckboxChange(category.id, e.target.checked)}
                  name={category.name}
                />
              }
              label={category.name}
            />
          ))}
        </FormGroup>
      </DialogContent>
      <DialogContent>
        <DialogContentText>
          Add this photo to a new list by entering a list name and description.
        </DialogContentText>
        <TextField
          margin="dense"
          id="new-list-name"
          label="New List Name"
          type="text"
          fullWidth
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <TextField
          margin="dense"
          id="new-list-description"
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


AddToFavoritesDialogForm.propTypes = {
  onClose: PropTypes.func,
  categories: PropTypes.arrayOf(PropTypes.object),
  onSave: PropTypes.func
};

AddToFavoritesDialogForm.defaultProps = {
  categories: [],
  onClose: () => {},
  onSave: () => {}
};

export default AddToFavoritesDialogForm;
