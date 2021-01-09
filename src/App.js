
//importando bibliotecas
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {store, persistor} from '../src/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

//importando as telas
import Login from './view/login';
import NewUser from './view/newUser';
import Home from './view/home';
import LostPassword from './view/lostPassword';
import NewPost from './view/newPost'
import PostDetails from './view/postdetails';



function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Route exact path='/login' component={Login}></Route>
          <Route exact path='/' component={Home}></Route>
          <Route path='/posts/:paramentos' component={Home}></Route>
          <Route exact path='/newUser' component={NewUser}></Route>
          <Route exact path='/lostpassword' component={LostPassword}></Route>
          <Route exact path='/newPost' component={NewPost}></Route>
          <Route exact path='/postdetails' component={PostDetails}></Route>
          <Route path='/postdetails/:idPost' component={PostDetails}></Route>
          <Route path='/postedit/:idPost' component={NewPost}></Route>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
