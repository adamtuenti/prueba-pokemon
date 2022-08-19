import React from "react";
import { Container, Col, Row, Table } from "react-bootstrap";
import { getPokemons, detelePokemon } from "../../services/api";



import FormularioPokemon from '../formulario/formularioPokemon'


import { MdDeleteOutline, MdBorderColor, MdOutlineAdd } from 'react-icons/md'

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'



import './home.scss'



import { DatatableWrapper, Filter, Pagination, PaginationOptions,TableBody, TableHeader } from "react-bs-datatable";


import 'bootstrap/dist/css/bootstrap.min.css';



export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pokemones: [],
      crearPokemon: false,
      accion: '',
      idPokemon: ''

    }
  }

  componentDidMount() {
    getPokemons().then(respuesta => {
      this.setState({ pokemones: respuesta })
    })




  }

  eliminarPokemon(pokemon){
    Swal.fire({
      title: 'Cuidado!',
      text: "¿Deseas eliminar a " + pokemon.name + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload(false);
        detelePokemon(pokemon.id)
        Swal.fire(
          'Eliminado!',
          'Se eliminó a ' + pokemon.name + '.',
          'success'
        )
      }
    })
  }


  render() {


    const STORY_HEADERS = [
      {
        prop: "name",
        title: "Nombre",
        isFilterable: true
      },
      {
        prop: "",
        title: "Imagen",
        cell: (row) => {
          return (
            <div>

              <img className = 'img-fluid' style = {{width: '45px', heigth: '45px'}} src = {row.image}/>
            </div>
          );
        }
        
      },
      {
        prop: "attack",
        title: "Ataque",
        isSortable: true
      },
      {
        prop: "defense",
        title: "Defensa",
      },
      {
        prop: "",
        title: "Acciones",
        button: true,
        cell: (row) => {
          return (
            <div>

              <MdDeleteOutline size = '23.5' onClick={()=> this.eliminarPokemon(row)} color = '#847cdc'/>
              <MdBorderColor size = '23.5' onClick={()=> {this.setState({ idPokemon: row.id, accion: 'edit', crearPokemon: true })}} color = '#847cdc' style = {{marginLeft: '7.5px'}}/>
            </div>
          );
        }
      

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
              rowsPerPage: 5,
              options: [5, 10, 15, 20]
            }
          }}
        >


          <Row className="mb-4 p-2">
            <Col xs={12} lg={4} className="d-flex flex-col justify-content-end align-items-end">
              <Filter placeholder="Ingrese nombre del pokemon.." />

            </Col>
            <Col xs={12} sm={6} lg={4} className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0">
              
            </Col>
            <Col xs={12} sm={6} lg={4} className="d-flex flex-col justify-content-end align-items-end">
              

              <button className="boton" onClick={() => { this.setState({ crearPokemon: true, accion: 'new' }) }}>
                <MdOutlineAdd size = '25' color='white' /> Nuevo




              </button>
            </Col>
          </Row>
          <Table>
            <TableHeader />
            <TableBody />
          </Table>
          <Pagination />
        </DatatableWrapper>


        {this.state.crearPokemon === true && <div style={{ marginTop: "62.5px", marginBottom: 'auto' }} align="center">

          <FormularioPokemon accionPokemon = {this.state.accion} idPokemon = {this.state.idPokemon}/>







        </div>

        }
      </Container>
    );
  }
}
