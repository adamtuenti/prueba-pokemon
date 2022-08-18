import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { savePokemon } from "../../services/api";

import { FormControl, Form, InputGroup } from "react-bootstrap";

import Select from 'react-select'

import TiposPokemon from './typePokemon.json'

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

import './formularioPokemon.scss'



import { GrAdd } from "react-icons/gr";

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';




import 'bootstrap/dist/css/bootstrap.min.css';


export default class FormularioPokemon extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ataque: 0,
            defensa: 0,
            nombre: '',
            url: '',
            hp: 0,
            tipo: 'type'


        }
    }

    componentDidMount() {



    }

    savePokemForm() {

        Swal.fire({
            //title: 'Atrapando pokemon...',
            //width: 600,
            //padding: '3.5em',
            //color: '#716add',
            allowOutsideClick: false,
            showCancelButton: false,
            showConfirmButton: false,
            background: 'transparent',
            backdrop: `
                rgba(0,0,123,0.4)
                    url(https://cdn.streamloots.com/uploads/5eb3db772a3fcd0035f7ff40/10172dc2-f05e-4804-948f-94ec8a1747ce.gif)
                    center
                    no-repeat
                `
        })



        setTimeout(() => {
            let jsonForm = { 'image': this.state.url, 'attack': this.state.ataque, 'defense': this.state.defensa, 'name': this.state.nombre, 'hp': this.state.hp, 'type': this.state.tipo, 'idAuthor': '1' }
            savePokemon(jsonForm).then(response => {


                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Pokemon atrapado',
                    showConfirmButton: false,
                    timer: 1750
                })


            })
        }, 2500);


    }


    render() {

        // Randomize data of the table columns.
        // Note that the fields are all using the `prop` field of the headers.

        //const TiposPokemon = []




        return (
            <Container id='containerCrear'>
                <Row>
                    <p>Nuevo Pokemon</p>
                </Row>

                <Row>
                    <Col>
                        <Row>
                            <Col md='3'>
                                Nombre
                            </Col>

                            <Col md='9'>
                                <FormControl onChange={(selectedOption) => this.setState({ nombre: selectedOption.target.value })} value={this.state.nombre} />
                            </Col>
                        </Row>






                    </Col>

                    <Col>
                        <Row>

                            <Col md='3'>
                                Ataque
                            </Col>


                            <Col md='9'>
                                <Row> <Col md='1'>1 </Col><Col md='10'><Slider onChange={(a) => console.log(a)} /> </Col><Col md='1'>100</Col></Row>
                            </Col>

                        </Row>

                    </Col>


                </Row>

                <Row className='rowSeccion'>

                    <Col>
                        <Row>
                            <Col md='3'>
                                Imagen
                            </Col>
                            <Col md='9'>
                                <FormControl onChange={(selectedOption) => this.setState({ url: selectedOption.target.value })} value={this.state.url} />
                            </Col>
                        </Row>

                    </Col>

                    <Col>
                        <Row>

                            <Col>
                            Defensa
                            </Col>
                            <Col>
                            <toolcool-range-slider
                                slider-width="400px"
                                slider-height="0.5rem"
                                pointer-width="1.5rem"
                                pointer-height="1.5rem"
                                pointer-bg="#6AD3BA"
                                pointer-bg-hover="#50BDA3"
                                pointer-shadow="none"
                                pointer-shadow-hover="none"
                                pointer-border="0"
                                pointer-border-hover="1px solid #3F8A8A"
                                pointer-border-focus="1px solid #3F8A8A"></toolcool-range-slider>
                            </Col>
                        
                        </Row>
                        <Row>
                            
                        </Row>
                        
                    </Col>

                </Row>

                <Row className='rowSeccion'>

                    <Col>

                        <Row>
                            <Col md='3'>
                                Tipo
                            </Col>

                            <Col md='9'>
                                <Select placeholder={'Seleccione tipo de pokemon'} onInputChange={this.handleInputChange} required theme={({ borderRadius: '10px', marginTop: '7.5px', textAlign: 'left', fontSize: '5px' })} options={TiposPokemon} onChange={(selectedOption) => this.setState({ tipo: selectedOption.value })} className='select' />

                            </Col>
                        </Row>

                    </Col>



                    <Col>

                        <Row>
                            <Col md='3'>
                                Tipo
                            </Col>

                            <Col md='9'>
                                <Select placeholder={'Seleccione tipo de pokemon'} onInputChange={this.handleInputChange} required theme={({ borderRadius: '10px', marginTop: '7.5px', textAlign: 'left', fontSize: '5px' })} options={TiposPokemon} onChange={(selectedOption) => this.setState({ tipo: selectedOption.value })} className='select' />

                            </Col>
                        </Row>

                    </Col>


                </Row>

                <Row style={{ textAlign: 'center', marginTop: '35px' }}>

                    <Col md='12'>
                        <button className="boton" onClick={() => { this.savePokemForm() }}>
                            <GrAdd color='white' /> Guardar




                        </button>

                        <button className="boton" style={{ marginLeft: '25px' }} onClick={() => { }}>
                            <GrAdd color='white' /> Cancelar




                        </button>
                    </Col>


                    <Col>

                    </Col>






                </Row>


            </Container>
        );
    }
}
