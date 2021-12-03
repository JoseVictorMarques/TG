import { Button } from '@material-ui/core';

export default function Appointment(props) {


    function addAppointment(doctorID,patientID,diagnosis){

  //      setLoading(true);
        var d_id = parseInt(doctorID,10);
        var p_id = parseInt(patientID,10);
        if( isNaN(d_id) || isNaN(p_id) )
        {
  //        setLoading(false);
   //       setFailOpen(true);
        }
        try{
          props.contract.methods.appointment(d_id,p_id,diagnosis).send( {from: props.accounts[0]} ).on('receipt', function(receipt){ 
            console.log(receipt);
    //        setSuccessOpen(true); 
  //          setLoading(false); 
          }).on('error', function(error, receipt){
 //           setLoading(false);
            console.log(error);
    //        setFailOpen(true);
          })
        }catch(error)
        {
 //         setLoading(false);
          console.log(error);
    //      setFailOpen(true);
        }
        document.getElementById("Doctor ID").value = '';
        document.getElementById("Patient ID").value = '';
        document.getElementById("Diagnosis").value = '';
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
    )
}