import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BusService from "../Services/BusService";
import PassengerService from "../Services/PassengerService";

function AddPassenger() {
  var navigate = useNavigate();

  const [buses, setCab] = React.useState({
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
      setCab({ ...buses, bus: { busId: e.target.value } });
    } else {
      setCab({ ...buses, [e.target.name]: e.target.value });
    }
  };

  const addBus = async (e) => {
    if (
      buses.passengerId !== "" &&
      buses.noOfSeats !== "" &&
      buses.pickupLoc !== "" &&
      buses.dropLoc !== "" &&
      buses.amountPaid !== "" &&
      buses.bus.busId !== ""
    ) {
      e.preventDefault();
      await PassengerService.addPass(buses).then((res) => {
        console.log(res.data);
        setCab(res.data);
        alert("Data added successfully");
        navigate("/passhome");
      });
    } else {
      alert("Please fill all fields");
    }
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const ValidationErrors = {};
    if (buses.noOfSeats === "") {
      ValidationErrors.busNo = "* bus number is required";
    }

    if (buses.pickupLoc === "") {
      ValidationErrors.busName = "* bus name required";
    }
    if (buses.dropLoc === "") {
      ValidationErrors.busType = "* bus type is required";
    }
    if (buses.amountPaid === "") {
      ValidationErrors.busCapacity = "* bus capacity is required";
    }

    setErrors(ValidationErrors);
    // console.log(ValidationErrors);
    if (Object.keys(ValidationErrors).length === 0) {
    }
  };

  //------------------------------------------------------------------------------------------

  const [all, setAll] = useState([]);

  const loadDetails = async (e) => {
    await BusService.getAllBusId()
      .then((res) => {
        console.log(res.data);
        setAll(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    loadDetails();
  }, []);

  return (
    <div className="container">
      <nav
        className="navbar navbar-expand-lg navbar navbar-dark bg-success py-3 "
        id="navbar"
      >
        <a className="navbar-brand" href="/">
          Bus Ticket Management System
        </a>
      </nav>
      <div className="row">
        <form
          onSubmit={(e) => addBus(e, buses)}
          className="col-md-6 offset-md-3 border rounded p-5 mt-5 shadow"
          accordion
          id="addformdetail"
        >
          <h3>Add Passenger Details</h3>
          <div>
            <label htmlFor="noOfSeats" className="form-label  fw-bold">
              No of Seats:
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              placeholder="Enter no of seats"
              name="noOfSeats"
              // value={bus.empName}
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
              Pickup location:
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              placeholder="Enter pickup loc "
              name="pickupLoc"
              // value={bus.empCity}
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
              Bus Type:
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              placeholder="Enter drop loc"
              name="dropLoc"
              // value={bus.empSal}
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
              placeholder="Enter amt paid"
              name="amountPaid"
              // value={bus.empSal}
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
          <div>
            <label htmlFor="busId" className="form-label  fw-bold">
              Bus Id:
            </label>
            <br />
            <select
              name="busId"
              required
              value={buses.bus.busId}
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
            <button className="btn btn-success btn-md mx-2 ">Save</button>
            <Link className="btn btn-light  btn-md mx-2" to={"/passhome"}>
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPassenger;
