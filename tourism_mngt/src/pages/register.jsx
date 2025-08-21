import { useState } from 'react';
import image from '../Images/image.jpg';
import { useNavigate } from 'react-router-dom';
import { register } from "../services/user";
import { toast } from 'react-toastify';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [securityQuestionId, setSecurityQuestionId] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');

  const inputStyle = {
    width: '100%',
    maxWidth: '400px',
    margin: '10px 0',
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '100%',
    minHeight: '100vh',
    background: `url(${image}) no-repeat center center fixed`,
    backgroundSize: 'cover',
  };

  const formContainerStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '90%',
    maxWidth: '500px',
    marginBottom: '30px'
  };

  const labelStyle = {
    fontWeight: 'bold',
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  };

  const buttonStyle = {
    margin: '0 10px',
  };

  const headingStyle = {
    fontWeight: 'bold',
    fontSize: '30px',
  };

  const navigate = useNavigate();

  const onCancel = () => {
    navigate('/');
  };

  const isValidEmail = () => {
    return email.includes('@');
  };

  const handleFirstName = (event) => setFirstName(event.target.value);
  const handleLastName = (event) => setLastName(event.target.value);
  const handleEmail = (event) => setEmail(event.target.value);
  const handlePhone = (event) => setPhoneNumber(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);
  const handleConfirmPassword = (event) => setConfirmPassword(event.target.value);
  const handleQuestionChange = (event) => setSecurityQuestionId(event.target.value);
  const handleAnswerChange = (event) => setSecurityAnswer(event.target.value);

  const onSubmitting = (event) => event.preventDefault();

  const onRegister = async () => {
    console.log('onRegister');

    if (firstName.length === 0) {
      toast.warning('Enter first name');
    } else if (lastName.length === 0) {
      toast.warning('Enter last name');
    } else if (email.length === 0) {
      toast.warning('Enter email');
    } else if (!isValidEmail()) {
      toast.warning('Email is not valid');
    } else if (phoneNumber.length === 0) {
      toast.warning('Enter phone number');
    } else if (password.length === 0) {
      toast.warning('Enter password');
    } else if (confirmPassword.length === 0) {
      toast.warning('Confirm password');
    } else if (password !== confirmPassword) {
      toast.warning('Passwords do not match');
    } else if (securityAnswer.length === 0) {
      toast.warning('Enter security answer');
    } else {
      const result = await register(firstName, lastName, email, phoneNumber, password, confirmPassword, securityQuestionId, securityAnswer);
      console.log(result);
      if (result.status === 'success') {
        toast.success('You are successfully registered');
        navigate('/');
      } else {
        toast.error('Failed to register the user');
      }
    }
  };

  return (
    <div style={containerStyle}>
      <br />
      <div><h2 style={headingStyle}>Registration Page</h2></div>
      <br />
      <form style={formContainerStyle} onSubmit={onSubmitting}>
        <div className='mb-3'>
          <label htmlFor='Name' style={labelStyle}>First Name :</label>
          <input type='text' className='form-control' id='name' placeholder="e.g Suresh" 
            style={inputStyle} onChange={handleFirstName} required />
        </div>

        <div className='mb-3'>
          <label htmlFor='Name' style={labelStyle}>Last Name :</label>
          <input type='text' className='form-control' id='name' placeholder="e.g Suresh" 
            style={inputStyle} onChange={handleLastName} required />
        </div>

        <div className='mb-3'>
          <label htmlFor='Email' style={labelStyle}>Email :</label>
          <input type='email' className='form-control' id='Email' placeholder="abc@gmail.com" 
            style={inputStyle} onChange={handleEmail} required />
        </div>

        <div className='mb-3'>
          <label htmlFor='Password' style={labelStyle}>Password :</label>
          <input type='password' className='form-control' id='password' placeholder="******" 
            style={inputStyle} onChange={handlePassword} required minLength={8} />
          <small style={{ color: 'black' }}>Password must be at least 8 characters long.</small>
        </div>

        <div className='mb-3'>
          <label htmlFor='Password' style={labelStyle}>Confirm Password :</label>
          <input type='password' className='form-control' id='confirm-password' placeholder="******" 
            style={inputStyle} onChange={handleConfirmPassword} required minLength={8} />
          <small style={{ color: 'black' }}>Password must be at least 8 characters long.</small>
        </div>

        <div className='mb-3'>
          <label htmlFor='Phone' style={labelStyle}>Phone :</label>
          <input type='number' className='form-control' id='phoneNumber' placeholder="Phone" 
            style={inputStyle} onChange={handlePhone} required pattern="\d{10}" />
        </div>

        <div className='mb-3'>
          <label htmlFor='Security question' style={labelStyle}>Security Question :</label>
          <select id='security_ques' className='form-control' style={inputStyle} 
                value={securityQuestionId} onChange={handleQuestionChange} required>
            <option value=''>Select question</option>
            <option value='1'>What is your favourite sport?</option>
            <option value='2'>What is your favourite color? </option>
            <option value='3'>Which is your dream destination?</option>
            <option value='4'>In which city were you born?</option>
          </select>

          <label htmlFor='Security answer' style={labelStyle}>Security Answer :</label>
          <input type='text' className='form-control' id='Answer' placeholder="Give your answer" 
            style={inputStyle} onChange={handleAnswerChange} required />
        </div>

        <div style={buttonContainerStyle}>
          <button type='submit' className='btn btn-success' style={buttonStyle} onClick={onRegister}>Register</button>
          <button type='button' className='btn btn-secondary' style={buttonStyle} onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
