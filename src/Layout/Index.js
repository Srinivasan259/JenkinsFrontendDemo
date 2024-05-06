import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import PassengerService from "../Services/PassengerService";

function Index() {
  // view all details

  const [all, setAll] = useState([]);

  const loadDetails = async (e) => {
    await PassengerService.getAllPass()
      .then((res) => setAll(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadDetails();
  }, []);

  const [viewdetails, setViewdetails] = useState({});

  const handleView = (passengerId) => {
    console.log(passengerId);
    console.log(viewdetails);
    PassengerService.getPassById(passengerId).then((response) => {
      setViewdetails(response.data);
      console.log(response.data);
    });
    handleShow();
  };

  //for modal box
  const [show, setShow] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);
  const values = [true];

  // const handleClose = () => set;

  const handleClose = () => setShow(false);
  const handleShow = (breakpoint) => {
    setFullscreen(breakpoint);
    setShow(true);
  };

  // for search
  const [search, setSearch] = useState("");
  const [employee, setEmployee] = useState([]);
  // console.log(search);

  const handleSubmit = (e) => {
    setSearch(e.target.value);
    onSearch();
  };

  const onSearch = async () => {
    await PassengerService.getPassById()
      .then((result) => {
        // console.log(result.status);
        setEmployee(result.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <nav
        className="navbar navbar-expand-lg navbar navbar-dark bg-success "
        id="navbarindex"
      >
        <a className="navbar-brand p-1 " href="/">
          <b> Bus Ticket Management System</b>
        </a>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <div style={{ marginRight: "3rem" }}>
              <Link className="nav-item nav-link active" to="/passhome">
                <b>Passenger </b>

                <span className="sr-only"></span>
              </Link>
            </div>
            <div>
              <Link className="nav-item nav-link active" to="/bushome">
                <b>Bus </b>

                <span className="sr-only"></span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container-fluid col-8 ">
        <form class="form-inline mb-4">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search by id..."
            aria-label="Search"
            id="searchind"
            onChange={(e) => handleSubmit(e)}
          />
        </form>
      </div>

      <table className="table table-striped border shadow " id="indextable">
        <thead className="table-success ">
          <tr>
            <th scope="col">Passenger Id</th>
            <th scope="col">No of Seats</th>
            <th scope="col"> Pickup Location</th>
            <th scope="col">Drop Location</th>
            <th scope="col">Amount Paid</th>
            <th scope="col">Bus Id</th>

            <th scope="col">View</th>
          </tr>
        </thead>
        <tbody>
          {all
            // accepts any cases
            // by employee id
            .filter((index) => {
              return !search || index.passengerId == search;
            })
            .map((stud, index) => (
              <tr>
                <th scope="row" key={index}>
                  {stud.passengerId}
                </th>
                <td>{stud.noOfSeats}</td>
                <td>{stud.pickupLoc}</td>
                <td>{stud.dropLoc}</td>
                <td>{stud.amountPaid}</td>
                <td>{stud.bus.busId}</td>

                <td>
                  <>
                    {values.map((v, idx) => (
                      <Button
                        key={idx}
                        className="me-2 mb-2"
                        variant="secondary"
                        onClick={() => handleView(stud.passengerId)}
                      >
                        View
                        {typeof v === "string" && `below ${v.split("-")[0]}`}
                      </Button>
                    ))}

                    <Modal
                      show={show}
                      fullscreen={fullscreen}
                      onHide={() => setShow(false)}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Passenger Details</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form id="viewtable">
                          <Table className="table table-striped border shadow striped">
                            <thead>
                              <tr>
                                <th scope="col">Passenger Id</th>
                                <th scope="col">No of Seats</th>
                                <th scope="col"> Pickup Location</th>
                                <th scope="col">Drop Location</th>
                                <th scope="col">Amount Paid</th>
                                <th scope="col">Bus Id</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>{viewdetails.passengerId}</td>
                                <td>{stud.noOfSeats}</td>
                                <td>{stud.pickupLoc}</td>
                                <td>{stud.dropLoc}</td>
                                <td>{stud.amountPaid}</td>
                                <td>{stud.bus.busId}</td>
                              </tr>
                            </tbody>
                          </Table>
                        </Form>
                      </Modal.Body>
                    </Modal>
                  </>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Index;
