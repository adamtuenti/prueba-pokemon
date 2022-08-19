export const getPokemons = async () => {
    let json;
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        //body: JSON.stringify(jsonForm)
    };


    await fetch(process.env.REACT_APP_BASEPATH+'?idAuthor=1', requestOptions)
        .then((response) => { return response.json() })
        .then((data) => {
            json = data
        })
        .catch((err) => {
            return err
        })

    return json
}

export const savePokemon = async (jsonForm) => {
    console.log(jsonForm)
    let json;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonForm)
    };


    await fetch(process.env.REACT_APP_BASEPATH+'?idAuthor=1', requestOptions)
        .then((response) => { return response.json() })
        .then((data) => {
            console.log('bien: ', data)
            json = data
        })
        .catch((err) => {
            console.log('error: ', err)
            return err
        })

    return json
}

export const detelePokemon = async (id) => {
    console.log(id)
    let json;
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        //body: JSON.stringify(jsonForm)
    };


    await fetch(process.env.REACT_APP_BASEPATH+':'+id.toString() + 'skldjd', requestOptions)
        .then((response) => { return response.json() })
        .then((data) => {
            console.log('bien: ', data)
            json = data
        })
        .catch((err) => {
            console.log('error: ', err)
            return err
        })

    return json
}