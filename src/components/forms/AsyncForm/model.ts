export interface AsyncFormHook {
    endpoint: string;
    redirection: string | null;
    method: 'get' | 'post' | 'put' | 'delete';
}

export interface AsyncFormProps extends AsyncFormHook {
    children: React.ReactNode;
}
