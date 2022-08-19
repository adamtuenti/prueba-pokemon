import React from "react";
import { Container, Col, Row, Table } from "react-bootstrap";
import { getPokemons, detelePokemon } from "../../services/api";
import FormularioPokemon from '../formulario/formularioPokemon'
import {  TextField, IconButton } from '@material-ui/core';

import { MdDeleteOutline, MdBorderColor, MdOutlineAdd } from 'react-icons/md'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import './home.scss'
import { DatatableWrapper, Filter, Pagination, TableBody, TableHeader } from "react-bs-datatable";
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pokemones: [],
      crearPokemon: false,
      labelFilter: '',
      accion: '',
      idPokemon: ''

    }
  }

  componentDidMount() {
    getPokemons().then(respuesta => {
      this.setState({ pokemones: respuesta })
    })
  }

  openForm(mood, id){
    this.setState({ idPokemon: id, accion: mood, crearPokemon: false })
    setTimeout(() => (this.setState({crearPokemon: true})), 50)
  }

  eliminarPokemon(pokemon, index){
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

        this.setState({
      pokemones: this.state.pokemones.filter((obj, idx) => idx !== index)
    });


        
        detelePokemon(pokemon.id).then( () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Pokemon eliminado!',
            showConfirmButton: false,
            timer: 1750
        })
        })
      }
    })
  }


  render() {

    let pokemones =this.state.pokemones

    if (this.state.labelFilter) {
      pokemones = this.state.pokemones.filter(
        (dt) => dt.name.toUpperCase().includes(this.state.labelFilter.toUpperCase())
      );
    }



   

    return (
      <Container id='containerGeneral'>

        <p style = {{fontSize: '25px', marginBottom: '25px'}}>Listado de Pokemones</p>

        <Row style = {{marginBottom: '24.5px'}}>

          <Col xs={12} sm={6} lg={6}  className="justify-content-end align-items-end">

          <TextField
                fullWidth
                id="standard-bare"
                variant="outlined"
                defaultValue="How can we help"
                InputProps={{
                  endAdornment: (
                    
                      <MdOutlineAdd />
                   
                  ),
                }}
              />

            
          <input
                    type="text"
                    value={this.state.labelFilter}
                    style = {{paddingLeft: '7.5px'}}
                    placeholder='Buscar'
                    onChange={(e) =>
                      this.setState({ labelFilter: e.target.value })
                    }
                  />

          </Col>

          <Col xs={12} sm={6} lg={6} className="d-flex flex-col justify-content-end align-items-end">
              

              <button className="boton" onClick={() => { this.openForm('new', '') }}>
                <MdOutlineAdd size = '25' color='white' /> Nuevo




              </button>
          </Col>

        </Row>

        

                  

        <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Imagen</th>
          <th>Ataque</th>
          <th>Defensa</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {pokemones.map((elemento, index) => (
          <tr>
          <td>{elemento.name}</td>
          <td><img className = 'img-fluid' alt = {elemento.id} style = {{width: '45px', heigth: '45px'}} src = {elemento.image}/></td>
          <td>{elemento.attack}</td>
          <td>{elemento.defense}</td>
          <td>
            <div>
            <MdDeleteOutline size = '23.5' onClick={()=> this.eliminarPokemon(elemento, index)} color = '#847cdc'/>
              <MdBorderColor size = '23.5' onClick={()=> {this.openForm('edit', elemento.id)}} color = '#847cdc' style = {{marginLeft: '7.5px'}}/>
            </div>
          </td>

          </tr>
        ))}
       
      </tbody>
    </Table>

        

        



        {this.state.crearPokemon === true && <div style={{ marginTop: "62.5px", marginBottom: 'auto' }} align="center">

          <FormularioPokemon accionPokemon = {this.state.accion} idPokemon = {this.state.idPokemon}/>







        </div>

        }
      </Container>
    );
  }
}
