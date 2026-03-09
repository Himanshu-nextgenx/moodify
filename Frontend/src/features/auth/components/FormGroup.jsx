

const FormGroup = ({label ,type, placeholder , value ,onChange}) => {
  return (
   <div className="form-group">
    <label htmlFor={label}>{label}</label>
    <input value={value}  onChange={onChange} type={type} id={label} placeholder={placeholder} />
   </div>
  )
}

export default FormGroup
