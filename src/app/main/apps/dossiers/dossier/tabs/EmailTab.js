import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useFormContext, Controller } from "react-hook-form";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { Avatar, Typography } from "@mui/material";
import { motion } from "framer-motion";

function EmailTab(props) {
  // const methods = useFormContext();
  // const { control, formState } = methods;
  // const { errors } = formState;

  return (
    <div>
      {/* <ChatApp /> */}
      {/* <FusePageCarded className="items-center max-h-313 max-w-300 h-530 dossierEmailChat">
        </FusePageCarded> */}
      {/* <Controller
                name="name"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        //error={!!errors.name}
                        required
                        //helperText={errors?.name?.message}
                        label="Name"
                        autoFocus
                        id="name"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />

            <Controller
                name="description"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        id="description"
                        label="Description"
                        type="text"
                        multiline
                        rows={5}
                        variant="outlined"
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
                        className="mt-8 mb-16"
                        multiple
                        freeSolo
                        options={[]}
                        value={value}
                        onChange={(event, newValue) => {
                            onChange(newValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Select multiple categories"
                                label="Categories"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        )}
                    />
                )}
            />

            <Controller
                name="tags"
                control={control}
                defaultValue={[]}
                render={({ field: { onChange, value } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        multiple
                        freeSolo
                        options={[]}
                        value={value}
                        onChange={(event, newValue) => {
                            onChange(newValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Select multiple tags"
                                label="Tags"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        )}
                    />
                )}
            /> */}
    </div>
  );
}

export default EmailTab;
