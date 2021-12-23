const url = "https://www.mockachino.com/a71b232c-218e-4d/users"

const pedirUsuarios = async() => {
    const resp = await fetch(url);
    const data = await resp.json();
    console.log(data);
}

export { pedirUsuarios };


