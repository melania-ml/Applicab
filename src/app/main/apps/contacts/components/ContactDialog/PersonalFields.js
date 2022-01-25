import { useState } from "react";
import {
    TextField,
    FormControl,
    MenuItem,
    InputLabel,
    Select,
    Autocomplete,
    Chip
} from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import Nationalities from '../../../../constants/Nationalities';
import Countries from '../../../../constants/Countries';
import Departments from '../../../../constants/Departments';

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
const titlesPerson = [{
    id: 2,
    value: "Docteur",
    label: "Docteur",
}, {
    id: 2,
    value: "Maître",
    label: "Maître",
}, {
    id: 2,
    value: "Madame",
    label: "Madame",
}, {
    id: 2,
    value: "Monsieur",
    label: "Monsieur",
}, {
    id: 2,
    value: "M. et Mme.",
    label: "M. et Mme.",
}, {
    id: 2,
    value: "Autre",
    label: "Autre",
}]

const pays = [
    {
        id: 1,
        value: "India",
        label: "India",
    },
];

const nationalities = Nationalities
const countries = Countries

const departments = Departments
const nativeCountries = [
    {
        id: 1,
        value: "India",
        label: "India",
    },
];

const status1 = [
    {
        id: 1,
        value: "Célibataire",
        label: "Célibataire",
    },
    {
        id: 2,
        value: "Marié.e",
        label: "Marié.e",
    },
    {
        id: 3,
        value: "Pacsé.e",
        label: "Pacsé.e",
    },
    {
        id: 4,
        value: "Divorcé.e",
        label: "Divorcé.e",
    },
    {
        id: 5,
        value: "Veuf.ve",
        label: "Veuf.ve",
    },
    {
        id: 6,
        value: "Autre",
        label: "Autre",
    },
];

const status = [
    {
        id: 1,
        value: "Actif",
        label: "Actif",
    },
    {
        id: 2,
        value: "Inactif",
        label: "Inactif",
    },
];

const schema = yup.object().shape({
    name: yup.string().required("You must enter a name"),
});
const tags = []
export default function PersonalFields() {
    const [selectedTitle, setSelectedTitle] = useState("");
    const [selectedPays, setSelectedPays] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [dateValue, setDateValue] = useState(null);
    const [nativeCountry, setNativeCountry] = useState("");
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
                            <div style={{ maxHeight: 300 }}>
                                {titlesPerson.map((category) => (
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
                    <div className="mb-12 text-center">
                        <b>Information complémentaire</b>
                    </div>
                )}
            />
            <Controller
                control={control}
                render={({ field }) => (
                    <DatePicker
                        label="Date de naissance"
                        value={dateValue}
                        onChange={(newValue) => {
                            setDateValue(newValue);
                        }}
                        renderInput={(params) => (
                            <TextField className="w-full mb-12" {...params} />
                        )}
                    />
                )}
            />
            <Controller
                control={control}
                render={({ field }) => (<Autocomplete
                    className='flex w-full mb-12'
                    disablePortal
                    style={{ color: '#FFFFFF' }}
                    options={nationalities}
                    renderInput={(params) =>
                        <TextField {...params} label="Nationalité" />
                    }
                />
                    // <FormControl className="flex w-full mb-12" variant="outlined">
                    //     <InputLabel>Nationalité</InputLabel>
                    //     <Select
                    //         label="Nationalité"
                    //         value={selectedCity}
                    //         onChange={(e) => setSelectedCity(e.target.value)}
                    //     >
                    //         {nationalities.map((category) => (
                    //             <MenuItem value={category.nationality} key={category.alpha_3_code}>
                    //                 {category.nationality}
                    //             </MenuItem>
                    //         ))}
                    //     </Select>
                    // </FormControl>
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
                    // <FormControl className="flex w-full mb-12" variant="outlined">
                    //     <InputLabel>Pays de naissance</InputLabel>
                    //     <Select
                    //         label="Pays de naissance"
                    //         value={nativeCountry}
                    //         onChange={(e) => setNativeCountry(e.target.value)}
                    //     >
                    //         {nativeCountries.map((category) => (
                    //             <MenuItem value={category.value} key={category.id}>
                    //                 {category.label}
                    //             </MenuItem>
                    //         ))}
                    //     </Select>
                    // </FormControl>
                )}
            />
            <Controller
                control={control}
                render={({ field }) => (
                    <TextField
                        // {...field}
                        className="mb-12"
                        label="Ville de naissance"
                        variant="outlined"
                        fullWidth
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
                        options={departments}
                        renderInput={(params) =>
                            <TextField {...params} label="Département" />
                        }
                    />
                    // <FormControl className="flex w-full mb-12" variant="outlined">
                    //     <InputLabel>Département</InputLabel>
                    //     <Select
                    //         label="Département"
                    //         value={selectedCity}
                    //         onChange={(e) => setSelectedCity(e.target.value)}
                    //     >
                    //         {departments.map((category) => (
                    //             <MenuItem value={category.department} key={category.code}>
                    //                 {category.department}
                    //             </MenuItem>
                    //         ))}
                    //     </Select>
                    // </FormControl>
                )}
            />
            <Controller
                control={control}
                render={({ field }) => (
                    <TextField
                        // {...field}
                        className="mb-12"
                        label="Profession"
                        variant="outlined"
                        fullWidth
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
                            {status1.map((category) => (
                                <MenuItem value={category.value} key={category.id}>
                                    {category.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
    );
}
