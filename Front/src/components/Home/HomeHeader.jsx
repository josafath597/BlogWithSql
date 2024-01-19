import React, { useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import useEntriesContext from '../../hooks/useEntriesContext';

const HomeHeader = () => {
    const [searchParameter, setSearchParameter] = useState('');
    const [filterParam, setFilterParam] = useState('');
    const { page, queryEntries, setFilter, setOpen, setPage, setSearch } = useEntriesContext();

    const handleChange = (event) => {
        setFilterParam(event.target.value);
    };

    const handleSearch = () => {
        setSearch(searchParameter);
        setFilter(filterParam);
    };

    const handleReset = () => {
        setSearchParameter('');
        setFilterParam('');
        setSearch('');
        setFilter('');
        setPage(1);
    };

    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', gap: 1, flexDirection: { xs: 'column', md: 'row' } }}>
            <Box
                sx={{
                    display: 'flex',
                    gap: 1,
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'stretch' }
                }}
            >
                <FormControl fullWidth sx={{ minWidth: '15rem' }}>
                    <TextField
                        id="outlined-controlled"
                        label="Buscar"
                        value={searchParameter}
                        disabled={queryEntries.isLoading}
                        onChange={(event) => {
                            setSearchParameter(event.target.value);
                        }}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Filtro</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filterParam}
                        label="filter"
                        onChange={handleChange}
                        disabled={queryEntries.isLoading}
                    >
                        <MenuItem value="title">Titulo</MenuItem>
                        <MenuItem value="content">Contenido</MenuItem>
                        <MenuItem value="author">Autor</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ minWidth: '6rem' }}
                    onClick={() => handleSearch()}
                    disabled={queryEntries.isLoading}
                >
                    <Typography>Buscar</Typography>
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ minWidth: '8rem' }}
                    onClick={() => setOpen(true)}
                    disabled={queryEntries.isLoading}
                >
                    <Typography>Nueva Entrada</Typography>
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ minWidth: '9rem' }}
                    onClick={handleReset}
                    disabled={queryEntries.isLoading}
                >
                    <Typography>Restablecer</Typography>
                </Button>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, marginTop: { xs: 2, md: 0 } }}>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ minWidth: '6rem' }}
                    onClick={() => setPage((prePage) => prePage - 1)}
                    disabled={page < 2 || queryEntries.isLoading}
                >
                    <Typography>Anterior</Typography>
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ minWidth: '9rem' }}
                    onClick={() => setPage((prePage) => prePage + 1)}
                    disabled={queryEntries?.data?.length < 70 || queryEntries.isLoading}
                >
                    <Typography>Siguiente</Typography>
                </Button>
            </Box>
        </Box>
    );
};

export default HomeHeader;
