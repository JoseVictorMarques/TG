import {
    Button
  } from '@material-ui/core';

export default function DoctorInfo() {

    return(
        <div>
            <div>
                <input 
                className="textinput"
                placeholder="Doctor ID"/>
            </div>
            
                <Button 
                    variant="contained"
                    style={{backgroundColor: '#63235A', color: '#FFFFFF', float: 'right', marginRight:'220px', marginTop:'10px'}}
                >
                    GET DATA
                </Button>
        </div>
    )
}