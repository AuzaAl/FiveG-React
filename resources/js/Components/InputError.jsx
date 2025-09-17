export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p
            {...props}
            className={' ' + className}
        >
            {message}
        </p>
    ) : null;
}
