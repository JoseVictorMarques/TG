import { Button } from '@material-ui/core';


export default function AddDoctor(props) {
    
    function addDoctor(name){

        //setLoading(true);
        try{
          props.contract.methods.addDoctor(name).send( {from: props.accounts[0]} ).on('receipt', function(receipt){ 
            console.log(receipt);
         //   setSuccessOpen(true); 
        //    setLoading(false); 
          }).on('error', function(error, receipt){
       //     setLoading(false);
            console.log(error);
      //      setFailOpen(true);
          })
        }catch(error)
        {
    //      setLoading(false);
          console.log(error);
     //     setFailOpen(true);
        }
        document.getElementById("Doctor Name").value = '';
      }

    return(
        <div>
                <div>
                    <input 
                        id="Doctor Name"
                        className="textinput"
                        placeholder="Doctor Name"/>
                </div>
                <Button 
                    variant="contained"
                    style={{backgroundColor: '#63235A', color: '#FFFFFF', float: 'right', marginRight:'220px', marginTop:'10px'}}
                    onClick={(e)=>addDoctor(document.getElementById('Doctor Name').value)}
                >
                    SUBMIT
                </Button>
            </div>
    )
}