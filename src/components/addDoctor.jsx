import { Button } from '@material-ui/core';


export default function AddDoctor(props) {

    function addDoctor(name, specialty){

        try{
          props.contract.methods.addDoctor(name).send( {from: props.accounts[0]} )
  
        }catch(error)
        {
          console.log(error);
        }
        document.getElementById("Doctor Name").value = '';
        document.getElementById("Doctor Specialty").value = '';
      }

    return(
        <div>
                <div>
                    <input 
                        id="Doctor Name"
                        className="textinput"
                        placeholder="Doctor Name"/>
                    <input 
                        id="Doctor Specialty"
                        className="textinput"
                        placeholder="Doctor Specialty"/>
                </div>
                <Button 
                    variant="contained"
                    style={{backgroundColor: '#63235A', color: '#FFFFFF', float: 'right', marginRight:'220px', marginTop:'10px'}}
                    onClick={(e)=>addDoctor(document.getElementById('Doctor Name').value, document.getElementById('Doctor Specialty').value)}
                >
                    SUBMIT
                </Button>
            </div>
    )
}