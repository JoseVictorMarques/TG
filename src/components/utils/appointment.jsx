import { Button } from '@material-ui/core';

export default function Appointment(props) {


    function addAppointment(patientID,diagnosis,medicine,exam){

        var d_id = parseInt(props.id);
        var p_id = parseInt(patientID);
        var med_code = parseInt(medicine);
        var exam_code = parseInt(exam);
        if( isNaN(d_id) || isNaN(p_id) )
        {
            console.log("Entrada inválida");
        }

        else{
            try{
                var timestamp = new Date().getTime();
                timestamp = parseInt(timestamp);
                props.contract.methods.appointment(d_id,p_id,diagnosis,med_code,exam_code,timestamp).send( {from: props.accounts[0],gas:3000000} )
            }catch(error){
                console.log(error);
            }
        }
        document.getElementById("Patient ID").value = '';
        document.getElementById("Diagnosis").value = '';
        document.getElementById("Medicine").value = '';
        document.getElementById("Exam").value = '';
      }

    return(
        <div>
            <div>
                <input 
                id="Patient ID"
                className="textinput"
                placeholder="Patient ID"/>
            </div>
            <div>
                <input 
                id="Medicine"
                className="textinput"
                placeholder="Medicine"/>
            </div>
            <div>
                <input 
                id="Exam"
                className="textinput"
                placeholder="Exam"/>
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
                onClick={(e)=>addAppointment(document.getElementById('Patient ID').value,
                document.getElementById('Diagnosis').value, document.getElementById('Medicine').value,
                document.getElementById('Exam').value)}>
                SUBMIT
            </Button>
        </div>
    )
}