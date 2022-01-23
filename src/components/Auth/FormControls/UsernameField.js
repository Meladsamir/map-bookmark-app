import TextField from '@mui/material/TextField';
export default function UsernameField(props) {
  const validateUsername = (_username) => {
    let msg = ''
    if (_username === '') {
      msg = 'enter username'
    }
    else if (_username.length < 8 || _username.length > 50) {
      msg = 'The number of letters must be between 8 and 50'
    }
    return msg
  }
  const handleUsernameChange = (val) => {
    props.handleUsernameChange({
      error: validateUsername(val.trim()),
      value: val.trim()
    });
  }
  return (
    <TextField
      margin="normal"
      value={props.username.value}
      required
      fullWidth
      id="username"
      label="Username"
      name="username"
      autoComplete="username"
      error={props.username.error !== ''}
      helperText={props.username.error}
      onChange={(e) => handleUsernameChange(e.target.value)}

    />
  )
}
