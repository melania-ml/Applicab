import { useState } from "react";
import {
    TextField,
    FormControl,
    MenuItem,
    InputLabel,
    Select,
    Autocomplete,
} from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import Nationalities from '../../../../constants/Nationalities';

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

const cities = [
    {
        id: 1,
        value: "Ahmedabad",
        label: "Ahmedabad",
    },
];

const nationalities = Nationalities

const departments = [
    {
        "code": 1,
        "department": "Ain"
    },
    {
        "code": 2,
        "department": "Aisne"
    },
    {
        "code": 3,
        "department": "Allier"
    },
    {
        "code": 4,
        "department": "Alpes-de-Haute-Provence"
    },
    {
        "code": 5,
        "department": "Hautes-Alpes"
    },
    {
        "code": 6,
        "department": "Alpes-Maritimes"
    },
    {
        "code": 7,
        "department": "Ardèche"
    },
    {
        "code": 8,
        "department": "Ardennes"
    },
    {
        "code": 9,
        "department": "Ariège"
    },
    {
        "code": 10,
        "department": "Aube"
    },
    {
        "code": 11,
        "department": "Aude"
    },
    {
        "code": 12,
        "department": "Aveyron"
    },
    {
        "code": 13,
        "department": "Bouches-du-Rhône"
    },
    {
        "code": 14,
        "department": "Calvados"
    },
    {
        "code": 15,
        "department": "Cantal"
    },
    {
        "code": 16,
        "department": "Charente"
    },
    {
        "code": 17,
        "department": "Charente-Maritime"
    },
    {
        "code": 18,
        "department": "Cher"
    },
    {
        "code": 19,
        "department": "Corrèze"
    },
    {
        "code": "2A",
        "department": "Corse-du-Sud"
    },
    {
        "code": "2B",
        "department": "Haute-Corse"
    },
    {
        "code": 21,
        "department": "Côte-d'Or"
    },
    {
        "code": 22,
        "department": "Côtes d'Armor"
    },
    {
        "code": 23,
        "department": "Creuse"
    },
    {
        "code": 24,
        "department": "Dordogne"
    },
    {
        "code": 25,
        "department": "Doubs"
    },
    {
        "code": 26,
        "department": "Drôme"
    },
    {
        "code": 27,
        "department": "Eure"
    },
    {
        "code": 28,
        "department": "Eure-et-Loir"
    },
    {
        "code": 29,
        "department": "Finistère"
    },
    {
        "code": 30,
        "department": "Gard"
    },
    {
        "code": 31,
        "department": "Haute-Garonne"
    },
    {
        "code": 32,
        "department": "Gers"
    },
    {
        "code": 33,
        "department": "Gironde"
    },
    {
        "code": 34,
        "department": "Hérault"
    },
    {
        "code": 35,
        "department": "Ille-et-Vilaine"
    },
    {
        "code": 36,
        "department": "Indre"
    },
    {
        "code": 37,
        "department": "Indre-et-Loire"
    },
    {
        "code": 38,
        "department": "Isère"
    },
    {
        "code": 39,
        "department": "Jura"
    },
    {
        "code": 40,
        "department": "Landes"
    },
    {
        "code": 41,
        "department": "Loir-et-Cher"
    },
    {
        "code": 42,
        "department": "Loire"
    },
    {
        "code": 43,
        "department": "Haute-Loire"
    },
    {
        "code": 44,
        "department": "Loire-Atlantique"
    },
    {
        "code": 45,
        "department": "Loiret"
    },
    {
        "code": 46,
        "department": "Lot"
    },
    {
        "code": 47,
        "department": "Lot-et-Garonne"
    },
    {
        "code": 48,
        "department": "Lozère"
    },
    {
        "code": 49,
        "department": "Maine-et-Loire"
    },
    {
        "code": 50,
        "department": "Manche"
    },
    {
        "code": 51,
        "department": "Marne"
    },
    {
        "code": 52,
        "department": "Haute-Marne"
    },
    {
        "code": 53,
        "department": "Mayenne"
    },
    {
        "code": 54,
        "department": "Meurthe-et-Moselle"
    },
    {
        "code": 55,
        "department": "Meuse"
    },
    {
        "code": 56,
        "department": "Morbihan"
    },
    {
        "code": 57,
        "department": "Moselle"
    },
    {
        "code": 58,
        "department": "Nièvre"
    },
    {
        "code": 59,
        "department": "Nord"
    },
    {
        "code": 60,
        "department": "Oise"
    },
    {
        "code": 61,
        "department": "Orne"
    },
    {
        "code": 62,
        "department": "Pas-de-Calais"
    },
    {
        "code": 63,
        "department": "Puy-de-Dôme"
    },
    {
        "code": 64,
        "department": "Pyrénées-Atlantiques"
    },
    {
        "code": 65,
        "department": "Hautes-Pyrénées"
    },
    {
        "code": 66,
        "department": "Pyrénées-Orientales"
    },
    {
        "code": 67,
        "department": "Bas-Rhin"
    },
    {
        "code": 68,
        "department": "Haut-Rhin"
    },
    {
        "code": 69,
        "department": "Rhône"
    },
    {
        "code": 70,
        "department": "Haute-Saône"
    },
    {
        "code": 71,
        "department": "Saône-et-Loire"
    },
    {
        "code": 72,
        "department": "Sarthe"
    },
    {
        "code": 73,
        "department": "Savoie"
    },
    {
        "code": 74,
        "department": "Haute-Savoie"
    },
    {
        "code": 75,
        "department": "Paris"
    },
    {
        "code": 76,
        "department": "Seine-Maritime"
    },
    {
        "code": 77,
        "department": "Seine-et-Marne"
    },
    {
        "code": 78,
        "department": "Yvelines"
    },
    {
        "code": 79,
        "department": "Deux-Sèvres"
    },
    {
        "code": 80,
        "department": "Somme"
    },
    {
        "code": 81,
        "department": "Tarn"
    },
    {
        "code": 82,
        "department": "Tarn-et-Garonne"
    },
    {
        "code": 83,
        "department": "Var"
    },
    {
        "code": 84,
        "department": "Vaucluse"
    },
    {
        "code": 85,
        "department": "Vendée"
    },
    {
        "code": 86,
        "department": "Vienne"
    },
    {
        "code": 87,
        "department": "Haute-Vienne"
    },
    {
        "code": 88,
        "department": "Vosges"
    },
    {
        "code": 89,
        "department": "Yonne"
    },
    {
        "code": 90,
        "department": "Territoire de Belfort"
    },
    {
        "code": 91,
        "department": "Essonne"
    },
    {
        "code": 92,
        "department": "Hauts-de-Seine"
    },
    {
        "code": 93,
        "department": "Seine-St-Denis"
    },
    {
        "code": 94,
        "department": "Val-de-Marne"
    },
    {
        "code": 95,
        "department": "Val-D'Oise"
    },
    {
        "code": 971,
        "department": "Guadeloupe"
    },
    {
        "code": 972,
        "department": "Martinique"
    },
    {
        "code": 973,
        "department": "Guyane"
    },
    {
        "code": 974,
        "department": "La Réunion"
    },
    {
        "code": 976,
        "department": "Mayotte"
    },
    {
        "code": 99,
        "department": "Autre"
    }
]

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

export default function PersonalFields() {
    const [selectedTitle, setSelectedTitle] = useState("");
    const [selectedPays, setSelectedPays] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [dateValue, setDateValue] = useState(null);
    const [nativeCountry, setNativeCountry] = useState("");

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
                            {titles.map((category) => (
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
                    <FormControl className="flex w-full mb-12" variant="outlined">
                        <InputLabel>Ville</InputLabel>
                        <Select
                            label="Ville"
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                        >
                            {cities.map((category) => (
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
                render={({ field }) => (
                    <FormControl className="flex w-full mb-12" variant="outlined">
                        <InputLabel>Nationalité</InputLabel>
                        <Select
                            label="Nationalité"
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                        >
                            {nationalities.map((category) => (
                                <MenuItem value={category.nationality} key={category.alpha_3_code}>
                                    {category.nationality}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            />
            <Controller
                control={control}
                render={({ field }) => (
                    <FormControl className="flex w-full mb-12" variant="outlined">
                        <InputLabel>Pays de naissance</InputLabel>
                        <Select
                            label="Pays de naissance"
                            value={nativeCountry}
                            onChange={(e) => setNativeCountry(e.target.value)}
                        >
                            {nativeCountries.map((category) => (
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
                    <FormControl className="flex w-full mb-12" variant="outlined">
                        <InputLabel>Ville de naissance</InputLabel>
                        <Select
                            label="Ville de naissance"
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                        >
                            {cities.map((category) => (
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
                    <FormControl className="flex w-full mb-12" variant="outlined">
                        <InputLabel>Département</InputLabel>
                        <Select
                            label="Département"
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                        >
                            {departments.map((category) => (
                                <MenuItem value={category.department} key={category.code}>
                                    {category.department}
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
                render={({ field: { onChange, value } }) => (
                    <Autocomplete
                        className="mb-12"
                        multiple
                        freeSolo
                        options={[]}
                        value={value}
                        // onChange={(event, newValue) => {
                        //   onChange(newValue);
                        // }}
                        renderInput={(params) => (
                            <TextField
                                // {...params}
                                placeholder="Tags"
                                label="Tags"
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
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
            {/*
            <Controller
                control={control}
                render={({ field }) => (
                    <FormControl className="flex w-full mb-12" variant="outlined">
                        <InputLabel>Pays</InputLabel>
                        <Select
                            label="Pays"
                            value={selectedPays}
                            onChange={(e) => setSelectedPays(e.target.value)}
                        >
                            {pays.map((category) => (
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
                        label="Adresse"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
            <Controller
                control={control}
                render={({ field }) => (
                    <FormControl className="flex w-full mb-12" variant="outlined">
                        <InputLabel>Ville</InputLabel>
                        <Select
                            label="Ville"
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                        >
                            {cities.map((category) => (
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
                        label="Capital social"
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
                render={({ field: { onChange, value } }) => (
                    <Autocomplete
                        className="mb-12"
                        multiple
                        freeSolo
                        options={[]}
                        value={value}
                        // onChange={(event, newValue) => {
                        //   onChange(newValue);
                        // }}
                        renderInput={(params) => (
                            <TextField
                                // {...params}
                                placeholder="Tags"
                                label="Tags"
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
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
            /> */}
        </>
    );
}
