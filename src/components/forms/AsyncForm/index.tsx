import React from 'react';
import useAsyncForm from './useAsyncForm';
import type { AsyncFormProps } from './model';

export default function AsyncForm({ endpoint, method, children }: AsyncFormProps) {
    const { formHelper, submitHook, snackbarAnimationEnd } = useAsyncForm({
        endpoint,
        method,
    });

    return (
        <form action={`/api/endpoints/${endpoint.startsWith('/') ? endpoint.slice(1) : endpoint}`} method={method} className="relative form async-form async-react-form" onSubmit={submitHook}>
            {formHelper.loading && <div className="loading form-loading-internal-spinner"></div>}
            {/* <div className="loading form-loading-internal-spinner"></div> */}

            {children}

            {formHelper.message && (
                <div className={`snackbar snackbar-form-message snackbar-type-style-${formHelper.error ? 'error' : 'success'} snackbar-appearing-animation`} onAnimationEnd={snackbarAnimationEnd}>
                    {formHelper.message}
                </div>
            )}
        </form>
    );
}
