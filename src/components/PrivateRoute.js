import React from 'react';
import { Redirect, Route } from 'react-router';

function PrivateRoute({component: Component, authed, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => authed === true
            ? <Component {...props}/>
            : <Redirect to={{pathname: "/profile", state: {from: props.location}}}/>}
        />
    )
}

export default PrivateRoute;