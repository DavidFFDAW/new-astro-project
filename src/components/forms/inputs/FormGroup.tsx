interface InputLabelProps {
    label: string;
    name: string;
    required?: boolean;
    className?: string;
    children?: React.ReactNode;
}

export default function FormGroup({ label, name, required, className = 'default', children }: InputLabelProps) {
    return (
        <div className={`form-group ${className} flex column gap-5`}>
            <label htmlFor={name} className="form-label flex gap-5 astart">
                <span className="label-tex fs-medium fw500">{label}</span>
                {required && (
                    <span className="text-danger fs-big fw900" style={{ color: 'red' }}>
                        *
                    </span>
                )}
            </label>
            {children}
        </div>
    );
}
