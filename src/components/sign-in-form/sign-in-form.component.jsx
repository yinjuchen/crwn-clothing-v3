import { useState } from "react";
import { 
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';
import Button from "../button/button.component";

const defaultFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
 
  const signInWithGoogle = async() => {
    await signInWithGooglePopup()
  }

  const [formFields, setFormFields] = useState(defaultFields)
  const {email, password} = formFields
  // console.log(formFields)

  const resetFormFields = () => {
    setFormFields(defaultFields)
  }

  const handleSubmit = async(event) => {
    event.preventDefault()
    

    try {
       await signInAuthUserWithEmailAndPassword(email, password)
      resetFormFields()
    
    } catch(error) {
      switch(error.code) {
        case'auth/wrong-password':
        alert('incorrect password for email')
        break
        case'auth/user-not-found':
        alert('no user associated with this email')
        break
        default:
        console.log(error)
      }
   }
 }

  const handleChange = (event) => {
    const {name, value} = event.target
    setFormFields({...formFields,[name]:value})
  }

  return(
    <div className="sign-in-form-container">
      <h2>Already have an account?</h2>
      <span>Sign In with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          required 
          type="email" 
          onChange={handleChange} 
          name="email" 
          value={email}
        />

        <FormInput
          label='Password'
          required 
          type="password" 
          onChange={handleChange} 
          name="password" 
          value={password}
        />

        <div className="buttons-container">
            <Button type="submit">Sign In </Button>
            <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm