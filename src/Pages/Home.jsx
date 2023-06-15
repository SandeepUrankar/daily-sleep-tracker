import React from 'react'
import './Home.css'
import Button from '@mui/material/Button';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AddIcon from '@mui/icons-material/Add';
const Home = () => {
  return (
    <>
        <div className='main'>
            <div className='container'>
                <p className='title'>Daily Sleep Tracker</p>

                <div className='add-btn'>
                   <div> <Button variant="contained" className="new-btn" startIcon={<AddIcon fontSize="large" />} sx={{
                    backgroundColor:'#5795FA', borderRadius: 50 }}>New Entry</Button></div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Home