
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useGet from '../../Hooks/useGet'
import { insert } from '../../Store/UserSlice'
import UserCard from './UserCard'
import * as React from 'react';
import Button from '@mui/material/Button';
import { green } from '@mui/material/colors';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useHttp from '../../Hooks/UseHttp'


const Users = ({ find }) => {
    const url = 'users'
    const dispatch = useDispatch()
    const { data, loading, refetch } = useGet(url)
    useEffect(() => { loading ? console.log('loading') : dispatch(insert({ arr: data })) }, [data])
    const userArr = useSelector((myStore) => myStore.userSlice.userArr)
    const [open, setOpen] = React.useState(false);
    const [require, setRequire] = React.useState(true);

    let nameRef = React.useRef("")
    let usernameRef = React.useRef("")
    let phoneRef = React.useRef("")
    let addressRef = React.useRef("")
    let emailRef = React.useRef("")

    const handleClickOpen = () => {
        setOpen(true);
    };

    const { add } = useHttp()

    const handleClose = () => {
        setOpen(false);
        const newName = nameRef.current.value.length ? nameRef.current.value : ""
        const newUsername = usernameRef.current.value.length ? usernameRef.current.value : ""
        const newPhone = phoneRef.current.value.length ? phoneRef.current.value : ""
        const newAddress = addressRef.current.value.length ? addressRef.current.value : ""
        const newEmail = emailRef.current.value.length ? emailRef.current.value : ""

        add('users', { name: newName, username: newUsername, phone: newPhone, email: newEmail, address: newAddress }, refetch)
        setRequire(true)
    };

    return (
        <>
            <br />
            <Button color="success" variant="contained" onClick={handleClickOpen} startIcon={<PersonAddAlt1Icon />} sx={{ height: "37px", margin: "5px", backgroundColor: green[600], opacity: "60%" }}>
                Add User
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create User</DialogTitle>
                <DialogContent>
                    <TextField
                        inputRef={nameRef}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="string"
                        fullWidth
                        variant="standard"
                        onChange={e=>{e.target.value?setRequire(false):setRequire(true)}}
                    />
                    <TextField
                        inputRef={usernameRef}
                        autoFocus
                        margin="dense"
                        id="username"
                        label="UserName"
                        type="string"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        inputRef={phoneRef}
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="string"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        inputRef={addressRef}
                        autoFocus
                        margin="dense"
                        id="address"
                        label="Address"
                        type="string"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        inputRef={emailRef}
                        autoFocus
                        margin="dense"
                        id="phone"
                        label="Phone"
                        type="string"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={require}>Save</Button>
                </DialogActions>
            </Dialog>
            {userArr.length ? userArr.map(user => (user.name.toLowerCase().includes(find.toLowerCase()) || user.username && user.username.includes(find) || user.email && user.email.includes(find) || user.address && user.address.includes(find)) && <div className='card'><UserCard user={user} refetch={refetch} /></div>) : <h1><br />There is no user</h1>}

        </>
    )
}

export default Users