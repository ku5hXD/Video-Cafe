import { Route } from "express";
import React from "react"
import { Redirect } from "react-router-dom";

export default function PrivateRoute({ auth, component: Component, ...rest }) {

    // return (
    //     <Route
    //         {...rest}
    //         render={
    //             () => auth ? (
    //                 <Component />
    //             )
    //                 :
    //                 (
    //                     <Redirect to="/login" />
    //                 )
    //         }
    //     />
    // )

}