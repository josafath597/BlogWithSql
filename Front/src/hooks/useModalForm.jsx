import { useState } from 'react';
import useEntriesContext from './useEntriesContext';
import dayjs from 'dayjs';

export const useModalForm = () => {
    const { open, setOpen, addEntry, setFilter, setPage, setSearch } = useEntriesContext();
    const [date, setDate] = useState(null);
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState('');
    const handleClose = () => {
        setTitle('');
        setContent('');
        setAuthor('');
        setErrors('');
        setOpen(false);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!author || !title || !content) {
            setErrors('Todos los campos son obligatorios');
            return;
        }
        await addEntry(author, title, content, dayjs(date).format('YYYY-MM-DD'));
        setFilter('');
        setPage(1);
        setSearch('');
        handleClose();
    };

    return { open, handleClose, handleSubmit, author, setAuthor, errors, title, setTitle, date, setDate, content, setContent };
};
