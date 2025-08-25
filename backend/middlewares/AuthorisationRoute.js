const AuthorisationRoute = async ( ...allowedRoles ) => {
    const { email } = req.body;
    const user = await Organisation.findOne( {email} );
    if( !user.allowedRoles .includes( allowedRoles ) ){
        return res.status( 403 )
            .json({
                message : "User not authorised to access this route",
                success : false
            })
    }
    next();
}