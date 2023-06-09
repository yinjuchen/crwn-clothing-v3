import { useState } from "react"
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss';
import Button from "../button/button.component";

const defaultFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFields)
  const {displayName, email, password, confirmPassword} = formFields
  // console.log(formFields)
  

  const resetFormFields = () => {
    setFormFields(defaultFields)
  }
  const handleSubmit = async(event) => {
    event.preventDefault()

    if(password !== confirmPassword) {
      alert('password do not match')
      return
    }
    try {
      const {user} = await createAuthUserWithEmailAndPassword(email,password)
      await createUserDocumentFromAuth(user, {displayName})
      resetFormFields()

    } catch(error) {
       if(error.code === 'auth/email-already-in-use') {
         alert('Cannot create user, email already in use')
    } else {
      console.log('auth/email-already-in-use', error.message)
    }
   }
 }

  const handleChange = (event) => {
    const {name, value} = event.target
    setFormFields({...formFields,[name]:value})
  }


  return(
    <div className="sign-up-form-container">
      <h2>Do not have an account?</h2>
      <span>Sign Up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput 
          label='DisplayName'
          required 
          type="text" 
          onChange={handleChange} 
          name="displayName" 
          value={displayName}
        />

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

        <FormInput
          label='Confirm Password'
          required 
          type="password" 
          onChange={handleChange} 
          name="confirmPassword" 
          value={confirmPassword}
        />
        <Button type="submit">Sign Up </Button>

      </form>
    </div>
  )
}

export default SignUpForm