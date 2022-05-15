import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useState } from 'react';
import { Redirect } from "react-router-dom";
import './signIn.css'
import { Button, Input } from '@material-ui/core';

function SignIn(props) {
  const [actor, setActor] = useState('');
  const [id, setID] = useState(0);
  const [password, setPassword]= useState('');

  const handleChange = (event) => {
    setActor(event.target.value);
  };

  function handleSubmit(ident, pwrd ) {
    var uid = parseInt(ident,10);
    try{
      props.contract.methods.verifyUser(actor, uid, pwrd).send( {from: props.accounts[0], gas:3000000} );
      setID(uid);
      setPassword(pwrd);
    }catch(error)
    {
      console.log(error);
    }


  }


  return (
      <div className='SignIn-All'>
        <Box className='Box-Selector'>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-ocuppation">Occupation</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={actor}
                label="Occupation"
                onChange={handleChange}
              >
                <MenuItem value={1}>Doctor</MenuItem>
                <MenuItem value={2}>Patient</MenuItem>
                <MenuItem value={3}>Regulator</MenuItem>
              </Select>
            </FormControl> 
          </Box>
          <div className='ID-div'>
            <FormControl>
                <InputLabel id="demo-simple-select-id">Id</InputLabel>
                <Input
                id="signin_id"
                type= "text"
                placeholder="type your id here"/>
            </FormControl>
          </div>
          <div className='password-div'>
              <FormControl>
                <InputLabel id="demo-simple-select-password">Password</InputLabel>
                <Input id="signin_password"
                type= "password"
                placeholder="type your password here"/>
              </FormControl>
          </div>
          <Button 
              style={{backgroundColor: '#63235A', color: '#FFFFFF', float: 'right', marginRight:'10vw', marginTop:'10px'}}
              onClick={(e)=>handleSubmit( document.getElementById('signin_id').value, document.getElementById('signin_password').value)}
          >
            Enter
          </Button>
            {
             (  id > 0 && password !== ''&& actor === 1)? <Redirect to= {`/doctor/${id}`} />:
             (id > 0 && password !== ''&& actor === 2)? <Redirect to={`/patient/${id}`}  />:
             ( id > 0 && password !== ''&& actor === 3)? <Redirect to={`/regulator/${id}`}  />:
              <Redirect to="/" /> 
            }
      </div>
  );
}

export default SignIn