import { Button } from '@material-ui/core';

export default function AddPatient(props) {

    function addPatient(name){

 //       setLoading(true);
        try{
          props.contract.methods.addPatient(name).send( {from: props.accounts[0]} ).on('receipt', function(receipt){ 
            console.log(receipt);
          //  setSuccessOpen(true); 
       //     setLoading(false); 
          }).on('error', function(error, receipt){
       //     setLoading(false);
            console.log(error);
       //     setFailOpen(true);
          })
        }catch(error)
        {
  //        setLoading(false);
          console.log(error);
    //      setFailOpen(true);
        }
        document.getElementById("Patient Name").value = '';
      }


    return(
        <div>
            <div>
                <input 
                    id="Patient Name"
                    className="textinput"
                    placeholder="Patient Name"/>
            </div>
            <Button 
                variant="contained"
                style={{backgroundColor: '#63235A', color: '#FFFFFF', float: 'right', marginRight:'220px', marginTop:'10px'}}
                onClick={(e)=>addPatient(document.getElementById('Patient Name').value)}
            >
                SUBMIT
            </Button>
              </div>
    )
}