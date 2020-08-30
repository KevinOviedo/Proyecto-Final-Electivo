import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import axios from 'axios';
import SignIn from './views/login';
import MenuPrincipal from './views/menuprincipal'

export default function App() {
  const [autorizado, setAutorizado] = useState(false);
  const [remember, setRemember] = useState(false);
  useEffect(() => {

    renderizadoCondicional();

  }, []);

  function renderizadoCondicional() {

    axios
      .post("http://localhost:5000/api/usuario/vigencia1")
      .then(
        (response) => {
          console.log(response.data);
          if (response.status === 200) {
            setAutorizado(true)
     

            let recordar = localStorage.getItem('RECORDAR_APP_TALLER_UBB')
            if (recordar === "remember") {
                setRemember(true);
            }
          }
        }
      )
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 401) {
            setAutorizado(false)
            //   window.location='/login'
     
          }
          console.log(err.response.data.mensaje)
        } else if (err.request) {
          // client never received a response, or request never left
        } else {
          // anything else
        }

      });

  }



  return (

    <Router exact>
      {remember ? <Redirect to="/menu"/> :""}


      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>


        <Route exact path="/menu">
        {autorizado  ? <MenuPrincipal /> : <SignIn />}
        </Route>
        <Route path="/">
          <SignIn />
        </Route>


      </Switch>

    </Router>
  );
}
