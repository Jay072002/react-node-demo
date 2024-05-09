import React, { useState } from 'react';
import { Button, MenuItem, Select, FormControl, InputLabel, Switch, FormGroup, FormControlLabel } from '@mui/material';

const Sort = ({ options, onSort }) => {
  const [sortBy, setSortBy] = useState('');
  const [isAsc, setIsAsc] = useState(true);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleToggleChange = () => {
    setIsAsc((prevIsAsc) => !prevIsAsc);
  };

  const handleSort = () => {
    onSort(sortBy, isAsc);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "10px 0" }}>
      <FormControl variant="outlined" sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="sort-by-label">Sort By</InputLabel>
        <Select
          labelId="sort-by-label"
          id="sort-by-select"
          value={sortBy}
          onChange={handleSortChange}
          label="Sort By"
          size="small"
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={isAsc} onChange={handleToggleChange} />}
          label="Ascending"
        />
      </FormGroup>
      <Button variant="contained" onClick={handleSort}>Sort</Button>
    </div>
  );
};

export default Sort;
