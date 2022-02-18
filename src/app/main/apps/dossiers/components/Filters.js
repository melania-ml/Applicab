import { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
// Tribunal judiciaire (TJ)
// - Juge des contentieux de la protection(JCP)
// - Tribunal de commerce (TCOM)
// - Référé Tribunal judiciaire (REFTJ)
// - Référé Tribunal de commerce (REFTC)
// - Conseil des Prud'hommes (CPH)
// - Juge aux affaires familiales (divorce hors consentement mutuel)(JAF )(divorce hors DCM)
// - Cour d'appel (CA)
const procedure = [
  {
    id: 1,
    value: "Tribunal judiciaire (TJ)",
    label: "Tribunal judiciaire (TJ)"
  },
  {
    id: 2,
    value: "Juge des contentieux de la protection(JCP)",
    label: "Juge des contentieux de la protection(JCP)"
  },
  {
    id: 3,
    value: "Tribunal de commerce (TCOM)",
    label: "Tribunal de commerce (TCOM)",
  },
  {
    id: 4,
    value: "Référé Tribunal judiciaire (REFTJ)",
    label: "Référé Tribunal judiciaire (REFTJ)",
  },
  {
    id: 5,
    value: "Référé Tribunal de commerce (REFTC)",
    label: "Référé Tribunal de commerce (REFTC)",
  },
  {
    id: 6,
    value: "Conseil des Prud'hommes (CPH)",
    label: "Conseil des Prud'hommes (CPH)",
  },
  {
    id: 7,
    value: "Juge aux affaires familiales (divorce hors consentement mutuel)(JAF )(divorce hors DCM)",
    label: "Juge aux affaires familiales (divorce hors consentement mutuel)(JAF )(divorce hors DCM)"
  },
  {
    id: 8,
    value: "Cour d'appel (CA)",
    label: "Cour d'appel (CA)"
  },
];

const status = [
  {
    id: 1,
    value: "A ouvrir",
    label: "A ouvrir"
  },
  {
    id: 2,
    value: "Ouvert",
    label: "Ouvert"
  },
  {
    id: 3,
    value: "Clôturé",
    label: "Clôturé"
  }
];

const types = [
  {
    id: 1,
    value: "Demande",
    label: "Demande"
  },
  {
    id: 2,
    value: "Défense",
    label: "Défense"
  }
];

const nature = [
  {
    id: 1,
    value: "Assurances",
    label: "Assurances"
  },
  {
    id: 2,
    value: `Bail d'habitation`,
    label: `Bail d'habitation`
  },
  {
    id: 3,
    value: "Civil",
    label: "Civil"
  },
  {
    id: 4,
    value: "Copropriété",
    label: "Copropriété"
  },
  {
    id: 5,
    value: "Droit bancaire",
    label: "Droit bancaire"
  },
  {
    id: 6,
    value: "Forfait justice",
    label: "Forfait justice"
  },
  {
    id: 7,
    value: "Immobilier",
    label: "Immobilier"
  },
  {
    id: 8,
    value: "Prêt immobilier",
    label: "Prêt immobilier"
  },
  {
    id: 9,
    value: "Responsabilité civile professionnelle",
    label: "Responsabilité civile professionnelle"
  },
  {
    id: 10,
    value: "VEFA",
    label: "VEFA"
  }
];

const createdDate = [
  {
    id: 1,
    value: "14-09-2017 16:19:56	",
    label: "14-09-2017 16:19:56	"
  },
  {
    id: 2,
    value: "14-09-2017 16:19:56	",
    label: "14-09-2017 16:19:56	"
  },
  {
    id: 3,
    value: "14-09-2017 16:19:56	",
    label: "14-09-2017 16:19:56	"
  },
  {
    id: 4,
    value: "14-09-2017 16:19:56	",
    label: "14-09-2017 16:19:56	"
  }
];

export default function Filters() {
  const [selectedProcedure, setSelectedProcedure] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedNature, setSelectedNature] = useState("");
  const [selectedDateOfCreated, setSelectedDateOfCreated] = useState(null);
  const [selectedTags, setSelectedTags] = useState("");
  return (
    <div className="bgm-10 for-res-flex-direction for-full-screen">
      <div className="row items-center">
        <div className="col-md-4 col-lg-4 col-12 col-xl-2 mb-3 mb-xl-0">
          <FormControl className="w-full" variant="outlined">
            <InputLabel style={{ color: "#FFFFFF" }}>Procédure</InputLabel>
            <Select
              label="Status"
              value={selectedProcedure}
              onChange={(e) => setSelectedProcedure(e.target.value)}
            >
              {procedure.map((category) => (
                <MenuItem value={category.value} key={category.id}>
                  {category.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="col-md-4 col-lg-4 col-12 col-xl-2 mb-3 mb-xl-0">
          <FormControl className="w-full" variant="outlined">
            <InputLabel style={{ color: "#FFFFFF" }}>Type</InputLabel>
            <Select
              label="Status"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {types.map((category) => (
                <MenuItem value={category.value} key={category.id}>
                  {category.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="col-md-4 col-lg-4 col-12 col-xl-2 mb-3 mb-xl-0">
          <FormControl className="w-full" variant="outlined">
            <InputLabel style={{ color: "#FFFFFF" }}>Status</InputLabel>
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
        <div className="col-md-4 col-lg-4 col-12 col-xl-2 mb-3 mb-xl-0">
          <FormControl className="w-full" variant="outlined">
            <InputLabel style={{ color: "#FFFFFF" }}>Nature</InputLabel>
            <Select
              label="Status"
              value={selectedNature}
              onChange={(e) => setSelectedNature(e.target.value)}
            >
              {nature.map((category) => (
                <MenuItem value={category.value} key={category.id}>
                  {category.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="col-md-4 col-lg-4 col-12 col-xl-2 mb-3 mb-xl-0">
          <FormControl className="w-full for-date" variant="outlined">
            <DatePicker
              label="Date de création"
              value={selectedDateOfCreated}
              onChange={(newValue) => {
                setSelectedDateOfCreated(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  InputLabelProps={{ style: { color: "#FFFFFF" } }}
                  className="w-full"
                  {...params}
                />
              )}
            />
          </FormControl>
        </div>
        <div className="col-md-4 col-lg-4 col-12 col-xl-2 mb-3 mb-xl-0">
          <FormControl className="w-full" variant="outlined">
            <TextField
              // {...field}
              InputLabelProps={{ style: { color: "#FFFFFF" } }}
              style={{ color: "#FFFFFF" }}
              className=""
              label="Tags"
              variant="outlined"
              fullWidth
            />
          </FormControl>
        </div>
      </div>
    </div>
  );
}
