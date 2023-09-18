import './button.styles.scss'

const BUTTON_TYPE_CLASSES = {
  google: 'google-sign-in', 
  inverted: 'inverted'
}

const Button = ({children, buttontype, ...otherPorps}) => {
  return (
    <button className={`button-container ${BUTTON_TYPE_CLASSES[buttontype]}`} {...otherPorps}>{children}</button>
  )
}

export default Button 