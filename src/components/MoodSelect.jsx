import { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Grid, Card, CardMedia } from '@mui/material';
import happyFace from '../assets/happy-face.svg';
import sadFace from '../assets/sad-face.svg';
import angryFace from '../assets/angry-face.svg';
import tiredFace from '../assets/exhausted-face.svg';
import lovedFace from '../assets/loved-face.svg';
import disgustedFace from '../assets/disgusted-face.svg';
import worriedFace from '../assets/worried-face.svg';

const moodOptions = [
    { value: 'happy', label: 'Feliz', image: happyFace },
    { value: 'sad', label: 'Triste', image: sadFace },
    { value: 'angry', label: 'Enojado', image: angryFace },
    { value: 'tired', label: 'Cansado', image: tiredFace },
    { value: 'loved', label: 'Amado', image: lovedFace },
    { value: 'disgusted', label: 'Disgustado', image: disgustedFace },
    { value: 'worried', label: 'Preocupado', image: worriedFace },
];

const MoodSelector = () => {
    const [selectedMood, setSelectedMood] = useState('');

    const handleMoodChange = (event) => {
        setSelectedMood(event.target.value);
    };

    return (
        <Card>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel>Estado de ánimo</InputLabel>
                        <Select
                            value={selectedMood}
                            onChange={handleMoodChange}
                            label="Estado de ánimo"
                        >
                            {moodOptions.map((mood) => (
                                <MenuItem key={mood.value} value={mood.value}>
                                    {mood.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    {selectedMood && (
                        <CardMedia
                            component="img"
                            alt={selectedMood}
                            height="100"
                            image={moodOptions.find((mood) => mood.value === selectedMood)?.image}
                        />
                    )}
                </Grid>
            </Grid>
        </Card>
    );
};

export default MoodSelector;



