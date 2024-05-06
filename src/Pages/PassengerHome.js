import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import PassengerService from "../Services/PassengerService";

function PassengerHome() {
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

  // to view particular data

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

  // for delete
  const [deleteId, setDeleteId] = useState();
  const onDelete = async (e, passengerId) => {
    e.preventDefault();
    await PassengerService.deletePass(passengerId).then((res) => {
      setDeleteId(res.data);
      loadDetails();
    });
  };

  return (
    <div className="container-fluid ">
      <nav
        className="navbar navbar-expand-lg navbar navbar-dark bg-success "
        id="navbarpass"
      >
        <a className="navbar-brand p-1 " href="/">
          <b> Bus Ticket Management System</b>
        </a>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-item nav-link active" to="/addpass">
              <b>Add Passenger </b>

              <span className="sr-only"></span>
            </Link>

            <Link className="nav-item nav-link active" to="/" id="logout">
              <b> Logout</b>
            </Link>
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
            id="search"
            onChange={(e) => handleSubmit(e)}
          />
        </form>
        <div>
          <Link className="btn btn-outline-secondary btn-md" to="/" id="back">
            Back
          </Link>
        </div>
        <div>
          <Link className="btn btn-success btn-sm " to="/bushome" id="deptbut">
            Go to Bus Page
          </Link>
        </div>
        <table className="table table-striped border shadow " id="hometable">
          <thead className="table-success ">
            <tr>
              <th scope="col">Passenger Id</th>
              <th scope="col">No of Seats</th>
              <th scope="col"> Pickup Location</th>
              <th scope="col">Drop Location</th>
              <th scope="col">Amount Paid</th>
              <th scope="col">Bus Id</th>
              <th scope="col">Bus Name</th>

              <th scope="col">View</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {all

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
                  <td>{stud.bus.busName}</td>

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
                        className="my-modal"
                        show={show}
                        fullscreen={fullscreen}
                        onHide={() => setShow(false)}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Passenger Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ width: "15rem" }}>
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
                                  <th scope="col">Bus Name</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{stud.passengerId}</td>
                                  <td>{stud.noOfSeats}</td>
                                  <td>{stud.pickupLoc}</td>
                                  <td>{stud.dropLoc}</td>
                                  <td>{stud.amountPaid}</td>
                                  <td>{stud.bus.busId}</td>
                                  <td>{stud.bus.busName}</td>
                                </tr>
                              </tbody>
                            </Table>
                          </Form>
                        </Modal.Body>
                      </Modal>
                    </>
                  </td>

                  <td>
                    <Link
                      className="btn btn-warning btn-md"
                      to={`/updatepass/${stud.passengerId}`}
                    >
                      Edit
                    </Link>
                  </td>

                  <td>
                    <button
                      className="btn btn-danger btn-md"
                      onClick={(e) => onDelete(e, stud.passengerId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PassengerHome;
