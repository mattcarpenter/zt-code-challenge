import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import React, {useState} from 'react';

const AddToFavoritesDialogForm = ({onClose, categories, onSave}) => {
  const [ selectedCategoryIds, setSelectedCategoryIds ]  = useState({});
  const [ newCategoryName, setNewCategoryName ] = useState('');
  const [ newCategoryDescription, setNewCategoryDescription ] = useState('');

  const handleCheckboxChange = (id, checked) => {
    setSelectedCategoryIds({ ...selectedCategoryIds, [id]: checked })
  };

  const handleSaveClicked = () => {
    onSave({
      categories: Object.keys(selectedCategoryIds).filter(id => selectedCategoryIds[id]),
      newCategoryName,
      newCategoryDescription
    });
  };

  return (
    <div>
      <DialogTitle id="form-dialog-title">Add to List</DialogTitle>
      { categories.length > 0 && (
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
      )}
      <DialogContent>
        <DialogContentText>
          Add this photo to a new list by entering a list name and description.
        </DialogContentText>
        <TextField
          margin="dense"
          id="new-list-name"
          label="New List Name"
          type="text"
          maxLength={64}
          fullWidth
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <TextField
          margin="dense"
          id="new-list-description"
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
