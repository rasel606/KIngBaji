import React from "react";
import { Col, Container, InputGroup, Row, Button, Form } from "react-bootstrap";
export default () => {
  return (
    <Row style={{ height: "78px" }}>
      <Container>
        <Col className="my-3 px-3 " md={9} sm={9} xs={9} lg={9}>
          <div class="input-group border border-2 rounded-pill">
            <input
              class="form-control border border-0 "
              type="search"
              value="search"
            />
            <div class="input-group-append border border-0">
              <button
                class="btn border border-1 rounded-circle m-1"
                type="button"
              >
                <i class="fa fa-search"></i>
              </button>
            </div>
          </div>
        </Col>
      </Container>
    </Row>
  );
};
