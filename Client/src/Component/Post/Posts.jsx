import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useGet from '../../Hooks/useGet'
import {insert} from '../../Store/PostSlice'
import PostCard from './Post Card'
import * as React from 'react';
import Button from '@mui/material/Button';
import { green, grey } from '@mui/material/colors';
import PostAddIcon from '@mui/icons-material/PostAdd';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useHttp from '../../Hooks/UseHttp'



const Posts=({ find })=>{
    const dispatch=useDispatch()
    const url='posts'
    const {data,loading,refetch}=useGet(url)

    let titleRef=React.useRef("")
    let bodyRef=React.useRef("")

    useEffect(()=>{loading?console.log("Loading..."):dispatch(insert({arr:data}))},[data])
    const postArr=useSelector((myStore)=>myStore.postSlice.postArr)

    const [open, setOpen] = React.useState(false);
    const [require, setRequire] = React.useState(true);


    const handleClickOpen = () => {
        setOpen(true);
    };
    const {add}=useHttp()
    const handleClose = () => {
        setOpen(false);
        const newTitle=titleRef.current.value.length?titleRef.current.value:""
        const newBody=bodyRef.current.value.length?bodyRef.current.value:""
       
        add('posts',{title:newTitle,body:newBody},refetch)
        setRequire(true)
    };

    return (
        <>
       <br />
            <Button color="success" variant="contained" onClick={handleClickOpen} startIcon={<PostAddIcon />} sx={{ height: "37px", margin: "5px", backgroundColor: green[600], opacity: "60%"}}>
                Add Post
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create Post</DialogTitle>
                <DialogContent>
                    <TextField
                        required="true"
                        inputRef={titleRef}
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="string"
                        fullWidth
                        variant="standard"
                        onChange={e=>{e.target.value?setRequire(false):setRequire(true)}}
                    />
                    <TextField
                        inputRef={bodyRef}
                        autoFocus
                        margin="dense"
                        id="body"
                        label="Body"
                        type="string"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                   <Button onClick={handleClose} disabled={require}>Save</Button>
                </DialogActions>
            </Dialog>

            {postArr.length ? postArr.map(post => post.title.toLowerCase().includes(find.toLowerCase())&&<div className='card'><PostCard post={post} refetch={refetch} /></div>) : <h1><br />There is no post</h1>}
        </>
    )
}

export default Posts