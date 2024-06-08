import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [resDetails, setResDetails] = React.useState({
    resid: '',
    resname: '',
    reslocation: '',
    restype: '',
    rescuisine: '',
    resowner: '',
    resopentime: '',
    resclosetime: '',
    resdescription: '',
    resimage: null // Updated to store a file object
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setResDetails(prevDetails => ({
      ...prevDetails,
      [name]: files ? files[0] : value // Handle file input
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    Object.keys(resDetails).forEach(key => {
      formData.append(key, resDetails[key]);
    });

    try {
      const response = await fetch('http://localhost:3000/api/distributor/register-restaurant', {
        method: 'POST',
        body: formData,
      });

      const apiResponse = await response.json();
      console.log(apiResponse, "&&&&");
      if (!response.ok) {
        console.log(apiResponse.message);
      }

      console.log(apiResponse);
      handleClose();
    } catch (error) {
      console.error("Error in saving restaurant data:", error.message);
    }
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Register Restaurant
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Register Restaurant</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To register a restaurant, please enter the restaurant details here.
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="resid"
              name="resid"
              label="Restaurant FSSAI ID"
              type="text"
              fullWidth
              variant="standard"
              value={resDetails.resid}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="resname"
              name="resname"
              label="Restaurant Name"
              type="text"
              fullWidth
              variant="standard"
              value={resDetails.resname}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="reslocation"
              name="reslocation"
              label="Location"
              type="text"
              fullWidth
              variant="standard"
              value={resDetails.reslocation}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="restype"
              name="restype"
              label="Type"
              type="text"
              fullWidth
              variant="standard"
              value={resDetails.restype}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="rescuisine"
              name="rescuisine"
              label="Cuisine"
              type="text"
              fullWidth
              variant="standard"
              value={resDetails.rescuisine}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="resowner"
              name="resowner"
              label="Owner"
              type="text"
              fullWidth
              variant="standard"
              value={resDetails.resowner}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="resopentime"
              name="resopentime"
              label="Open Time"
              type="text"
              fullWidth
              variant="standard"
              value={resDetails.resopentime}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="resclosetime"
              name="resclosetime"
              label="Close Time"
              type="text"
              fullWidth
              variant="standard"
              value={resDetails.resclosetime}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="resdescription"
              name="resdescription"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              value={resDetails.resdescription}
              onChange={handleChange}
            />
            <input
              margin="dense"
              id="resimage"
              name="resimage"
              type="file"
              fullWidth
              onChange={handleChange}
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Register</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
