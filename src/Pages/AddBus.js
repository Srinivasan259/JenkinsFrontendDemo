import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BusService from "../Services/BusService";

function AddBus() {
  var navigate = useNavigate();

  const [addDept, setaddDept] = useState({
    busId: "",
    busNo: "",
    busName: "",
    busType: "",
    busCapacity: "",
  });

  const { busNo, busName, busType, busCapacity } = addDept;

  const onRegChange = (e) => {
    setaddDept({ ...addDept, [e.target.name]: e.target.value });
  };

  const handleInsert = async (e) => {
    console.log(addDept);
    if (
      addDept.busNo !== "" &&
      addDept.busName !== "" &&
      addDept.busType !== "" &&
      addDept.busCapacity !== ""
    ) {
      e.preventDefault();
      await BusService.addBus(addDept).then((res) => {
        console.log("Data", addDept);
        alert("Data added successfully");
        navigate("/bushome");
      });
    } else {
      alert("Please fill all details");
    }
  };
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const ValidationErrors = {};
    if (addDept.busId === "") {
      ValidationErrors.busId = "*Bus ID is required";
    }

    if (addDept.busNo === "") {
      ValidationErrors.busNo = "* Bus no is required";
    }
    if (addDept.busName === "") {
      ValidationErrors.busName = "* Bus name is required";
    }

    if (addDept.busType === "") {
      ValidationErrors.busType = "* Dept name is required";
    }
    if (addDept.busCapacity === "") {
      ValidationErrors.busCapacity = "* Dept name is required";
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
        <a className="navbar-brand p-1 ">
          <b> Bus Ticket Management System</b>
        </a>
      </nav>
      <div className="row">
        <form
          onSubmit={(e) => handleInsert(e)}
          className="col-md-6 offset-md-3 border rounded p-5 mt-5 shadow "
          accordion
          id="deptAddForm"
        >
          <h3>Add Bus Details</h3>
          <div>
            <label htmlFor="busNo" className="form-label  fw-bold">
              Bus No:
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              placeholder="Enter bus number"
              name="busNo"
              value={busNo}
              onBlur={handleSubmit}
              onChange={(e) => onRegChange(e)}
            />
            {errors.busNo && (
              <span
                style={{
                  color: "red",
                }}
              >
                {errors.busNo}
              </span>
            )}
          </div>
          <br />

          <div>
            <label htmlFor="busName" className="form-label fw-bold">
              Bus Name:
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              placeholder="Enter bus name"
              name="busName"
              value={busName}
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

          <div>
            <label htmlFor="busType" className="form-label fw-bold">
              Bus Type:
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              placeholder="Enter bus type"
              name="busType"
              value={busType}
              onBlur={handleSubmit}
              onChange={(e) => onRegChange(e)}
            />
            {errors.busType && (
              <span
                style={{
                  color: "red",
                }}
              >
                {errors.busType}
              </span>
            )}
          </div>

          <br />

          <div>
            <label htmlFor="busCapacity" className="form-label fw-bold">
              Bus Capacity:
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              placeholder="Enter bus capacity"
              name="busCapacity"
              value={busCapacity}
              onBlur={handleSubmit}
              onChange={(e) => onRegChange(e)}
            />
            {errors.busCapacity && (
              <span
                style={{
                  color: "red",
                }}
              >
                {errors.busCapacity}
              </span>
            )}
          </div>

          <br />

          <button className="btn btn-success btn-md mx-2 ">Add</button>
          <Link className="btn btn-light  btn-md mx-2" to={"/bushome"}>
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}

export default AddBus;
