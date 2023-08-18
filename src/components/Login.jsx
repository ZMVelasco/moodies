import { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Tab, Tabs } from '@mui/material';
import { supabase } from '../supabase/supabaseClient';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState(0);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError('');

        try {
            const response = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            console.log('Login response:', response);

            if (response.error) {
                setError(response.error.message);
            } else {
                console.log('Logged in:', response.data.user);
                //TODO: redirect to dashboard
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleMagicLinkLogin = async () => {
        setError('');

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email: email,
                options: {
                    //FIXME: Not redirecting to the right website
                    emailRedirectTo: 'https://moodies-eight.vercel.app/dashboard', 
                },
            });

            if (error) {
                setError(error.message);
            } else {
                console.log('Magic link sent successfully');
            navigate('/dashboard');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Container maxWidth='sm'>
            <Box mt={5}>
                <Tabs value={activeTab} onChange={(event, newValue) => setActiveTab(newValue)}>
                    <Tab label='Login with Password' />
                    <Tab label='Login with OTP' />
                </Tabs>
                {activeTab === 0 && (
                    <div>
                        <TextField
                            label='Email'
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            margin='normal'
                        />
                        <TextField
                            label='Password'
                            type='password'
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            margin='normal'
                        />
                        <Button variant='contained' color='primary' onClick={handleLogin}>
                            Login
                        </Button>
                    </div>
                )}
                {activeTab === 1 && (
                    <div>
                        <TextField
                            label='Email'
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            margin='normal'
                        />
                        <Button
                            variant='contained'
                            color='secondary'
                            onClick={handleMagicLinkLogin}
                        >
                            Log in with Magic Link
                        </Button>
                    </div>
                )}
                {error && (
                    <Typography color='error' variant='body1'>
                        {error}
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default Login;