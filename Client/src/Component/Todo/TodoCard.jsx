import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import { green, red } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useHttp from '../../Hooks/UseHttp';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function TodoCard(props) {

  let titleRef = React.useRef(props.todo.title)
  let tagsRef = React.useRef(props.todo.tags)
  const _id = props.todo._id
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(props.todo.completed );
  const [require, setRequire] = React.useState(true);
  const handleClickOpen = () => {
    setOpen(true);
    setRequire(false)
  };

  const { update } = useHttp()
  const handleClose = () => {
    setOpen(false);
    const newTitle = titleRef.current.value.length ? titleRef.current.value : props.todo.title
    const newTags = tagsRef.current.value.length ? tagsRef.current.value.split(",") : props.todo.tags.split(",")
    update('todos', { _id: _id, title: newTitle, tags: newTags }, props.refetch)
  };

  const { deleteObj } = useHttp()
  const delete1 = () => {
    deleteObj(`todos/${_id}`, props.refetch)
  }


  const putCompleted = (event) => {
    setChecked(event.target.checked)
    update('todos', { _id: _id, title: props.todo.title, tags: props.todo.tags, completed: !props.todo.completed }, props.refetch)
}
 
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>

        <Typography variant="h5" component="div" sx={{ backgroundColor: 'gray', color: 'white' }}>
          {props.todo.title}
        </Typography>
        <Typography variant="body2">
          {props.todo.tags.map(tag => <Typography>{tag}</Typography>)}
        </Typography>
      </CardContent>
      <Button variant="contained" sx={{ height: "37px", margin: "5px", backgroundColor: green[600], opacity: "60%" }}>
        <FormControlLabel control={<Checkbox sx={{ color: 'grey', '&.Mui-checked': { color: 'grey' } }} checked={checked}  onChange={putCompleted} />} label="Completed" />
      </Button>
      <Button onClick={delete1} variant="contained" startIcon={<DeleteIcon />} sx={{ height: "37px", margin: "5px", backgroundColor: green[600], opacity: "60%" }}>
        Delete
      </Button>
      <Button variant="contained" onClick={handleClickOpen} startIcon={<EditNoteSharpIcon />} sx={{ height: "37px", margin: "5px", backgroundColor: green[600], opacity: "60%" }}>
        Update
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Todo</DialogTitle>
        <DialogContent>
          <TextField
            inputRef={titleRef}
            defaultValue={props.todo.title}
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="string"
            fullWidth
            variant="standard"
            onChange={e => { e.target.value ? setRequire(false) : setRequire(true) }}
          />
          <TextField
            inputRef={tagsRef}
            defaultValue={props.todo.tags}
            autoFocus
            margin="dense"
            id="tags"
            label="Tags"
            type="string"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}  disabled={require}>Save</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}