import { useState , useCallback } from 'react';
import { Tabs,Tab,Box } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import Appointment from '../../utils/appointment';
import DoctorInfo from '../../utils/doctorInfo';
import PatientInfo from '../../utils/patientInfo';



function TabPanel({ children, value, index }) {
  return <div>{value === index && <Box p={1}>{children}</Box>}</div>;
}

function Doctor({contract, accounts}) {

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
                <Appointment contract={contract} accounts={accounts}/>
              </TabPanel>
              <TabPanel value={value} index={1} >
                <DoctorInfo contract={contract}/>
              </TabPanel>
              <TabPanel value={value} index={2} >
                <PatientInfo contract={contract}/>
              </TabPanel>
            
            </SwipeableViews>
          </div>
        </header>
      </div>
  );


}

export default Doctor