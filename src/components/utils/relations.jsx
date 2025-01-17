import { Button } from '@material-ui/core';

export default function Relations(props) {


    function relations(doctorID,patientID,authorization,password){

        var d_id = parseInt(doctorID,10);
        var p_id = parseInt(patientID,10);
        var lc_autho = (authorization.toLowerCase() === 'true');
        console.log(props)
        if( isNaN(d_id) || isNaN(p_id) )
        {
            console.log("Entrada inválida");
        }

        else{
            try{
                props.contract.methods.relations(p_id,d_id,lc_autho,password).send( {from: props.accounts[0]} )
            }catch(error){
                console.log(error);
            }
        }
        document.getElementById("Doctor ID").value = '';
        document.getElementById("Patient ID").value = '';
        document.getElementById("Authorization").value = '';
        document.getElementById("PatPass").value = '';
      }

    return(
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
                <input 
                id="PatPass"
                className="textinput"
                type= "password"
                placeholder="Password"/>
            </div>
            <div>
                <input
                id="Authorization"
                className="diagnosis_input"
                placeholder="Authorization (true/false)"
                />
            </div>
            <Button 
                variant="contained"
                style={{backgroundColor: '#63235A', color: '#FFFFFF', float: 'right', marginRight:'220px'}}
                onClick={(e)=>relations(document.getElementById('Doctor ID').value,
                document.getElementById('Patient ID').value,
                document.getElementById('Authorization').value,
                document.getElementById('PatPass').value)}
            >
                SUBMIT
            </Button>
        </div>
    )
}