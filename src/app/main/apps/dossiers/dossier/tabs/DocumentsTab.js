import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { motion } from 'framer-motion';
import { Icon } from '@mui/material';

function createData(type, nom, taille, Telecharger) {
  return { type, nom, taille, Telecharger };
}

const rows = [
  createData('PDF','lettre-de-mission.pdf','320.91 KB', 24),
  createData('PDF ', 'tcom-paris.pdf', '20.91 KB', 37),
  createData('PDF', 'hgbbh-detro-lesar', '191 KB 24', 6.0),
  createData('PD', 'lettre-de-mission.pdf', '520.91 KB', 67),
  createData('PDF',' tcom-paris.pdf', '820.91 KB', 49),
];

function DocumentsTab() {
       return (
         <div>
           <motion.div
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
             className="flex flex-auto w-full max-h-full"
           >
             <TableContainer component={Paper}>
               <Table sx={{ minWidth: 550 }} aria-label="simple table">
                 <TableHead>
                   <TableRow>
                     <TableCell>Type</TableCell>
                     <TableCell align="left">Nom</TableCell>
                     <TableCell align="left">Taille</TableCell>
                     <TableCell align="center">Télécharger</TableCell>
                   </TableRow>
                 </TableHead>
                 <TableBody>
                   {rows.map((row) => (
                     <TableRow
                       key={row.name}
                       sx={{
                         "&:last-child td, &:last-child th": { border: 0 },
                       }}
                     >
                       <TableCell align="left">{row.type}</TableCell>
                       <TableCell align="left">{row.nom}</TableCell>
                       <TableCell align="left">{row.taille}</TableCell>
                       <TableCell align="center">
                         <Icon
                           style={{
                             color: "white",
                             fontSize: "xx-large",
                             margin: "10px",
                             borderRadius: "25px",
                             backgroundColor: "#1BD7EF"
                           }}
                         >
                           arrow_downward
                         </Icon>
                       </TableCell>
                     </TableRow>
                   ))}
                 </TableBody>
               </Table>
             </TableContainer>{" "}
           </motion.div>

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

export default DocumentsTab;
