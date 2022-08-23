import React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"

import  FormularioPokemon  from '../formulario/formularioPokemon'



const testPokemon = {
    id: '026',
    name: 'Raichu',
    attack: 90,
    defense: 55,
    image: 'https://w7.pngwing.com/pngs/152/256/png-transparent-pikachu-raichu-pokemon-pichu-pikachu-food-cat-like-mammal-carnivoran.png'
};

jest.mock("../../services/api", () => ({
    getPokemons: () => Promise.resolve([testPokemon]),
    detelePokemon: () => Promise.resolve(),
}));


const defaultProps = {
    ataque: '100',
    defensa: '',
    nombre: '',
    url: '',
    hp: '',
    tipo: '',
    accion: 'new',
    idPokemon: ''
}



const setUp = (props) => {
    return render(<FormularioPokemon {...defaultProps} {...props} />);
  };


describe("Formulario Page", () => {


    beforeEach(() => {
        jest.clearAllMocks();
      });

    afterEach(() => {
    window.history.pushState(null, document.title, '/')
    })

    it("Deberia renderizar el Formulario Pokemon", async () => {
        const { baseElement } = setUp();

        expect(baseElement).toMatchSnapshot();
        
    })

    it("Deberia guardar la informacion del pokemon'", async () => {
        setUp();

        const nombreInput = screen.getByTestId('nombre');
        fireEvent.change(nombreInput, { target: { value: testPokemon.name } });
        
    })



  })