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

export default function CreateForm({ match }) {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        name: '',
        gender: 'male',
        salary: '',
        address: '',
        team: 'team1',
    });

    React.useEffect(() => {
        // GET request using axios inside useEffect React hook
        Axios.get('http://localhost:8000/api/employee/' + match.params.id)
            .then(response => setValues({
                name: response.data.name,
                gender: response.data.gender,
                salary: response.data.salary,
                address: response.data.address,
                team: response.data.team,
            }));

        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = () => {
        console.log({ name: values.name, salary: values.salary, address: values.address, team: values.team, gender: values.gender });
        Axios.put('http://localhost:8000/api/employee/' + match.params.id, { name: values.name, salary: values.salary, address: values.address, team: values.team, gender: values.gender })
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }

    return (
        <div className="form--card">
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField fullWidth id="outlined-basic" label="Employee Name" value={values.name} style={{ display: 'block' }} onChange={handleChange('name')} variant="outlined" />
                <TextField fullWidth id="outlined-basic" label="Salary" value={values.salary} style={{ display: 'block' }} onChange={handleChange('salary')} type="number" variant="outlined" />
                <TextField fullWidth id="outlined-basic" label="Address" value={values.address} style={{ display: 'block' }} onChange={handleChange('address')} variant="outlined" />
                <TextField
                    id="outlined-select-team-native"
                    select
                    label="Team"
                    style={{ display: 'block' }}
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
                <Button variant="contained" style={{ display: 'block' }} color="primary" type='submit'>
                    Submit
                </Button>
            </form>
        </div>
    );
}