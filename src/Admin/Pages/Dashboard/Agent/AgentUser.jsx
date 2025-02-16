import React, { useState } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";

import InputSearchBox from "./InputSearchBox";

import DatePickers from "./DatePickers";

import GamehistoryModal from "./GamehistoryModal";

export default () => {
  const headers = [
    "Id",
    "User Id",
    "Agent Id",
    "Mobile",
    "Transaction Id",
    "Currency",
    "Amount",
    "Widthrow Method",
    "Status",
    "Date",
    "Actions",
  ];

  const data = [
      {
        Id: 1,
        "User Id": "Post Title",
        "Agent Id": "1 : Saikat",
        "Mobile": "Post Category",
        "Transaction Id": "Post Sub Category",
        "Currency": "BDT",
        "Amount": "Post Author",
        "Deposit Method": "Post Date",
        "Status": "Payment",
        "Date": "10-11-2024 10:11:40",
      },
      {
        Id: 2,
        "User Id": "Post Title",
        "Agent Id": "1 : Saikat",
        "Mobile": "Post Category",
        "Transaction Id": "Post Sub Category",
        "Currency": "BDT",
        "Amount": "Post Author",
        "Deposit Method": "Bkash",
        "Status": "Payment",
        "Date": "10-11-2024 10:11:40",
      },
      {
        "Id": 3,
        "User Id":"Post Title",
        "Agent Id":"Saikat",
        "Mobile":"Post Category",
        "TransactionId":"Post Sub Category",
        "Currency":"BDT",
        "Amount":"Post Author",
        "DepositMethod": "Post Date",
        "Status":"Payment",
        "Date":"10-11-2024 10:11:40",
      },
  ];

    const [datas, setDatas] = useState(data);
  
    const toggleActiveStatus = (id) => {
      const updatedData = datas.map((row) => {
        if (row.Id === id) {
          // Toggle isActive value
          return { ...row, isActive: row.isActive === "true" ? "false" : "true" };
        }
        return row;
      });
      setDatas(updatedData);
    };
  
    console.log(datas);
  
    const handleShowModal = (rowId) => {
      setModalShow(rowId);
    };
    const handleCloseModal = () => {
      setModalShow(null);
    };

  const [modalShow, setModalShow] = useState(false);
  const items = ["Red", "Blue", "Orange", "Red-Orange"];
  return (
    <div className="">
      <Card body className="bg-dark">
        <Row className="my-3">
          <Col md={3}>
            <InputSearchBox items={items} />
          </Col>
          <Col md={3}>
            <InputSearchBox items={items} />
          </Col>
          <Col md={3}>
            <InputSearchBox items={items} />
          </Col>
          <Col md={3}>
            <div className="card bg-white border border-1 ">
              <DatePickers items={items} />
            </div>
          </Col>
        </Row>
      </Card>
      <div className="m-3">
        <Card body>
        <div>
      <Table responsive>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th className="text-center" key={index}>
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, rowIndex) => (
            <tr className="text-center" key={rowIndex}>
              {headers.map((header, colIndex) => (
                <td key={colIndex}>
                  {header === "isActive" ? (
                    <Form.Check
                      type="switch"
                      id={`switch-${row.Id}`}
                      checked={row.isActive === "true"}
                      onChange={() => toggleActiveStatus(row.Id)}
                    />
                  ) : header === "Actions" ? (
                    <>
                      <Button
                        className="btn border border-1 mx-2"
                        onClick={() => handleShowModal(row)} // Pass row data on click
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Button>

                       {  modalShow.Id === row.Id && (
                        <GamehistoryModal
                          id={modalShow.Id || row}
                          data={modalShow} // Pass the row data to the modal
                          show={true} // Show modal when matching ID
                          onHide={handleCloseModal}
                        />
                      )}
                    </>
                  ) : (
                    row[header] || "-"
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
        </Card>
      </div>
    </div>
  );
};
