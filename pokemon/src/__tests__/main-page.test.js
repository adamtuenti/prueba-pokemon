import React from "react"
import { render, screen } from "@testing-library/react"
import  Home  from "../components/home/home"
import FormularioPokemon from '../components/formulario/formularioPokemon'



describe("Main Text mount", () => {
  it("Se debe cargar el titulo principal", () => {
    render(<Home />)
    expect(screen.getByText(/Listado de Pokemones/i)).toBeInTheDocument()
  })
})

describe("Form Text mount", () => {
    it("Se debe desplegar el formulario de registro de pokemon", () => {
      render(<FormularioPokemon />)
      expect(screen.getByText(/Nombre:/i)).toBeInTheDocument()
    })
  })





