
import { useState } from 'react'
import {
    TextField,
    FormControl,
    MenuItem,
    InputLabel,
    Select,
    Autocomplete,
    InputAdornment,
    Chip
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import Countries from '../../../../constants/Countries';

const defaultValues = {
    id: "",
    name: "",
    lastName: "",
    avatar: "assets/images/avatars/profile.jpg",
    nickname: "",
    company: "",
    jobTitle: "",
    email: "",
    phone: "",
    address: "",
    birthday: "",
    notes: "",
};

const tags = []
const titles = [
    {
        id: 1,
        value: "Association",
        label: "Association",
    },
    {
        id: 2,
        value: "Docteur",
        label: "Docteur",
    },
    {
        id: 3,
        value: "Monsieur",
        label: "Monsieur",
    },
    {
        id: 4,
        value: "M. et Mme",
        label: "M. et Mme",
    },
    {
        id: 5,
        value: "Syndicat des copropriétaires",
        label: "Syndicat des copropriétaires",
    },
    {
        id: 6,
        value: "S.A.R.L",
        label: "S.A.R.L",
    },
    {
        id: 7,
        value: "S.C.I",
        label: "S.C.I",
    },
    {
        id: 8,
        value: "S.A",
        label: "S.A",
    },
    {
        id: 9,
        value: "S.A.S",
        label: "S.A.S",
    },
    {
        id: 10,
        value: "S.A.S.U",
        label: "S.A.S.U",
    },
    {
        id: 11,
        value: "S.C.P.",
        label: "S.C.P.",
    },
    {
        id: 12,
        value: "A.S.L.",
        label: "A.S.L.",
    },
    {
        id: 13,
        value: "Conseil syndical",
        label: "Conseil syndical",
    },
    {
        id: 14,
        value: "Syndic",
        label: "Syndic",
    },
    {
        id: 15,
        value: "Autre",
        label: "Autre",
    },
];

const pays = [
    {
        id: 1,
        value: "India",
        label: "India",
    },
];

const status = [{
    id: 1,
    value: "Actif",
    label: "Actif",
}, {
    id: 2,
    value: "Inactif",
    label: "Inactif",
},]

const countries = Countries

const schema = yup.object().shape({
    companyName: yup.string().required("You must enter a companyName"),
});

export default function EnterpriceFields() {
    const [selectedTitle, setSelectedTitle] = useState("");
    const [selectedPays, setSelectedPays] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("")
    const [tagValue, setTagValue] = useState([...tags]);

    const { control, watch, reset, handleSubmit, formState, getValues } = useForm(
        {
            mode: "onChange",
            defaultValues,
            resolver: yupResolver(schema),
        }
    );

    return (
        <>
            <Controller
                control={control}
                render={({ field }) => (
                    <FormControl className="flex w-full mb-12" variant="outlined">
                        <InputLabel>Choisissez un titre</InputLabel>
                        <Select
                            label="Choisissez un titre"
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
                )}
            />
            <Controller
                control={control}
                name='companyName'
                render={({ field: { onChange } }) => (
                    <TextField
                        // {...field}
                        className="mb-12"
                        label="Nom de la compagnie"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => onChange(e)}
                    />
                )}
            />
            <Controller
                control={control}
                render={({ field }) => (
                    <Autocomplete
                        className='flex w-full mb-12'
                        disablePortal
                        style={{ color: '#FFFFFF' }}
                        options={Countries}
                        renderInput={(params) =>
                            <TextField {...params} label="Pays" />
                        }
                    />
                )}
            />
            <Controller
                control={control}
                render={({ field }) => (
                    <TextField
                        // {...field}
                        className="mb-12"
                        label="Adresse"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
            <Controller
                control={control}
                render={({ field }) => (
                    <TextField
                        // {...field}
                        className="mb-12"
                        label="Ville"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
            <Controller
                control={control}
                render={({ field }) => (
                    <TextField
                        // {...field}
                        className="mb-12"
                        label="CP"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
            <Controller
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        label="Capital social"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">€</InputAdornment>,
                        }}
                        type="number"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
            <Controller
                control={control}
                render={({ field }) => (
                    <TextField
                        // {...field}
                        className="mt-8 mb-16"
                        label="Immatriculé.e au RCS de"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
            <Controller
                control={control}
                render={({ field }) => (
                    <TextField
                        // {...field}
                        className="mt-8 mb-16"
                        label="Numéro"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
            <Controller
                control={control}
                render={({ field }) => (
                    <div className="mb-12 text-center">
                        <b>Premier contact</b>
                    </div>
                )}
            />
            <Controller
                control={control}
                render={({ field }) => (
                    <TextField
                        // {...field}
                        className="mb-12"
                        label="Nom"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
            <Controller
                control={control}
                render={({ field }) => (
                    <TextField
                        // {...field}
                        className="mb-12"
                        label="Prénom"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
            <Controller
                control={control}
                render={({ field }) => (
                    <TextField
                        // {...field}
                        className="mb-12"
                        label="Email"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
            <Controller
                control={control}
                render={({ field }) => (
                    <TextField
                        // {...field}
                        className="mb-12"
                        label="Mobile"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
            <Controller
                control={control}
                render={({ field }) => (
                    <TextField
                        // {...field}
                        className="mb-12"
                        label="Fixe"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
            <Controller
                control={control}
                render={({ field }) => (
                    <TextField
                        // {...field}
                        className="mb-12"
                        label="Commentaire"
                        variant="outlined"
                        multiline
                        rows={5}
                        fullWidth
                    />
                )}
            />
            <Controller
                name="categories"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                    <Autocomplete
                        className='w-full mb-12'
                        multiple
                        freeSolo
                        value={tagValue}
                        onChange={(event, newValue) => {
                            setTagValue([
                                ...tags,
                                ...newValue.filter((option) => tags.indexOf(option) === -1),
                            ]);
                        }}
                        options={tags}
                        getOptionLabel={(option) => option.title}
                        renderTags={(tagValue, getTagProps) =>
                            tagValue.map((option, index) => (
                                <Chip
                                    label={option}
                                    {...getTagProps({ index })}
                                    disabled={tags.indexOf(option) !== -1}
                                />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField {...params} label="Tags" placeholder="Add your tags" />
                        )}
                    />
                )}
            />
            <Controller
                control={control}
                render={({ field }) => (
                    <FormControl className="flex w-full mb-12" variant="outlined">
                        <InputLabel>Statut</InputLabel>
                        <Select
                            label="Statut"
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
                )}
            />
        </>
    )
}