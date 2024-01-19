/* eslint-disable camelcase */
import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';
import axiosServices from '../Api/axios';

export const EntriesContext = createContext();

export function EntriesProvider({ children }) {
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('title');
    const [search, setSearch] = useState('');

    const getEntries = async () => {
        try {
            const { data } = await axiosServices.post('getEntries', { page, filter, search });
            return data;
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    const queryEntries = useQuery({
        queryKey: ['entries', { page, filter, search }],
        queryFn: getEntries
    });

    const addEntry = async (author, title, content, fecha_creacion) => {
        console.log(author, title, content, fecha_creacion);
        await axiosServices.post('addEntry', { author, title, content, fecha_creacion });
        await queryEntries.refetch();
    };

    const contextValue = {
        page,
        open,
        filter,
        queryEntries,
        addEntry,
        setFilter,
        setOpen,
        setPage,
        setSearch
    };

    return <EntriesContext.Provider value={contextValue}>{children}</EntriesContext.Provider>;
}

EntriesProvider.propTypes = {
    children: PropTypes.node.isRequired
};
