import { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const status = [
    {
        id: 1,
        value: 'APrévoir',
        label: 'A prévoir',
    },
    {
        id: 2,
        value: 'Afaire',
        label: 'A faire',
    },
    {
        id: 3,
        value: 'Fait',
        label: 'Fait',
    }, {
        id: 4,
        value: 'Archivé',
        label: 'Archivé',
    },
];

const folders = [
    {
        id: 1,
        value: 'Tous',
        label: 'Tous',
    },
    {
        id: 2,
        value: 'Adhoc',
        label: 'Adhoc',
    }
    , {
        id: 2,
        value: 'COHEN shirly',
        label: 'COHEN shirly',
    },
];
export default function Filters() {
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedFolder, setSelectedFolder] = useState('');
    return (
        <div
            className="bgm-10 flex items-center"
        >
            <FormControl className="flex w-full sm:w-320 mx-16" variant="outlined">
                <InputLabel style={{ color: '#FFFFFF' }}>Dossiers</InputLabel>
                <Select
                    label="Status"
                    value={selectedFolder}
                    onChange={(e) => setSelectedFolder(e.target.value)}
                >
                    {folders.map((category) => (
                        <MenuItem value={category.value} key={category.id}>
                            {category.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl className="flex w-full sm:w-320 mx-16" variant="outlined">
                <InputLabel style={{ color: '#FFFFFF' }}>Status</InputLabel>
                <Select
                    label="Status"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                >
                    {status.map((category) => (
                        <MenuItem value={category.value} key={category.id}>
                            {category.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}