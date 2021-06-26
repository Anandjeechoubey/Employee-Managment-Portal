import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Axios from 'axios';

const teams = [
    {
      value: 'team1',
      label: 'team1',
    },
    {
      value: 'team2',
      label: 'team2',
    },
    {
      value: 'team3',
      label: 'team3',
    },
    {
      value: 'team4',
      label: 'team4',
    },
  ];

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function CreateForm() {
  const classes = useStyles();
  
  const [values, setValues] = React.useState({
    name: '',
    gender: 'male',
    salary: '',
    address: '',
    team: 'team1',
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClick = () => {
        Axios.post('http://localhost:8000/api/employee', values)
        .then(response => console.log(response))
        .catch(err => console.log(err))
  }

    return (
        <div className="form--card">
            <form className={classes.root} noValidate autoComplete="off">
                <TextField fullWidth id="outlined-basic" label="Employee Name" value={values.name} style={{display: 'block'}} onChange={handleChange('name')} variant="outlined" />
                <TextField fullWidth id="outlined-basic" label="Salary" value={values.salary} style={{display: 'block'}} onChange={handleChange('salary')} type="number" variant="outlined" />
                <TextField fullWidth id="outlined-basic" label="Address" value={values.address} style={{display: 'block'}} onChange={handleChange('address')} variant="outlined" />
                <TextField
                    id="outlined-select-team-native"
                    select
                    label="Team"
                    style={{display: 'block'}}
                    value={values.team}
                    onChange={handleChange('team')}
                    fullWidth
                    SelectProps={{
                        native: true,
                    }}
                    variant="outlined"
                >
                    {teams.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup aria-label="gender" name="gender1" value={values.gender} onChange={handleChange('gender')}>
                        <FormControlLabel value="male" control={<Radio color="primary" />} label="Male" />
                        <FormControlLabel value="female" control={<Radio color="primary" />} label="Female" />
                    </RadioGroup>
                </FormControl>
                <Button variant="contained" style={{display: 'block'}} color="primary" onClick={handleClick}>
                    Submit
                </Button>
            </form>
        </div>
    );
}