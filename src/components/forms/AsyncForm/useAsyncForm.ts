import React from 'react';
import type { AsyncFormHook } from './model';
import httpService from '@services/http.service';
import { getSerializedForm } from '@utils/form.helper';
import { SNACKBAR_TIMEOUT } from '@constants/config';

export default function useAsyncForm({ method, redirection }: AsyncFormHook) {
    const [formHelper, setFormHelper] = React.useState({
        loading: false,
        message: '',
        error: false,
    });

    const submitHook = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const endpoint = form.action;
        const serializedForm = getSerializedForm(form);

        setFormHelper({
            ...formHelper,
            loading: true,
        });

        const response = await httpService[method](endpoint, serializedForm);
        const message = response.message || (response.ok ? 'Success' : 'Error: Something went wrong');

        setFormHelper({
            ...formHelper,
            loading: false,
            error: !response.ok,
            message: message,
        });

        if (redirection && response.ok) {
            window.location.href = redirection;
        }
    };

    const snackbarAnimationEnd = (event: React.AnimationEvent) => {
        event.preventDefault();
        const target = event.target as HTMLElement;

        if (event.animationName === 'appear') {
            return setTimeout(() => {
                target.classList.remove('snackbar-appearing-animation');
                target.classList.add('snackbar-disappearing-animation');
            }, SNACKBAR_TIMEOUT);
        }

        if (event.animationName === 'disappear') {
            target.style.display = 'none';
            setFormHelper({
                ...formHelper,
                message: '',
            });
        }
    };

    return {
        formHelper,
        setFormHelper,
        submitHook,
        snackbarAnimationEnd,
    };
}
