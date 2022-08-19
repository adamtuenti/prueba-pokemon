import React from "react";
import { Container, Col, Row,FormControl } from "react-bootstrap";
import { savePokemon, getPokemonById, updatePokemon } from "../../services/api";


import Select from 'react-select'

import TiposPokemon from './typePokemon.json'

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

import './formularioPokemon.scss'



import { MdClose, MdSave } from "react-icons/md";




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
            tipo: 'type',
            accion: '',
            idPokemon: ''


        }
    }

    componentDidMount() {
        this.setState({ accion: this.props.accionPokemon, idPokemon: this.props.idPokemon })

        if(this.props.idPokemon != ''){
            getPokemonById(this.props.idPokemon).then((response) => {
                console.log(response)
                this.setState({ nombre: response.name, ataque: response.attack, url: response.image, defensa: response.defense, tipo: response.type, hp: response.hp })
            })
        }



    }

    savePokemForm() {
        let jsonForm = { 'image': this.state.url, 'attack': this.state.ataque, 'defense': this.state.defensa, 'name': this.state.nombre, 'hp': this.state.hp, 'type': this.state.tipo, 'idAuthor': '1' }
        if(this.state.idPokemon === ''){
            
        
            
        Swal.fire({
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
            
            savePokemon(jsonForm).then(_response => {
                


                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Pokemon atrapado',
                    showConfirmButton: false,
                    timer: 1750
                }).then(()=> {window.location.reload(false);})


            })
        }, 2500);

    }
    else{
        jsonForm.id = this.state.idPokemon

        updatePokemon(jsonForm).then(() => {
            


            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Pokemon actualizado',
                showConfirmButton: false,
                timer: 1750
            }).then(()=>{window.location.reload(false);})


        })
    }


    }


    render() {


        const stylesSelectType = {
            placeholder: defaultStyles => {
                return {
                    ...defaultStyles,
                    color: "#303337",
                    fontFamily: "Montserrat !important",
                    fontSize: '15.5px',
                    textAlign: 'left',
                    borderRadiusLeft: '7.5px'
                };
            },
            menu: base => ({
                ...base,
                //fontFamily: "Montserrat !important",
                fontSize: '15.5px',
                textAlign: 'left',
                color: '#212529'
            })
        };




        return (
            <Container id='containerCrear'>
                <Row>
                    {this.state.accion == 'new' && <p style = {{fontSize: '22.5px', marginBottom: '24.5px'}}>Nuevo Pokemon</p> }
                    {this.state.accion == 'edit' && <p style = {{fontSize: '22.5px', marginBottom: '24.5px'}}>Editar Pokemon</p> }
                </Row>

                <Row>
                    <Col>
                        <Row>
                            <Col md='3'>
                                Nombre:
                            </Col>

                            <Col md='9'>
                                <FormControl onChange={(selectedOption) => this.setState({ nombre: selectedOption.target.value })} value={this.state.nombre} />
                            </Col>
                        </Row>






                    </Col>

                    <Col>
                        <Row>

                            <Col md='3'>
                                Ataque:
                            </Col>


                            <Col md='9'>
                                <Row> 
                                    <Col md='1'>0 </Col>
                                    <Col md='9'><Slider value = {this.state.ataque} onChange={(poder) => this.setState({ ataque: poder })} /> </Col>
                                    <Col md='1'>100</Col>
                                    </Row>
                            </Col>

                        </Row>

                    </Col>


                </Row>

                <Row className='rowSeccion'>

                    <Col>
                        <Row>
                            <Col md='3'>
                                Imagen:
                            </Col>
                            <Col md='9'>
                                <FormControl onChange={(selectedOption) => this.setState({ url: selectedOption.target.value })} value={this.state.url} placeholder='url'/>
                            </Col>
                        </Row>

                    </Col>

                    <Col>
                        <Row>

                            <Col md = '3'>
                            Defensa
                            </Col>
                            <Col md = '9'>
                            <Row style = {{padding: 'auto'}}> 
                                <Col md='1'>0 </Col>
                                <Col md='9'><Slider value = {this.state.defensa} onChange={(defensa) => this.setState({ defensa: defensa })} /> </Col>
                                <Col md='1'>100</Col>
                                </Row>
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
                                <Select styles = {stylesSelectType} placeholder={'Tipo de pokemon'} onInputChange={this.handleInputChange} required theme={({ borderRadius: '10px', marginTop: '7.5px', textAlign: 'left', fontSize: '5px' })} options={TiposPokemon} onChange={(selectedOption) => this.setState({ tipo: selectedOption.value })} className='select' />

                            </Col>
                        </Row>

                    </Col>



                    <Col>

                        <Row>
                            <Col md='3'>
                                Vida:
                            </Col>

                            <Col md='9'>
                                <Row>
                                
                   
                      <Col md='1'>0 </Col>
                                    <Col md='9'><Slider value = {this.state.hp} onChange={(hp) => this.setState({ hp: hp })} /> </Col>
                                    <Col md='1'>100</Col>
                                    </Row>
                                    </Col>
                        </Row>

                    </Col>


                </Row>

                <Row style={{ textAlign: 'center', marginTop: '35px' }}>

                    <Col md='12'>
                        <button className="boton" onClick={() => { this.savePokemForm() }}>
                            <MdSave size = '25' color='white' /> {this.state.idPokem == '' ? 'Guardar' : 'Actualizar'}




                        </button>

                        <button className="boton" style={{ marginLeft: '25px' }} onClick={() => { }}>
                            <MdClose size = '25' color='white' /> Cancelar




                        </button>
                    </Col>


                    <Col>

                    </Col>






                </Row>


            </Container>
        );
    }
}
