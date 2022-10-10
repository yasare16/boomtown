


const ErrorHandler = ({ error }) => {
    const {message, code, text} = error
    return (
        <div className="error-response">
            <div>
                <p className="message">{message}</p>
                <span className="code">{code}</span>
                <span className="text">{text}</span>
            </div>
            
        </div>
    )
}

export default ErrorHandler