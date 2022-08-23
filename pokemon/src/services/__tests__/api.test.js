import {  getPokemons, savePokemon, detelePokemon, getPokemonById, updatePokemon } from '../../services/api';

const API_ENDPOINT =  'https://bp-pokemons.herokuapp.com/';
const testPokemon = {
    id: '026',
    name: 'Raichu',
    attack: 90,
    defense: 55,
    image: 'https://w7.pngwing.com/pngs/152/256/png-transparent-pikachu-raichu-pokemon-pichu-pikachu-food-cat-like-mammal-carnivoran.png'
};

const mockFech = (mockData) => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(mockData),
        })
    );
  };

describe("Home Page", () => {


    beforeEach(() => {
    });

    it("Deberia Hacer un llamado GET al API para obtener todos los pokemons", async () => {
        mockFech([testPokemon])
        const endpoint = API_ENDPOINT +"?idAuthor=1";
        const content = {"headers": {"Content-Type": "application/json"}, "method": "GET"}
        const listaPokemon = await getPokemons();
        
        expect(listaPokemon).toStrictEqual([testPokemon]);
        expect(fetch).toHaveBeenCalledWith(endpoint, content);
    });

    it("Deberia Hacer un llamado POST al API para guardar un pokemon", async () => {
        mockFech([testPokemon])
        const endpoint = API_ENDPOINT +"?idAuthor=1";
        const content = {"headers": {"Content-Type": "application/json"}, "method": "POST", "body": JSON.stringify(testPokemon)}
        const nuevoPokemon = await savePokemon(testPokemon);
        
        expect(nuevoPokemon).toStrictEqual([testPokemon]);
        expect(fetch).toHaveBeenCalledWith(
            endpoint, content);
    });

    it("Deberia Hacer un llamado DELETE al API para eliminar un pokemon", async () => {
        mockFech([testPokemon])
        const endpoint = API_ENDPOINT +testPokemon.id;
        const content = {"headers": {"Content-Type": "application/json"}, "method": "DELETE"}
        const pokemonEliminado = await detelePokemon(testPokemon.id);
        
        expect(pokemonEliminado).toStrictEqual([testPokemon]);
        expect(fetch).toHaveBeenCalledWith(
            endpoint, content);
    });

    it("Deberia Hacer un llamado GET al API para obtener un pokemon", async () => {
        mockFech([testPokemon])
        const endpoint = API_ENDPOINT +testPokemon.id;
        const content = {"headers": {"Content-Type": "application/json"}, "method": "GET"}
        const pokemonEliminado = await getPokemonById(testPokemon.id);
        
        expect(pokemonEliminado).toStrictEqual([testPokemon]);
        expect(fetch).toHaveBeenCalledWith(
            endpoint, content);
    });

    it("Deberia Hacer un llamado UPDATE al API para actualizar un pokemon", async () => {
        mockFech(true)
        const endpoint = API_ENDPOINT +testPokemon.id;
        const content = {"headers": {"Content-Type": "application/json"}, "method": "PUT", "body": JSON.stringify(testPokemon)}
        await updatePokemon(testPokemon);
        
        expect(fetch).toHaveBeenCalledWith(
            endpoint, content);
    });
});