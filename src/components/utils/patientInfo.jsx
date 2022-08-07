import { Button } from '@material-ui/core';
import { useState } from 'react'; 

export default function PatientInfo(props) {

    const [totalAppoint,settotalAppoint] = useState(null);
    const [patientName,setPatientName] = useState('');
    const [diagnosis, setDiagnosis] = useState([]);

    function conversionDate(timestamp){
      timestamp = parseInt(timestamp)
      var d = new Date(timestamp);
      let hours = d.getHours()
      if(hours < 10){hours = '0'+hours}
      let minutes = d.getMinutes()
      if(minutes<10){minutes = '0'+minutes} 
      var converted = hours + ":" + minutes + ", " + d.toDateString();
      return converted
    }

    function PatientInfo(patientID){

        var p_id = parseInt(patientID,10);
        if( isNaN(p_id) )
        { 
          console.log("Entrada inválida");
        }else{
          try{
            props.contract.methods.patients(p_id).call().then(function(result){
              console.log(props)
              setPatientName(result.name);
              settotalAppoint(result.totalAppointments);
              if (result.totalAppointments > 0){
                var aux = [];
                for( var i=1; i<= result.totalAppointments;i++){
                  props.contract.methods.diagnosis(p_id, i).call().then(function(result2){
                    var obj = { "code": result2.diagnosis_code, "medicine":result2.medicine_code, 
                    "exam":result2.exam_code, "doctor": result2.doctor_id,"date": conversionDate(result2.timestamp)}
                    aux.push(obj);
                    setDiagnosis(aux);
                  })
                }
              }
            })
          }
          catch(error){
            console.log(error);
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
            <div className="textdiv">{totalAppoint? "Total appointments: "+totalAppoint: null}</div>
            <div className="textdivdetails">{diagnosis.length>0? diagnosis.map((elem)=>JSON.stringify(elem)): null}</div>
        </div>
    )
}