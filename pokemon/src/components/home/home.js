import React from "react";
import { Container, Col, Row, Table, Pagination } from "react-bootstrap";
import { getPokemons, detelePokemon } from "../../services/api";
import FormularioPokemon from '../formulario/formularioPokemon'
import { MdDeleteOutline, MdBorderColor, MdOutlineAdd, MdSearch } from 'react-icons/md'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import './home.scss'
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pokemones: [],
      crearPokemon: false,
      labelFilter: '',
      accion: '',
      idPokemon: '',
      page: 1,
      slice: [],
      rows: 5

    }
  }

  componentDidMount() {
    if (this.state.slice.length > 1 && this.page !== 1) {
      this.setState({ page: this.page - 1 })
    }


    getPokemons().then(respuesta => {
      this.setState({ pokemones: respuesta })
    })
  }

  openForm(mood, id) {
    this.setState({ idPokemon: id, accion: mood, crearPokemon: false })
    setTimeout(() => (this.setState({ crearPokemon: true })), 50)
  }

  deleteFromApi(id) {
    detelePokemon(id).then(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Pokemon eliminado!',
        showConfirmButton: false,
        timer: 1750
      })
    })
  }





  eliminarPokemon(pokemon, index) {
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
        this.deleteFromApi(pokemon.id)

        this.setState({
          pokemones: this.state.pokemones.filter((obj, idx) => idx !== index)
        });


      }
    })
  }

  renderPagination() {
    let items = [];
    for (let number = 1; number <= 10; number++) {
      items.push(
        <Pagination.Item>{number}</Pagination.Item>
      );
    }
    return (
      <Pagination bsSize="small">{items}</Pagination>
    );
  }

  calculateRange = (data, rowsPerPage) => {
    const range = [];
    const num = Math.ceil(data.length / rowsPerPage);
    for (let i = 1; i <= num; i++) {
      range.push(i);
    }
    return range;
  };

  sliceData = (data, page, rowsPerPage) => {
    return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  };

  closeForm = (flag) => {
    this.setState({ crearPokemon: flag })
  }

  render() {
    let pokemones = this.state.pokemones
    let page = this.state.page
    let range = this.calculateRange(pokemones, this.state.rows)
    let slice = this.sliceData(pokemones, page, this.state.rows)

    if (this.state.labelFilter) {
      pokemones = this.state.pokemones.filter(
        (dt) => dt.name.toUpperCase().includes(this.state.labelFilter.toUpperCase())
      );
    }


    return (
      <Container id='containerGeneral'>

        <p style={{ fontSize: '25px', marginBottom: '25px' }}>Listado de Pokemones</p>

        <Row style={{ marginBottom: '24.5px' }}>

          <Col xs={12} sm={6} lg={6} className="justify-content-end align-items-end">

            <div style={{ border: 'solid 0.5px', width: '62.5%', padding: '3.5px' }}>
              <MdSearch style={{ marginLeft: '7.5px' }} />

              <input
                type="text"
                value={this.state.labelFilter}
                style={{ paddingLeft: '7.5px', border: 'transparent', outline: 'none', width: '85%' }}
                placeholder='Buscar'
                onChange={(e) =>
                  this.setState({ labelFilter: e.target.value })
                }
              />
            </div>

          </Col>

          <Col xs={12} sm={6} lg={6} className="d-flex flex-col justify-content-end align-items-end">
            <button className="boton" onClick={() => { this.openForm('new', '') }}>
              <MdOutlineAdd size='25' color='white' /> Nuevo
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
            {slice.map((elemento, index) => (
              <tr key={index}>
                <td>{elemento.name}</td>
                <td><img className='img-fluid' alt={elemento.id} style={{ width: '45px', heigth: '45px' }} src={elemento.image} /></td>
                <td>{elemento.attack}</td>
                <td>{elemento.defense}</td>
                <td>
                  <div>
                    <MdDeleteOutline size='23.5' onClick={() => this.eliminarPokemon(elemento, index)} color='#847cdc' />
                    <MdBorderColor size='23.5' onClick={() => { this.openForm('edit', elemento.id) }} color='#847cdc' style={{ marginLeft: '7.5px' }} />
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </Table>

        <div>
          {range.map((el, index) => (
            <button
              key={index}
              className={
                page === el ? 'activeButton button' : 'inactiveButton button'
              }
              onClick={() => this.setState({ page: el })}
            >
              {el}
            </button>
          ))}
        </div>
        {this.state.crearPokemon === true && <div style={{ marginTop: "62.5px", marginBottom: 'auto' }} align="center">
          <FormularioPokemon closeForm={this.closeForm} accionPokemon={this.state.accion} idPokemon={this.state.idPokemon} />
        </div>
        }
      </Container>
    );
  }
}
