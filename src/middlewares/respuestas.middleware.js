export const misRespuestas = (req, res, next) => {
    res.success = (datoRespuesta) => res.status(200).json({
        status: "OK",
        fecha: new Date().toLocaleDateString(),
        payload: datoRespuesta
    });

    res.badrequest = (error) => res.status(400).json({
        status: "Bad Request",
        error,
        fecha: new Date().toLocaleDateString(),
    });

    res.unauthorized = (error) => res.status(401).json({
        status: "Unauthorized",
        error
    });

    res.forbidden = (error) => res.status(403).json({
        status: "forbidden",
        error
    });
    
    res.notfound = (error) => res.status(404).json({
        status: "Not Found",
        error
    });

    res.internalerror = (error) => res.status(500).json({
        status: "Internal server error",
        error
    });

    next();
};
