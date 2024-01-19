/* eslint-disable import/no-extraneous-dependencies */
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useModalForm } from '../../hooks/useModalForm';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
};

const styleInput = {
    width: '100%',
    marginY: 1
};

const ModalAddEntry = () => {
    const { open, handleClose, handleSubmit, author, setAuthor, errors, title, setTitle, date, setDate, content, setContent } =
        useModalForm();

    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style} component="form" onSubmit={handleSubmit}>
                <Typography id="modal-modal-title" variant="h6" component="h2" marginY={1} textAlign="center">
                    Agregar entrada
                </Typography>
                <TextField
                    id="outlined-controlled"
                    label="Autor"
                    value={author}
                    onChange={(event) => {
                        setAuthor(event.target.value);
                    }}
                    sx={styleInput}
                    error={!!errors}
                    helperText={errors}
                />
                <TextField
                    id="outlined-controlled"
                    label="Titulo"
                    value={title}
                    onChange={(event) => {
                        setTitle(event.target.value);
                    }}
                    sx={styleInput}
                    error={!!errors}
                    helperText={errors}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker value={date} onChange={(newValue) => setDate(newValue)} sx={{ width: '100%' }} />
                </LocalizationProvider>
                <TextField
                    id="outlined-controlled"
                    label="Contenido"
                    value={content}
                    onChange={(event) => {
                        setContent(event.target.value);
                    }}
                    sx={styleInput}
                    multiline
                    rows={4}
                    error={!!errors}
                    helperText={errors}
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="contained" color="primary" type="submit" sx={{ minWidth: '6rem' }}>
                        <Typography>Guardar</Typography>
                    </Button>
                    <Button variant="contained" color="primary" sx={{ minWidth: '6rem' }} onClick={handleClose}>
                        <Typography>Cancelar</Typography>
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ModalAddEntry;
