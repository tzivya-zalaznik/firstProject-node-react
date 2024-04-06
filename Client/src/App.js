import logo from './logo.svg';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom'
import Home from './Component/Home';
import Users from './Component/User/Users';
import Todos from './Component/Todo/Todos';
import Photos from './Component/Photo/Photos';
import Posts from './Component/Post/Posts';
import { configureStore } from '@reduxjs/toolkit';
import postSlice from './Store/PostSlice';
import todoSlice from './Store/TodoSlice';
import { Provider } from 'react-redux';
import NavBar from './Component/NavBar'
import userSlice from './Store/UserSlice';
import { useState } from 'react';

const myStore = configureStore({
  reducer: {
    postSlice,
    todoSlice,
    userSlice
  }
})

function App() {

  const [find, setFind] = useState("")

  return (
    <Provider store={myStore}>
      <div className="App">
        <NavBar setFind={setFind}/>
        <Routes>
          <Route path="/" element={<Home find={find}/>} />
          <Route path="/users" element={<Users find={find}/>} />
          <Route path="/todos" element={<Todos find={find}/>} />
          <Route path="/photos" element={<Photos find={find}/>} />
          <Route path="/posts" element={<Posts find={find}/>} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
