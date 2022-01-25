import { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';

const status = [
    {
        id: 1,
        value: 'Actif',
        label: 'Actif',
    },
    {
        id: 2,
        value: 'Inactif',
        label: 'Inactif',
    },
];

const types = [
    {
        id: 1,
        value: 'Client',
        label: 'Client',
    },
    {
        id: 2,
        value: 'Adversaire',
        label: 'Adversaire',
    }, {
        id: 3,
        value: 'Assistante juridique',
        label: 'Assistante juridique',
    }, {
        id: 4,
        value: 'Avocat',
        label: 'Avocat',
    }, {
        id: 5,
        value: 'Expert judiciaire',
        label: 'Expert judiciaire',
    }, {
        id: 6,
        value: 'Expert technique',
        label: 'Expert technique',
    }, {
        id: 7,
        value: 'Huissier',
        label: 'Huissier',
    }, {
        id: 8,
        value: 'Journaliste',
        label: 'Journaliste',
    }, {
        id: 9,
        value: 'Mandataire judiciaire',
        label: 'Mandataire judiciaire',
    }, {
        id: 10,
        value: 'Notaire',
        label: 'Notaire',
    }, {
        id: 11,
        value: 'Prospect',
        label: 'Prospect',
    }, {
        id: 12,
        value: 'Protection juridique',
        label: 'Protection juridique',
    }, {
        id: 13,
        value: 'Relation professionnelle',
        label: 'Relation professionnelle',
    }, {
        id: 14,
        value: 'Autre',
        label: 'Autre',
    },
];

const titles = [{
    id: 1,
    value: 'Association',
    label: 'Association',
}, {
    id: 2,
    value: 'Docteur',
    label: 'Docteur',
}, {
    id: 3,
    value: 'Monsieur',
    label: 'Monsieur',
}, {
    id: 4,
    value: 'M. et Mme',
    label: 'M. et Mme',
}, {
    id: 5,
    value: 'Syndicat des copropriétaires',
    label: 'Syndicat des copropriétaires',
}, {
    id: 6,
    value: 'S.A.R.L',
    label: 'S.A.R.L',
}, {
    id: 7,
    value: 'S.C.I',
    label: 'S.C.I',
}, {
    id: 8,
    value: 'S.A',
    label: 'S.A',
}, {
    id: 9,
    value: 'S.A.S',
    label: 'S.A.S',
}, {
    id: 10,
    value: 'S.A.S.U',
    label: 'S.A.S.U',
}, {
    id: 11,
    value: 'S.C.P.',
    label: 'S.C.P.',
}, {
    id: 12,
    value: 'A.S.L.',
    label: 'A.S.L.',
}, {
    id: 13,
    value: 'Conseil syndical',
    label: 'Conseil syndical',
}, {
    id: 14,
    value: 'Syndic',
    label: 'Syndic',
}, {
    id: 15,
    value: 'Autre',
    label: 'Autre',
}]
export default function Filters() {
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedTitle, setSelectedTitle] = useState('');
    return (
        <div
            style={{ marginTop: 12 }}
            className="bgm-10 flex"
        >
            <FormControl className="flex w-full sm:w-200 mx-16" variant="outlined">
                <InputLabel style={{ color: '#FFFFFF' }}>Type</InputLabel>
                <Select
                    label="Status"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                >
                    <div style={{ height: 300 }}>
                        {types.map((category) => (
                            <MenuItem value={category.value} key={category.id}>
                                {category.label}
                            </MenuItem>
                        ))}
                    </div>
                </Select>
            </FormControl>
            <FormControl className="flex w-full sm:w-200 mx-16" variant="outlined">
                <InputLabel style={{ color: '#FFFFFF' }}>Titre</InputLabel>
                <Select
                    label="Status"
                    value={selectedTitle}
                    onChange={(e) => setSelectedTitle(e.target.value)}
                >
                    <div style={{ height: 300 }}>
                        {titles.map((category) => (
                            <MenuItem value={category.value} key={category.id}>
                                {category.label}
                            </MenuItem>
                        ))}
                    </div>
                </Select>
            </FormControl>
            <FormControl className="flex w-full sm:w-200 mx-16" variant="outlined">
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
            <FormControl className="flex w-full sm:w-200 mx-16" variant="outlined">
                <TextField
                    // {...field}
                    InputLabelProps={{ style: { color: '#FFFFFF' } }}
                    style={{ color: '#FFFFFF' }}
                    className="mb-12"
                    label="Tags"
                    variant="outlined"
                    fullWidth
                />
            </FormControl>
        </div>
    )
}