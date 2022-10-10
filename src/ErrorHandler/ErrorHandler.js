


const ErrorHandler = ({ error }) => {
    const {message, code, text} = error
    return (
        <div className="error-response">
            <div>
                <span className="code">{code}</span>
                <span className="text">{text}</span>
            </div>
            <p className="message">{message}</p>
        </div>
    )
}

export default ErrorHandler