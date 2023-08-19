import { Button } from '@mui/material';
import { supabase } from '../supabase/supabaseClient'; 

const LogoutButton = () => {
    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (!error) {
                console.log('Logged out successfully');
            } else {
                console.error('Logout error:', error.message);
            }
        } catch (error) {
            console.error('Logout error:', error.message);
        }
    };

    return (
        <Button variant="contained" color="primary" onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default LogoutButton;