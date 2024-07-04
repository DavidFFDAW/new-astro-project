export interface AsyncFormHook {
    endpoint: string;
    method: 'get' | 'post' | 'put' | 'delete';
}

export interface AsyncFormProps extends AsyncFormHook {
    children: React.ReactNode;
}
