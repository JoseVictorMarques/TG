import { useState , useCallback } from 'react'
import { Button,Tabs,Tab,Box,  Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab'
import Loader from "react-loader-spinner";
import SwipeableViews from 'react-swipeable-views';

import './App.css'
import Web3 from 'web3';


function TabPanel({ children, value, index }) {
  return <div>{value === index && <Box p={1}>{children}</Box>}</div>;
}

function App() {
  // endereço onde a blockchain está rodando
  const providerUrl = 'http://localhost:7545'
  const contract_address = "0xD530fEb15018f61b47B64A7874428A5716d3D104"

  const [accounts,setAccounts] = useState();
  const [successopen, setSuccessOpen] = useState(false);
  const [failopen, setFailOpen] = useState(false);
  const [loading,setLoading] = useState(false);
  const [diagnosis,setDiagnosis] = useState('');
  const [patientName,setPatientName] = useState('');
  const [doctorName,setDoctorName] = useState('');
  const [totalAppoint,settotalAppoint] = useState(null);


  const web3 = new Web3(providerUrl);
  web3.eth.getAccounts().then((out) => { setAccounts(out) });

  const abi = require('./abi.json');

  const contract = new web3.eth.Contract(abi, contract_address);

  const [value, setValue] = useState(0);

  const handleChange = useCallback((event, newValue) => {
    setValue(newValue);
  }, []);

  const handleClose = () => {
    setSuccessOpen(false);
    setFailOpen(false);
  };

  function addDoctor(name){

    setLoading(true);
    try{
      contract.methods.addDoctor(name).send( {from: accounts[0]} ).on('receipt', function(receipt){ 
        console.log(receipt);
        setSuccessOpen(true); 
        setLoading(false); 
      }).on('error', function(error, receipt){
        setLoading(false);
        console.log(error);
        setFailOpen(true);
      })
    }catch(error)
    {
      setLoading(false);
      console.log(error);
      setFailOpen(true);
    }
    document.getElementById("Doctor Name").value = '';
  }
  function addPatient(name){

    setLoading(true);
    try{
      contract.methods.addPatient(name).send( {from: accounts[0]} ).on('receipt', function(receipt){ 
        console.log(receipt);
        setSuccessOpen(true); 
        setLoading(false); 
      }).on('error', function(error, receipt){
        setLoading(false);
        console.log(error);
        setFailOpen(true);
      })
    }catch(error)
    {
      setLoading(false);
      console.log(error);
      setFailOpen(true);
    }
    document.getElementById("Patient Name").value = '';
  }
  function addAppointment(doctorID,patientID,diagnosis){

    setLoading(true);
    var d_id = parseInt(doctorID,10);
    var p_id = parseInt(patientID,10);
    if( isNaN(d_id) || isNaN(p_id) )
    {
      setLoading(false);
      setFailOpen(true);
    }
    try{
      contract.methods.appointment(d_id,p_id,diagnosis).send( {from: accounts[0]} ).on('receipt', function(receipt){ 
        console.log(receipt);
        setSuccessOpen(true); 
        setLoading(false); 
      }).on('error', function(error, receipt){
        setLoading(false);
        console.log(error);
        setFailOpen(true);
      })
    }catch(error)
    {
      setLoading(false);
      console.log(error);
      setFailOpen(true);
    }
    document.getElementById("Doctor ID").value = '';
    document.getElementById("Patient ID").value = '';
    document.getElementById("Diagnosis").value = '';
  }
  function DoctorInfo(doctorID){
    setLoading(true);
    var d_id = parseInt(doctorID,10);
    if( isNaN(d_id) )
    { 
      setLoading(false);
      setFailOpen(true);
    }else{
      try{
        contract.methods.doctors(d_id).call().then(function(result){
          setDoctorName(result.name);
          settotalAppoint(result.totalAppointments)
          setLoading(false);
        })
      }
      catch(error){
        console.log(error);
        setFailOpen(true);
        setLoading(false);
      }
    }
  }
  function PatientInfo(patientID){
    setLoading(true);
    var p_id = parseInt(patientID,10);
    if( isNaN(p_id) )
    { 
      setLoading(false);
      setFailOpen(true);
    }else{
      try{
        contract.methods.patients(p_id).call().then(function(result){
          setPatientName(result.name);
          setDiagnosis(result.diagnosis)
          setLoading(false);
        })
      }
      catch(error){
        console.log(error);
        setFailOpen(true);
        setLoading(false);
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {loading ? <div className="loading_container">
                    <Loader 
                        style={{marginTop: "110px"}} 
                        type="Oval" 
                        color="#63235A"
                        height={180} width={180}
                        />
                    </div> : null
          }
        <div className="container">
          <Tabs
            value={value}
            onChange={handleChange}
            TabIndicatorProps={{style: {backgroundColor:"#63235A"}}}
            textColor='primary'
            variant='fullWidth'
          >
            <Tab label={"Add doctor"} style={{color:"#63235A"}}/>
            <Tab label={"Add pacient"} style={{color:"#63235A"}}/>
            <Tab label={"Appointment"} style={{color:"#63235A"}}/>
            <Tab label={"Doctor info"} style={{color:"#63235A"}}/>
            <Tab label={"Pacient info"} style={{color:"#63235A"}}/>
          </Tabs>

          <div className="logo_text">MedRecords</div>
          <SwipeableViews
            onSwitching={(v) => setValue(v)}
            index={value}
          >
    
            <TabPanel value={value} index={0} >
              <div>
                <div>
                    <input 
                    id="Doctor Name"
                    className="textinput"
                    placeholder="Doctor Name"/>
                </div>
                
                    <Button 
                        variant="contained"
                        style={{backgroundColor: '#63235A', color: '#FFFFFF', float: 'right', marginRight:'220px', marginTop:'10px'}}
                        onClick={(e)=>addDoctor(document.getElementById('Doctor Name').value)}
                    >
                        SUBMIT
                    </Button>
            </div>
            </TabPanel>
            <TabPanel value={value} index={1} >
              <div>
                <div>
                    <input 
                    id="Patient Name"
                    className="textinput"
                    placeholder="Patient Name"/>
                </div>
                    <Button 
                        variant="contained"
                        style={{backgroundColor: '#63235A', color: '#FFFFFF', float: 'right', marginRight:'220px', marginTop:'10px'}}
                        onClick={(e)=>addPatient(document.getElementById('Patient Name').value)}
                    >
                        SUBMIT
                    </Button>
              </div>
            </TabPanel>
            <TabPanel value={value} index={2} >
              <div>
                <div>
                    <input 
                      id="Doctor ID"
                      className="textinput"
                      placeholder="Doctor ID"/>
                </div>
                <div>
                    <input 
                      id="Patient ID"
                      className="textinput"
                      placeholder="Patient ID"/>
                </div>
                <div>
                <textarea 
                    id="Diagnosis"
                    className="diagnosis_input"
                    placeholder="Diagnosis"/>
                </div>
                    <Button 
                        variant="contained"
                        style={{backgroundColor: '#63235A', color: '#FFFFFF', float: 'right', marginRight:'220px'}}
                        onClick={(e)=>addAppointment(document.getElementById('Doctor ID').value,document.getElementById('Patient ID').value,document.getElementById('Diagnosis').value)}
                    >
                        SUBMIT
                    </Button>
                </div>
            </TabPanel>
            <TabPanel value={value} index={3} >
              <div>
                <div>
                    <input 
                      id="getDoctorWithID"
                      className="textinput"
                      placeholder="Doctor ID"/>
                </div>
                
                    <Button 
                        variant="contained"
                        style={{backgroundColor: '#63235A', color: '#FFFFFF', float: 'right', marginRight:'220px', marginTop:'10px'}}
                        onClick={(e)=>DoctorInfo(document.getElementById('getDoctorWithID').value)}
                    >
                        GET DATA
                    </Button>
                    <div className="textdiv" style={{marginTop:"60px"}}>{doctorName ? "Doctor Name: "+doctorName : null}</div>
                    <div className="textdiv">{totalAppoint? "Total appointments: "+totalAppoint: null}</div>
                </div>
            </TabPanel>
            <TabPanel value={value} index={4} >
              <div>
                <div>
                    <input 
                      id="getPatientWithID"
                      className="textinput"
                      placeholder="Patient ID"/>
                </div>
                
                    <Button 
                        
                        variant="contained"
                        style={{backgroundColor: '#63235A', color: '#FFFFFF', float: 'right', marginRight:'220px', marginTop:'10px'}}
                        onClick={(e)=>PatientInfo(document.getElementById('getPatientWithID').value)}
                    >
                        GET DATA
                    </Button>
                    <div className="textdiv" style={{marginTop:"60px"}}>{patientName ? "Patient Name: "+patientName : null }</div>
                    <div className="textdiv" >{diagnosis? "Diagnosis: "+diagnosis: null}</div>
                </div>
            </TabPanel>
          
          </SwipeableViews>
          <Snackbar open={successopen} autoHideDuration={4500} onClose={handleClose}>
            <Alert  onClose={handleClose} className="alert" severity="success" variant="filled" sx={{ width: '100%' }}>
              Operação realizada com sucesso!
            </Alert>
          </Snackbar>
          <Snackbar open={failopen} autoHideDuration={4500} onClose={handleClose}>
            <Alert  onClose={handleClose} className="alert" severity="error" variant="filled" sx={{ width: '100%' }}>
              Erro ao realizar a operação
            </Alert>
          </Snackbar>
        </div>
      </header>
    </div>
  )
}

export default App
