import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PassengerService from "../Services/PassengerService";
import BusService from "../Services/BusService";

export default function UpdatePassengers() {
  var navigate = useNavigate();

  // get all details
  const [all, setAll] = useState([]);

  const loadDetails = async (e) => {
    await BusService.getAllBusId()
      .then((res) => setAll(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadDetails();
  }, []);

  const [editemployee, seteditemployee] = useState({
    passengerId: "",
    noOfSeats: "",
    pickupLoc: "",
    dropLoc: "",
    amountPaid: "",
    bus: {
      busId: "",
      busNo: "",
      busName: "",
      busType: "",
      busCapacity: "",
    },
  });

  const onRegChange = (e) => {
    if (e.target.name === "busId") {
      seteditemployee({ ...editemployee, bus: { busId: e.target.value } });
    } else
      seteditemployee({ ...editemployee, [e.target.name]: e.target.value });
  };

  const { passengerId } = useParams();
  //--------------------------------------------------------------------------------------------------
  //to update the employee
  const onSubmit = async (e, editemployee) => {
    if (
      editemployee.passengerId !== "" &&
      editemployee.noOfSeats !== "" &&
      editemployee.pickupLoc !== "" &&
      editemployee.dropLoc !== "" &&
      editemployee.amountPaid !== "" &&
      editemployee.bus.busId !== ""
    ) {
      e.preventDefault();
      console.log(editemployee);

      await PassengerService.updatePass(editemployee).then((response) => {
        alert("Updated successfully");
        navigate("/passhome");
      });
    } else {
      alert("Please fill all fields");
    }
  };
  //------------------------------------------------------------------------------------------------------
  // to  get the data of the student to be updated
  const GetData = async (passengerId) => {
    const response = await PassengerService.getPassById(passengerId);

    seteditemployee(response.data);
  };

  //use effect
  useEffect(() => {
    console.log(passengerId);
    GetData(passengerId);
  }, []);

  //----------------------------------------------------------------------------------------------

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const ValidationErrors = {};
    if (editemployee.noOfSeats === "") {
      ValidationErrors.noOfSeats = "* Seats is required";
    }

    if (editemployee.pickupLoc === "") {
      ValidationErrors.pickupLoc = "* Pickup location is required";
    }
    if (editemployee.dropLoc === "") {
      ValidationErrors.dropLoc = "* Drop location is required";
    }
    if (editemployee.amountPaid === "") {
      ValidationErrors.amountPaid = "* Amount paid is required";
    }
    if (editemployee.busName === "") {
      ValidationErrors.busName = "* Bus name is required";
    }

    setErrors(ValidationErrors);
    // console.log(ValidationErrors);
    if (Object.keys(ValidationErrors).length === 0) {
    }
  };

  return (
    <div className="container">
      <nav
        className="navbar navbar-expand-lg navbar navbar-dark bg-success "
        id="navbar"
      >
        <a className="navbar-brand" href="/">
          Bus Ticket Management System
        </a>
      </nav>
      <div className="row">
        <form
          onSubmit={(e) => onSubmit(e, editemployee)}
          className="col-md-6 offset-md-3 border rounded p-5 mt-5 shadow "
          accordion
          id="passformupdate"
        >
          <h3>Edit Passenger Details</h3>
          <div>
            <label htmlFor="passengerId" className="form-label  fw-bold">
              Passenger Id:
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              placeholder="Enter Id"
              readOnly
              name="passengerId"
              value={editemployee.passengerId}
              onChange={(e) => onRegChange(e)}
            />
          </div>
          <br />
          <div>
            <label htmlFor="noOfSeats" className="form-label  fw-bold">
              No of Seats:
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              placeholder="Enter seats"
              name="noOfSeats"
              value={editemployee.noOfSeats}
              onBlur={handleSubmit}
              onChange={(e) => onRegChange(e)}
            />
            {errors.noOfSeats && (
              <span
                style={{
                  color: "red",
                }}
              >
                {errors.noOfSeats}
              </span>
            )}
          </div>
          <br />
          <div>
            <label htmlFor="pickupLoc" className="form-label fw-bold me-1   ">
              Pickup Location:
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              placeholder="Enter pickup"
              name="pickupLoc"
              value={editemployee.pickupLoc}
              onBlur={handleSubmit}
              onChange={(e) => onRegChange(e)}
            />
            {errors.pickupLoc && (
              <span
                style={{
                  color: "red",
                }}
              >
                {errors.pickupLoc}
              </span>
            )}
          </div>
          <br />
          <div>
            <label htmlFor="dropLoc" className="form-label fw-bold">
              Drop Location:
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              placeholder="Enter salary"
              name="dropLoc"
              value={editemployee.dropLoc}
              onBlur={handleSubmit}
              onChange={(e) => onRegChange(e)}
            />
            {errors.dropLoc && (
              <span
                style={{
                  color: "red",
                }}
              >
                {errors.dropLoc}
              </span>
            )}
          </div>
          <br />

          <div>
            <label htmlFor="amountPaid" className="form-label fw-bold">
              Amount Paid:
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              placeholder="Enter salary"
              name="amountPaid"
              value={editemployee.amountPaid}
              onBlur={handleSubmit}
              onChange={(e) => onRegChange(e)}
            />
            {errors.amountPaid && (
              <span
                style={{
                  color: "red",
                }}
              >
                {errors.amountPaid}
              </span>
            )}
          </div>
          <br />

          <div>
            <label htmlFor="busId" className="form-label  fw-bold">
              Bus Id:
            </label>
            <br />
            <select
              name="busId"
              value={editemployee.bus.busId}
              onChange={(e) => onRegChange(e)}
            >
              <option selected="selected">Choose</option>
              {all.map((index) => (
                <option key={index} value={index}>
                  {index}
                </option>
              ))}
            </select>
          </div>

          <br />
          <div>
            <label htmlFor="busName" className="form-label fw-bold">
              Bus name:
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              placeholder="Enter bus name"
              name="busName"
              value={editemployee.bus.busName}
              onBlur={handleSubmit}
              onChange={(e) => onRegChange(e)}
            />
            {errors.busName && (
              <span
                style={{
                  color: "red",
                }}
              >
                {errors.busName}
              </span>
            )}
          </div>
          <br />

          <button className="btn btn-success btn-md mx-2 ">Save</button>
          <Link className="btn btn-light  btn-md mx-2" to={"/passhome"}>
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}
