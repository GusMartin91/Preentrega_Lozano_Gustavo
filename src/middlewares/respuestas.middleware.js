export const misRespuestas = (req, res, next) => {
    res.success = (datoRespuesta) => res.status(200).json({
        status: "OK",
        fecha: new Date().toLocaleDateString(),
        payload: datoRespuesta
    });

    res.created = (datoRespuesta) => res.status(201).json({
        status: "Created",
        fecha: new Date().toLocaleDateString(),
        payload: datoRespuesta
    });

    res.nocontent = () => res.status(204).send();

    res.accepted = (datoRespuesta) => res.status(202).json({
        status: "Accepted",
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
        status: "Forbidden",
        error
    });

    res.notfound = (error) => res.status(404).json({
        status: "Not Found",
        error
    });

    res.conflict = (error) => res.status(409).json({
        status: "Conflict",
        error
    });

    res.unprocessable = (error) => res.status(422).json({
        status: "Unprocessable Entity",
        error
    });

    res.internalerror = (error) => res.status(500).json({
        status: "Internal Server Error",
        error
    });

    next();
};
