const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        console.log(rolesArray);
        console.log(req.roles);
        const result = req.roles.map((role) => rolesArray.includes(role));
        console.log(result);
        if (result.includes(true)) {
            next();
        } else {
            return res.sendStatus(401);
        }
    }
}

module.exports = verifyRoles;
