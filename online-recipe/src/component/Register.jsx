import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState(''); 
    const [credentials, setCredentials] = useState('');
    const [password, setPassword] = useState(''); 
    const [confirm_password, setConfirm_password] = useState(''); 
    const [message, setMessage] = useState(''); 
    const [close, setClose] = useState(false); 
    const [formSubmitted, setFormSubmitted] = useState(false); 
    const navigate = useNavigate(); 


    useEffect(() => {
        if (!formSubmitted) return; // Only run if form has been submitted

        async function registerUser() {
            // Check if passwords match
            if (password !== confirm_password) {
                setMessage("Oppps your password does not match 😂😂😂"); // Set error message
                setClose(true); // Show the message and the close button
                return; // Stop function execution
            }

            const UserLogin = { // Create new user object
                username,
                credentials,
                password,
                confirm_password,
                completed: false,
            };

            try {
                const response = await fetch('http://localhost:8080/List', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(UserLogin), // Convert user object to JSON
                });

                if (response.ok) {
                    setMessage('Registration successful!'); // Set success message
                    navigate('/Login'); // Redirect to login page
                } else {
                    throw new Error('Failed to register'); // Throw error if response is not ok
                }
            } catch (error) {
                console.error('Error:', error); // Log error
                setMessage('Error registering user.'); // Set error message
            } finally {
                setFormSubmitted(false); // Reset form submission status
            }
        }

        registerUser(); // Call function to register user
    }, [formSubmitted, password, confirm_password, credentials, username, navigate]); // Dependencies

    // Function to handle form submission
    function handleFormSubmit(e) {
        e.preventDefault(); // Prevent default form submission
        setFormSubmitted(true); // Set form submission status
        if(!credentials||!username||!password)return;
    }

    // Function to close the message
    function CloseTab() {
        setClose(false); // Hide the message and the close button
    }

    return (
        <div>
            <form className='form_register' onSubmit={handleFormSubmit}>
                <fieldset>
                    <legend>Register</legend>
                    <label>Username:</label>
                    <input  
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} // Update username state
                        type="text" 
                        name="username" 
                        placeholder="Enter your username"
                    />
                    <br />
                    <label>Credential:</label>
                    <input 
                        value={credentials}
                        onChange={(e) => setCredentials(e.target.value)} // Update credentials state
                        type="text" 
                        name="credentials" 
                        placeholder="Enter your credential for login"
                    />
                    <br />
                    <label>Password:</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Update password state
                        type="password" 
                        name="password" 
                        placeholder="Enter your password"
                    />
                    <br />
                    <label>Confirm Password:</label>
                    <input 
                        value={confirm_password}
                        onChange={(e) => setConfirm_password(e.target.value)} // Update confirm_password state
                        type="password" 
                        name="confirm_password" 
                        placeholder="Confirm your password"
                    />
                    <br />
                    <button className='handleFormSubmi' type="submit">Submit</button> {/* Submit button */}
                </fieldset>
            </form>

            {close && (
                <div className='message' style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <p style={{ marginRight: '10px' }}>{message}</p>
                    <button className='SubmitForm' onClick={CloseTab}>✖️</button> {/* Close button */}
                </div>
            )}
        </div>
    );
}

export default Register;
