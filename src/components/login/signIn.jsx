import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useState } from 'react';
import { Redirect } from "react-router-dom";
import './signIn.css'

function SignIn() {
  const [actor, setActor] = useState('');

  const handleChange = (event) => {
    setActor(event.target.value);
  };

  return (
      <div className='SignIn-All'>
        <Box className='Box-Selector'>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Occupation</InputLabel>
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
            {
              actor === 1? <Redirect to="/doctor" />:
              actor === 2? <Redirect to="/patient" />:
              actor === 3? <Redirect to="/regulator" />:
              <Redirect to="/" />
            }
          </Box>
      </div>
  );
}

export default SignIn