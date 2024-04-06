import * as React from 'react';
import Button from '@mui/material/Button';
import { green } from '@mui/material/colors';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';




const Photos = ({find}) => {

    //const [find, setFind] = React.useState("")

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <br />
            <Button color="success" variant="contained" onClick={handleClickOpen} startIcon={<AddPhotoAlternateIcon />} sx={{ height: "37px", margin: "5px", backgroundColor: green[600], opacity: "60%" }}>
                Add Photo
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create Photo</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="string"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="imageUrl"
                        label="Image Url"
                        type="string"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Save</Button>
                </DialogActions>
            </Dialog>
            <h1>Photos</h1>
        </>
    )
}

export default Photos