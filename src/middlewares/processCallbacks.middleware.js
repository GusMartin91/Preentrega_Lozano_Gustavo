export const processCallbacks = (funciones) => {
    const callbacks = funciones.flat();

    return callbacks.map(fn => async (...params) => {
        try {
            if (typeof fn !== 'function') {
                throw new Error('Middleware must be a function');
            }
            return await fn(...params);
        } catch (error) {
            params[1].internalerror(error.message);
        }
    });
};
