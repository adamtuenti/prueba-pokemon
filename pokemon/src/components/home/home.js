import React from "react";
import { Container } from "react-bootstrap";
import { getPokemons, detelePokemon } from "../../services/api";

import TABLE_BODY from "./data.json";

import { GrAdd } from "react-icons/gr";

import FormularioPokemon from '../formulario/formularioPokemon'

import Spinner from 'react-bootstrap/Spinner'

import './home.scss'



import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOptions,
  TableBody,
  TableHeader
} from "react-bs-datatable";

import { Col, Row, Table } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import DataTable from "react-data-table-component";


export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pokemones: [],
      crearPokemon: false

    }
  }

  componentDidMount() {
    getPokemons().then(respuesta => {
      this.setState({ pokemones: respuesta })
    })




  }


  render() {

    // Randomize data of the table columns.
    // Note that the fields are all using the `prop` field of the headers.

    const STORY_HEADERS = [
      {
        prop: "name",
        title: "Nombre",
        isFilterable: true
      },
      {
        prop: "image",
        title: "Imagen"
      },
      {
        prop: "attack",
        title: "Ataque",
        isSortable: true
      },
      {
        prop: "defense",
        title: "Defensa",
        isSortable: true
      },
      {
        prop: "",
        title: "Acciones",
        button: true,
        cell: (row) => {
          return (
            <div>
            <button onClick={()=> detelePokemon(row.id)}>Borrar</button>
            <button>Editar</button>
            </div>
          );
        }
      

        //isSortable: true
      }
    ];


    return (
      <Container id='containerGeneral'>

        <p style = {{fontSize: '25px', marginBottom: '25px'}}>Listado de Pokemones</p>

        

        <DatatableWrapper
          body={this.state.pokemones}
          headers={STORY_HEADERS}
          paginationOptionsProps={{
            initialState: {
              rowsPerPage: 10,
              options: [5, 10, 15, 20]
            }
          }}
        >


          <Row className="mb-4 p-2">
            <Col
              xs={12}
              lg={4}
              className="d-flex flex-col justify-content-end align-items-end"
            >
              <Filter placeholder="Ingrese nombre del pokemon.." />

            </Col>
            <Col
              xs={12}
              sm={6}
              lg={4}
              className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
            >
              {/* <PaginationOptions /> */}
            </Col>
            <Col
              xs={12}
              sm={6}
              lg={4}
              className="d-flex flex-col justify-content-end align-items-end"
            >
              {/* <Pagination /> */}

              <button className="boton" onClick={() => { this.setState({ crearPokemon: true }) }}>
                <GrAdd color='white' /> Nuevo




              </button>
            </Col>
          </Row>
          <Table>
            <TableHeader />
            <TableBody />
          </Table>
        </DatatableWrapper>


        {this.state.crearPokemon === true && <div style={{ marginTop: "62.5px", marginBottom: 'auto' }} align="center">

          <FormularioPokemon />







        </div>

        }
      </Container>
    );
  }
}
