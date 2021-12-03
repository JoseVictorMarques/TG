import {
    Button
  } from '@material-ui/core';

export default function Appointment() {

    return(
        <div>
            <div>
                <input 
                className="textinput"
                placeholder="Doctor ID"/>
            </div>
            <div>
                <input 
                    className="textinput"
                    placeholder="Patient ID"/>
            </div>
            <div>
            <textarea 
                className="diagnosis_input"
                placeholder="Diagnosis"/>
            </div>
                <Button 
                    variant="contained"
                    style={{backgroundColor: '#63235A', color: '#FFFFFF', float: 'right', marginRight:'220px'}}
                >
                    SUBMIT
                </Button>
        </div>
       
    )
}