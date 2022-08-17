import React from "react";
import { Container } from "react-bootstrap";
import { getPokemons } from "../../services/api";

import TABLE_BODY from "./data.json";

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


export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pokemones: []

        }
    }

    componentDidMount(){
        getPokemons().then( respuesta => {
            this.setState({ pokemones: respuesta })
        })

        


    }


  render() {

    const headers = [
        { title: 'Username', prop: 'username' },
        { title: 'Name', prop: 'realname' },
        { title: 'Location', prop: 'location' }
      ];
      
      // Randomize data of the table columns.
      // Note that the fields are all using the `prop` field of the headers.
      const body = Array.from(new Array(57), () => {
        const rd = (Math.random() * 10).toFixed(1);
      
        if (rd > 0.5) {
          return {
            username: 'i-am-billy',
            realname: `Billy ${rd}`,
            location: 'Mars'
          };
        }
      
        return {
          username: 'john-nhoj',
          realname: `John ${rd}`,
          location: 'Saturn'
        };
      });

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
          title: "Ataque"
        },
        {
          prop: "defense",
          title: "Defensa"
        },
        {
          prop: "type",
          title: "Acciones",
          isSortable: true
        }
      ];


    return (
      <Container>

<p>Listado de Pokemones</p>

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
          <Filter />
        </Col>
        <Col
          xs={12}
          sm={6}
          lg={4}
          className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
        >
          <PaginationOptions />
        </Col>
        <Col
          xs={12}
          sm={6}
          lg={4}
          className="d-flex flex-col justify-content-end align-items-end"
        >
          <Pagination />
        </Col>
      </Row>
      <Table>
        <TableHeader />
        <TableBody />
      </Table>
    </DatatableWrapper>


        <div style={{ marginTop: "62.5px", marginBottom: 'auto' }} align="center">




          <p style={{ color: "#C4C4C4", fontSize: "92.5px", fontWeight: 'bold' }}>
            HOME
          </p>

          <p style={{ color: "#AAAAAA", fontSize: "22.5px", marginTop: '12.5px' }}>
            Oops! Algo salió mal.
          </p>

          <p style={{ color: "#AAAAAA", fontSize: "22.5px" }}>
            La página no ha sido encontrada.
          </p>


        </div>
      </Container>
    );
  }
}
