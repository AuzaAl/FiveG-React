export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                ` ${
                    disabled && 'opacity-70'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
