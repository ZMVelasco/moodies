import { useState } from 'react';
import { Container, Box, TextField, Button, Typography } from "@mui/material";
import { supabase } from '../supabase/supabaseClient';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

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
                    emailRedirectTo: 'https://example.com/welcome', // Replace with your redirect URL
                },
            });

            if (error) {
                setError(error.message);
            } else {
                console.log('Magic link sent successfully');
                // You can provide user feedback here, e.g., show a message
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={5}>
                <TextField
                    label="Email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                />
                <Button variant="contained" color="primary" onClick={handleLogin}>
                    Login
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleMagicLinkLogin}
                >
                    Log in with Magic Link
                </Button>
                {error && (
                    <Typography color="error" variant="body1">
                        {error}
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default Login;