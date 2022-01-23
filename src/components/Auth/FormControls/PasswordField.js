import TextField from '@mui/material/TextField';

export default function PasswordField(props){

    const validatePassword=(_Password)=>{
        let msg=''
          if(_Password===''){
            msg='enter password'
          }
          else if(_Password.length<8 ||_Password.length>100){
            msg='password must be btween 8 and 100 characters'  
          }
      return msg
      }

  const handlePasswordChange=(val)=>{
    props.handlePasswordChange({
      error: validatePassword(val),
      value: val
    });
  }
    return(
<TextField
margin="normal"
value={props.password.value}
required
fullWidth
name="password"
label="Password"
type="password"
id="password"
autoComplete="current-password"
error={props.password.error!==''}
helperText={props.password.error}
onChange={(e) => handlePasswordChange(e.target.value)}
/>

    )
}
