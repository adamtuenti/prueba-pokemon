import React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"

import  Home  from '../home/home'


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
    pokemones: [testPokemon],
    crearPokemon: false,
    labelFilter: '',
    accion: '',
    idPokemon: '',
    page: 2,
    slice: [testPokemon],
    rows: 5
}



const setUp = (props) => {
    return render(<Home {...defaultProps} {...props} />);
  };


describe("Home Page", () => {


    beforeEach(() => {
        jest.clearAllMocks();
      });

    afterEach(() => {
    window.history.pushState(null, document.title, '/')
    })

    it("Deberia renderizar homePage", async () => {
        const { baseElement } = setUp();

        await waitFor(() => {
            expect(screen.getByText(testPokemon.name)).toBeInTheDocument();
        });

        expect(baseElement).toMatchSnapshot();
        
    })

    it("Deberia ir a la pagina 1", async () => {
        setUp();
        await waitFor(() => {
            expect(screen.getByText(testPokemon.name)).toBeInTheDocument();
        });

        const paginationButton = screen.getByText('1');

        fireEvent.click(paginationButton);
    })

    it("Deberia renderdizar un pokemon", async () => {
        
        setUp();
        
        await waitFor(() => {
            expect(screen.getByText(testPokemon.name)).toBeInTheDocument();
        });

        const raichuAttack = screen.getByText(testPokemon.attack)
        const raichuDeffence = screen.getByText(testPokemon.defense)
        const raichuImage = screen.getByAltText(testPokemon.id);
        
        expect(raichuAttack).toBeInTheDocument();
        expect(raichuDeffence).toBeInTheDocument();
        expect(raichuImage.src).toContain(testPokemon.image);
        
    })

    it("Deberia editar un pokemon", async () => {
        
        setUp();
        
        await waitFor(() => {
            expect(screen.getByText(testPokemon.name)).toBeInTheDocument();
        });

        const editarPokemonButton = screen.getByTestId('editar-pokemon');
        fireEvent.click(editarPokemonButton);
        
    })

    it("Deberia eliminar un pokemon", async () => {
        
        setUp();
        
        await waitFor(() => {
            expect(screen.getByText(testPokemon.name)).toBeInTheDocument();
        });

        const eliminarPokemon = screen.getByTestId('eliminar-pokemon');
        fireEvent.click(eliminarPokemon);
        
        const tituloAdvertencia = screen.getByText('¿Deseas eliminar a '+ testPokemon.name +'?')
        expect(tituloAdvertencia).toBeInTheDocument();

        const confirmarEliminar = screen.getByText('Si');
        fireEvent.click(confirmarEliminar);
        
        await waitFor(() => {
            expect(screen.queryByText(testPokemon.name)).not.toBeInTheDocument();
        });
        
    })

    it("Deberia buscar un pokemon",  async () => {
        setUp();

        await waitFor(() => {
            expect(screen.getByText(testPokemon.name)).toBeInTheDocument();
        });
        
        const barraBusqueda = screen.getByPlaceholderText('Buscar');
        fireEvent.change(barraBusqueda, { target: { value: testPokemon.name } });
        expect(barraBusqueda.value).toStrictEqual(testPokemon.name);
        
    })

    it("Deberia abrir el formulario para un nuevo pokemon", () => {

        setUp();   
        const botonNuevo = screen.getByText('Nuevo');

        fireEvent.click(botonNuevo);
        
        const nuevoPokemonTitulo = screen.getByTestId('nuevo-pokemon');
        expect(nuevoPokemonTitulo).toBeInTheDocument(); 

    })
  })