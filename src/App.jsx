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
import SignIn from './components/signIn';

  // endereço onde a blockchain está rodando
  const providerUrl = 'http://localhost:7545'
  const contract_address = "0xd017CFf187326Bb412ed309112941a5710Abd1Ae"
  const web3 = new Web3(providerUrl);

  const abi = require('./abi.json');
  const contract = new web3.eth.Contract(abi, contract_address);

  var accounts;
  web3.eth.getAccounts().then((out) => {accounts = out; console.log(accounts);} );

function App() {
  return (
  <Router>
    <Switch>
      <Route path="/regulator">
        <Regulator contract ={contract} accounts ={accounts}/>
      </Route>
      <Route path="/patient">
        <Patient contract ={contract} accounts ={accounts}/>
      </Route>
      <Route path="/doctor">
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
