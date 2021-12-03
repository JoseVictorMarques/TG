import { Button } from '@material-ui/core';
import { useState } from 'react'; 

export default function DoctorInfo(props) {
    
    const [doctorName,setDoctorName] = useState('');
    const [totalAppoint,settotalAppoint] = useState(null);

    function DoctorInfo(doctorID){
  //      setLoading(true);
        var d_id = parseInt(doctorID,10);
        if( isNaN(d_id) )
        { 
 //         setLoading(false);
//          setFailOpen(true);
        }else{
          try{
            props.contract.methods.doctors(d_id).call().then(function(result){
              setDoctorName(result.name);
              settotalAppoint(result.totalAppointments)
   //           setLoading(false);
            })
          }
          catch(error){
            console.log(error);
 //           setFailOpen(true);
 //           setLoading(false);
          }
        }
      }
    return(
        <div>
            <div>
                <input 
                    id="getDoctorWithID"
                    className="textinput"
                    placeholder="Doctor ID"/>
            </div>
                
            <Button 
                variant="contained"
                style={{backgroundColor: '#63235A', color: '#FFFFFF', float: 'right', marginRight:'220px', marginTop:'10px'}}
                onClick={(e)=>DoctorInfo(document.getElementById('getDoctorWithID').value)}
            >
                GET DATA
            </Button>
            <div className="textdiv" style={{marginTop:"60px"}}>{doctorName ? "Doctor Name: "+doctorName : null}</div>
            <div className="textdiv">{totalAppoint? "Total appointments: "+totalAppoint: null}</div>
        </div>
    )
}