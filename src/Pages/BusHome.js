import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import BusService from "../Services/BusService";

function BusHome() {
  // view all details

  var navigate = useNavigate();

  const [all, setAll] = useState([]);

  const loadDetails = async (e) => {
    await BusService.getAllBus()
      .then((res) => setAll(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadDetails();
  }, []);

  // to view particular data

  const [viewdetails, setViewdetails] = useState({});

  const handleView = (busId) => {
    console.log(busId);
    console.log(viewdetails);
    BusService.getBusById(busId).then((response) => {
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
  const [bus, setCab] = useState([]);
  // console.log(search);

  const handleSubmit = (e) => {
    setSearch(e.target.value);
    onSearch();
  };

  const onSearch = async () => {
    await BusService.getBusByName()
      .then((result) => {
        // console.log(result.status);
        setCab(result.data);
      })
      .catch((err) => console.log(err));
  };

  // for delete
  const [deleteId, setDeleteId] = useState();
  const onDelete = async (e, busId) => {
    e.preventDefault();
    await BusService.deleteBus(busId)
      .then((res) => {
        setDeleteId(res.data);
        loadDetails();
      })
      .catch(
        alert(
          "Cannot able to delete beacause passengers have booked a ticket in this bus"
        )
      );
    navigate("/bushome");
  };

  return (
    <div className="container-fluid ">
      <nav
        className="navbar navbar-expand-lg navbar navbar-dark bg-success "
        id="navbar"
      >
        <a className="navbar-brand p-1 " href="/">
          <b> Bus Ticket Management System</b>
        </a>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-item nav-link active" to="/addbus">
              <b>Add Bus </b>

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
            placeholder="Search by name..."
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
          <Link className="btn btn-success btn-sm " to="/passhome" id="deptbut">
            Go to Passenger Page
          </Link>
        </div>
        <table className="table table-striped border shadow " id="hometable">
          <thead className="table-success ">
            <tr>
              <th scope="col">Bus Id</th>
              <th scope="col">Bus No</th>
              <th scope="col">Bus Name</th>
              <th scope="col">Bus Type</th>
              <th scope="col">Bus Capacity</th>

              <th scope="col">View</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {all
              // accepts any cases
              .filter((index) => {
                return search
                  .toUpperCase()
                  .split(" ")
                  .every(
                    (filterVal) =>
                      index.busName.toUpperCase().indexOf(filterVal) > -1
                  );
              })
              .map((stud, index) => (
                <tr>
                  <th scope="row" key={index}>
                    {stud.busId}
                  </th>
                  <td>{stud.busNo}</td>
                  <td>{stud.busName}</td>
                  <td>{stud.busType}</td>
                  <td>{stud.busCapacity}</td>

                  <td>
                    <>
                      {values.map((v, idx) => (
                        <Button
                          key={idx}
                          className="me-2 mb-2"
                          variant="secondary"
                          onClick={() => handleView(stud.busId)}
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
                          <Modal.Title>Bus Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form id="viewtable">
                            <Table className="table table-striped border shadow striped">
                              <thead>
                                <tr>
                                  <th scope="col">Bus Id</th>
                                  <th scope="col">Bus No</th>
                                  <th scope="col">Bus Name</th>
                                  <th scope="col">Bus Type</th>
                                  <th scope="col">Bus Capacity</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{stud.busId}</td>
                                  <td>{stud.busNo}</td>
                                  <td>{stud.busName}</td>
                                  <td>{stud.busType}</td>
                                  <td>{stud.busCapacity}</td>
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
                      to={`/updateBus/${stud.busId}`}
                    >
                      Edit
                    </Link>
                  </td>

                  <td>
                    <button
                      className="btn btn-danger btn-md"
                      onClick={(e) => onDelete(e, stud.busId)}
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

export default BusHome;
