import { Button } from '@material-ui/core';


export default function AddDoctor(contract) {
    
    function onSubmit(name){
        contract.methods.addDoctor(name).call();
    }
    return(
        <div>
            <div>
                <input 
                className="textinput"
                placeholder="Doctor Name"/>
            </div>
            
                <Button 
                    variant="contained"
                    style={{backgroundColor: '#63235A', color: '#FFFFFF', float: 'right', marginRight:'220px', marginTop:'10px'}}
                    onClick={(e)=>onSubmit("teste")}
                >
                    SUBMIT
                </Button>
        </div>
    )
}