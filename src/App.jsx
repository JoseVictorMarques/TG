import { useState , useCallback } from 'react';
import { Tabs,Tab,Box } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import AddDoctor from './components/addDoctor';
import AddPatient from './components/addPatient';
import Appointment from './components/appointment';
import DoctorInfo from './components/doctorInfo';
import PatientInfo from './components/patientInfo';


import './App.css'
import Web3 from 'web3';


function TabPanel({ children, value, index }) {
  return <div>{value === index && <Box p={1}>{children}</Box>}</div>;
}

function App() {
  
  // endereço onde a blockchain está rodando
  const providerUrl = 'http://localhost:7545'
  const contract_address = "0x0028EfA58dc667d5B0fB6341D5925e0393F08319"
  const abi = require('./abi.json');

  const [accounts,setAccounts] = useState();
  const [value, setValue] = useState(0);
  
  const [web3, setWeb3] = useState(new Web3(providerUrl));
  const [contract,setContract] = useState(new web3.eth.Contract(abi, contract_address));

 // const [loading,setLoading] = useState(false);
  
  web3.eth.getAccounts().then((out) => { setAccounts(out) });

    
  const handleChange = useCallback((event, newValue) => {
    setValue(newValue);
  }, []);

    
  return (
    <div className="App">
      <header className="App-header">
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
              <AddDoctor contract={contract} accounts={accounts} />
            </TabPanel>
            <TabPanel value={value} index={1} >
              <AddPatient contract={contract} accounts={accounts}/>
            </TabPanel>
            <TabPanel value={value} index={2} >
              <Appointment contract={contract} accounts={accounts}/>
            </TabPanel>
            <TabPanel value={value} index={3} >
              <DoctorInfo contract={contract}/>
            </TabPanel>
            <TabPanel value={value} index={4} >
              <PatientInfo contract={contract}/>
            </TabPanel>
          
          </SwipeableViews>
        </div>
      </header>
    </div>
  )
}

export default App
