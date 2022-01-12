const url = "https://www.mockachino.com/a71b232c-218e-4d/users";

const pedirUsuarios = async () => {
    try {
        const resp = await fetch(url);
        if (!resp.ok) throw 'Error al realizar la peticion';

        const { results } = await resp.json();
        return results;
        
    } catch (error) {
        throw error;
    }
};

export { pedirUsuarios };
