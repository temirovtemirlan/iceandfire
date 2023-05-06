import React from "react";

const ErrorMessage = () => {
    return (
        <React.Fragment>
            <img width={250} src={process.env.PUBLIC_URL + '/image/oops.png'} alt="error" />
            <span>Something goes wrong...</span>
        </React.Fragment>
    )
}

export default ErrorMessage;