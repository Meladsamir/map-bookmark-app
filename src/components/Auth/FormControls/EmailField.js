import TextField from '@mui/material/TextField';
import { email_regex } from '../../../util/helper';
export default function EmailField(props) {
  const validateEmail = (_email) => {
    let msg = ''
    if (_email === '') {
      msg = 'enter email'
    }
    else if (email_regex.test(_email) === false) {
      msg = 'invalid email'
    }
    return msg
  }
  const handleEmailChange = (val) => {
    props.handleEmailChange({
      error: validateEmail(val),
      value: val
    });
  }
  return (
    <TextField
      margin="normal"
      value={props.email.value}
      required
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      autoComplete="email"
      error={props.email.error !== ''}
      helperText={props.email.error}
      autoFocus
      onChange={(e) => handleEmailChange(e.target.value)}

    />
  )
}
