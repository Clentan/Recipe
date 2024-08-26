import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Name from './Display'; // Import Name component

const UserLogin = () => {
    const [username, setUsername] = useState(''); // State for username (should be a string)
    const [password, setPassword] = useState(''); // State for password
    const [message, setMessage] = useState(''); // State for messages
    const [userInfo, setUserInfo] = useState(null); // State for storing user info
    const [loading, setLoading] = useState(false); // State for loading
    const navigate = useNavigate(); // Hook for navigation

    // Function to handle form submission
    async function handleLogin(e) {
        e.preventDefault();

        if (!username || !password) {
            setMessage('Please fill in both fields.');
            return;
        }

        setLoading(true);

        try {
            // Fetch users from JSON Server
            const response = await fetch('http://localhost:8080/List');
            const users = await response.json(); // Convert response to JSON

            // Find user with matching username and password
            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                const currentTime = new Date().toLocaleTimeString(); // Get the current time
                setMessage('Login successful!');
                setUserInfo({ name: user.username, location: user.location, time: currentTime }); // Store user info with time
                navigate('/'); // Redirect to home page or another route
            } else {
                setMessage('Invalid username or password.Please recheck your details!!');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error logging in.');
        } finally {
            setLoading(false);
        }

        setUsername(''); // Clear username
        setPassword(''); // Clear password
    }

    return (
        <>
            <h1>Login Page 😊</h1>
            <div className='Login_div_form'>
                <form onSubmit={handleLogin} className='Login_form'>
                    <input
                        placeholder='Username'
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} // Update username state
                    />
                    <input
                        placeholder='Password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Update password state
                    />
                    {message && <p className='login_message'>{message}</p>} {/* Display message */}
                    <button className='submitlogin' type='submit' disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button> {/* Submit button */}
                    
                </form>
            </div>
         
        </>
    );
};

export default UserLogin;
