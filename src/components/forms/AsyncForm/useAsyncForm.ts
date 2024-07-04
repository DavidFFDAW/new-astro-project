import React from 'react'
import type { AsyncFormHook } from './model';
import httpService from '@services/http.service';
import { getSerializedForm } from '@utils/form.helper';

export default function useAsyncForm({ method }: AsyncFormHook) {
    const [formHelper, setFormHelper] = React.useState({
        loading: false,
        message: '',
        error: false
    });

    const submitHook = async (e: React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault();
        const form = e.currentTarget;
        const endpoint = form.action;
        const serializedForm = getSerializedForm(form);

        setFormHelper({
            ...formHelper,
            loading: true
        });

        console.log({
            endpoint,
            serializedForm
        })

        const response = await httpService[method](endpoint, serializedForm);
        const message = response.message || (response.ok ? 'Success' : 'Error: Something went wrong');
        
        setFormHelper({
            ...formHelper,
            loading: false,
            error: !response.ok,
            message: message
        });
    };

    return {
        formHelper,
        setFormHelper,
        submitHook
    }
}
