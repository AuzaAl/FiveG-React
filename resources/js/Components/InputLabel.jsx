export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block text-lg` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
