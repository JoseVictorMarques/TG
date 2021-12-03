import { Button } from '@material-ui/core';
import { useState } from 'react'; 

export default function PatientInfo(props) {

    const [diagnosis,setDiagnosis] = useState('');
    const [patientName,setPatientName] = useState('');

    function PatientInfo(patientID){
  //      setLoading(true);
        var p_id = parseInt(patientID,10);
        if( isNaN(p_id) )
        { 
  //        setLoading(false);
  //        setFailOpen(true);
        }else{
          try{
            props.contract.methods.patients(p_id).call().then(function(result){
              setPatientName(result.name);
              setDiagnosis(result.diagnosis)
   //           setLoading(false);
            })
          }
          catch(error){
            console.log(error);
   //         setFailOpen(true);
    //        setLoading(false);
          }
        }
      }

    return(
        <div>
            <div>
                <input 
                    id="getPatientWithID"
                    className="textinput"
                    placeholder="Patient ID"/>
            </div>
                
            <Button 
                        
                variant="contained"
                style={{backgroundColor: '#63235A', color: '#FFFFFF', float: 'right', marginRight:'220px', marginTop:'10px'}}
                onClick={(e)=>PatientInfo(document.getElementById('getPatientWithID').value)}
            >
                GET DATA
            </Button>
            <div className="textdiv" style={{marginTop:"60px"}}>{patientName ? "Patient Name: "+patientName : null }</div>
            <div className="textdiv" >{diagnosis? "Diagnosis: "+diagnosis: null}</div>
        </div>
    )
}