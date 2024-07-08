import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

function SelectOption({ filterOption, handleSelectFilterOptionChange}) {
  return (
    <FormControl sx={{ m: 1, minWidth: 120, width: 150 }} size="small">
      <InputLabel id="select-option-label">Filtro</InputLabel>
      <Select
        labelId="select-option-labell"
        id="select-option"
        value={filterOption}
        label="Age"
        onChange={handleSelectFilterOptionChange}
      >
        <MenuItem value={"todos"}>Todos</MenuItem>
        <MenuItem value={"post"}>Publicaciones</MenuItem>
        <MenuItem value={"comment"}>Comentarios</MenuItem>
      </Select>
    </FormControl>
  );
}

export default SelectOption;
