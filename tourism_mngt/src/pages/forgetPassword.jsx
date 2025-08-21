import React, { useEffect,useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [questionId, setQuestionId] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [password, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirm password
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (email) {
      setLoading(true);
      axios.get(`${config.url}/user/security-question?email=${email}`)
        .then(response => {
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching security question:', error);
          setLoading(false);
        });
    }
  }, [email]);

  const handleQuestionChange = (event) => setQuestionId(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const data = {
      email,
      questionId,
      securityAnswer,
      password,
      confirmPassword
    };

   const response =  await axios.post(`${config.url}/user/forget-password`, data)
        if (response.data.status === 'success') {
          toast.success('Your password has been set');
          navigate('/');
        } else {
          toast.error('Failed to set password');
        }
      }
    
    return (
      <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg">
            <div className="card-body">
              <h2 className="text-center font-weight-bold">Forgot Password</h2>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="securityQuestion">Select Security Question</label>
                  <select
                    className="form-control"
                    id="securityQuestion"
                    value={questionId}
                    onChange={handleQuestionChange}
                    required
                    >
                    <option value=''>Select question</option>
                    <option value='1'>What is your favourite sport?</option>
                    <option value='2'>What is your favourite color? </option>
                    <option value='3'>Which is your dream destination?</option>
                    <option value='4'>In which city were you born?</option>
                  </select>
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="securityAnswer">Answer</label>
                  <input
                    type="text"
                    className="form-control"
                    id="securityAnswer"
                    placeholder="Enter your answer"
                    value={securityAnswer}
                    onChange={(e) => setSecurityAnswer(e.target.value)}
                    required
                    />
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    />
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    />
                </div>
                {error && <p className="text-danger text-center">{error}</p>}
                <div className="d-flex justify-content-between mt-4">
                  <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                  <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .card {
          border-radius: 15px;
          height : 600px;
        }
        
        .card-body {
          padding: 2rem;
        }
        
        h2 {
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
        }
        
        .btn-primary {
          background-color: #007bff;
          border: none;
        }
        
        .btn-primary:hover {
          background-color: #0056b3;
        }
        
        .btn-secondary {
          background-color: #6c757d;
          border: none;
        }
        
        .btn-secondary:hover {
          background-color: #5a6268;
        }
        
        .text-danger {
          margin-top: 1rem;
        }
        `}</style>
    </div>
  );
};

// Inline styles for the component
const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    fontSize: '1rem',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  message: {
    color: 'green',
    marginTop: '10px',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
};

export default ResetPassword;
