export const getPokemons = async () => {
    let json;
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        //body: JSON.stringify(jsonForm)
    };


    await fetch('https://bp-pokemons.herokuapp.com/?idAuthor=1', requestOptions)
        .then((response) => { return response.json() })
        .then((data) => {
            json = data
        })
        .catch((err) => {
            return err
        })

    return json
}