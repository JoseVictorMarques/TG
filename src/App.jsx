/*import { useState , useCallback } from 'react';
import { Tabs,Tab,Box } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import AddDoctor from './components/addDoctor';
import AddPatient from './components/addPatient';
import Authorization from './components/relations';
import Appointment from './components/appointment';
import DoctorInfo from './components/doctorInfo';
import PatientInfo from './components/patientInfo';*/
import './App.css'
import Web3 from 'web3';


import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Doctor from './components/actors/doctor/doctor';
import Patient from './components/actors/patient/patient';
import Regulator from './components/actors/regulator/regulator';
import SignIn from './components/login/signIn';
import { useEffect, useState } from 'react';

  // endereço onde a blockchain está rodando
  const providerUrl = 'http://localhost:7545'
  const contract_address = "0x9eFECf6c97684d9450804a097181F23b4Df9D685"
  const web3 = new Web3(providerUrl);

  const abi = require('./abi.json');
  const contract = new web3.eth.Contract(abi, contract_address);


function App() {

  const [accounts, setAccounts] = useState([]);
  //web3.eth.getAccounts().then((out) => {accounts = out; console.log(accounts);} );
  useEffect(() => {
    // Atualiza o título do documento usando a API do browser
    web3.eth.getAccounts().then((out) => {setAccounts(out); } );

  },);

  return (
  <Router>
    <Switch >
      <Route path="/regulator/:rid">
        <Regulator contract ={contract} accounts ={accounts}/>
      </Route>
      <Route path="/patient/:pid">
        <Patient contract ={contract} accounts ={accounts}/>
      </Route>
      <Route path="/doctor/:did">
        <Doctor contract ={contract} accounts ={accounts}/>
      </Route>
      <Route path="/">
        <SignIn contract ={contract} accounts ={accounts}/>
      </Route>
    </Switch>
  </Router>
  );
}

export default App
