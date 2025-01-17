import { useState , useCallback } from 'react';
import { Tabs,Tab,Box } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import AddDoctor from '../../utils/addDoctor';
import AddPatient from '../../utils/addPatient';
import DoctorInfo from '../../utils/doctorInfo';
import PatientInfo from '../../utils/patientInfo';
import { Link} from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from '@material-ui/core';

function TabPanel({ children, value, index }) {
  return <div>{value === index && <Box p={1}>{children}</Box>}</div>;
}

function Regulator({contract, accounts}) {

    const {rid} = useParams();
    const [value, setValue] = useState(0);
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
                <DoctorInfo contract={contract}/>
              </TabPanel>
              <TabPanel value={value} index={3} >
                <PatientInfo contract={contract}/>
              </TabPanel>
            
            </SwipeableViews>
          </div>
            <Link to="/">
              <Button
              variant="contained"
              style={{backgroundColor: '#63235A', color: '#FFFFFF'}}>Back</Button>
            </Link>
        </header>
      </div>
  );


}

export default Regulator