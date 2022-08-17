import React from "react";
import { Container } from "react-bootstrap";


export default class Error extends React.Component {


  render() {
    return (
      <Container>
        <div style={{ marginTop: "62.5px", marginBottom: 'auto' }} align="center">


          <p style={{ color: "#C4C4C4", fontSize: "92.5px", fontWeight: 'bold' }}>
            404
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
