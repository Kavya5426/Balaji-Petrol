import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    role: '',
  });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
    setStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, role } = credentials;

    const exampleUsers = [
      { username: 'manager', password: 'manager123', role: 'manager' },
      { username: 'admin', password: 'admin123', role: 'admin' },
      { username: 'employee', password: 'employee123', role: 'employee' },
    ];

    const user = exampleUsers.find(
      (user) =>
        user.username === username &&
        user.password === password &&
        user.role === role
    );

    if (user) {
      localStorage.setItem("userType", user.role);
      navigate(`/${user.role}-dashboard`);
    } else {
      alert('Invalid username, password, or role!');
    }
  };

  const handleResetPassword = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      if (newPassword === confirmPassword) {
        alert('Password reset successful!');
        setShowForgotPassword(false);
      } else {
        alert('Passwords do not match!');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="left-section"></div>
      <div className="right-section">
        <h1>Welcome to BHP</h1>
        <div className="form-section">
          <form onSubmit={handleSubmit} className="login-form">
            <h2>Login</h2>
            <label>
              Username:
              <input type="text" name="username" value={credentials.username} onChange={handleInputChange} required />
            </label>
            <label>
              Password:
              <input type="password" name="password" value={credentials.password} onChange={handleInputChange} required />
            </label>
            <label>
              Role:
              <select name="role" value={credentials.role} onChange={handleInputChange} required>
                <option value="">Select Role</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </select>
            
            </label>
            <button  className="forgot-password-btn" onClick={handleForgotPassword}>Forgot Password?</button>
            <button type="submit">Login</button>
            <button type="button" onClick={() => navigate('/create-account')}>Create Account</button>
          </form>
        </div>
      </div>
      {showForgotPassword && (
        <div className="forgot-password-popup">
          <div className="popup-content">
            <h2>Forgot Password</h2>
            {step === 1 && (
              <>
                <label>Email:
                  <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <p>OR</p>
                <label>Phone Number:
                  <input type="text" placeholder="Enter your phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </label>
                <button onClick={handleResetPassword}>Reset Password</button>
              </>
            )}
            {step === 2 && (
              <>
                <label>Enter OTP:
                  <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                </label>
                <button onClick={handleResetPassword}>Verify OTP</button>
              </>
            )}
            {step === 3 && (
              <>
                <label>New Password:
                  <input type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </label>
                <label>Confirm Password:
                  <input type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </label>
                <button onClick={handleResetPassword}>Update Password</button>
              </>
            )}
            <button onClick={() => setShowForgotPassword(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
