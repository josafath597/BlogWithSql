import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { BASE_PATH } from './config';
import { CssBaseline, ThemeProvider } from '@mui/material';
import darkTheme from './Theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <React.StrictMode>
            <BrowserRouter basename={BASE_PATH}>
                <ThemeProvider theme={darkTheme}>
                    <CssBaseline />
                    <App />
                </ThemeProvider>
            </BrowserRouter>
        </React.StrictMode>
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
);
