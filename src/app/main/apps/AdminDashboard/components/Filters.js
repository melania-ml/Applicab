import { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Autocomplete, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export default function Filters() {
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedFolder, setSelectedFolder] = useState('');
    return (
      <div className="bgm-10 flex items-center">
           <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
        >
          <Typography
            color="inherit"
            className="text-32 sm:text-56 font-bold tracking-tight"
          >
            Mon espace client
          </Typography>
        </motion.div>
       
      </div>
    );
}