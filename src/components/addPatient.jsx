import { Button } from '@material-ui/core'

export default function AddPatient() {

    return(
        <div>
            <div>
                <input 
                className="textinput"
                placeholder="Patient Name"/>
            </div>
            
                <Button 
                    variant="contained"
                    style={{backgroundColor: '#63235A', color: '#FFFFFF', float: 'right', marginRight:'220px', marginTop:'10px'}}
                >
                    SUBMIT
                </Button>
        </div>
    )
}