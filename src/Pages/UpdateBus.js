import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BusService from "../Services/BusService";

function UpdateBus() {
  var navigate = useNavigate();

  const { Id } = useParams();

  //   const [addDept, setaddDept] = useState([]);

  const [addDept, setaddDept] = useState({
    busId: "",
    busNo: "",
    busName: "",
    busType: "",
    busCapacity: "",
  });

  const onRegChange = (e) => {
    setaddDept({ ...addDept, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e, addDept) => {
    if (
      addDept.busId !== "" &&
      addDept.busNo !== "" &&
      addDept.busName !== "" &&
      addDept.busType !== "" &&
      addDept.busCapacity !== ""
    ) {
      e.preventDefault();
      console.log(addDept);

      await BusService.updateBus(addDept).then((response) => {
        alert("Updated successfully");
        navigate("/bushome");
      });
    } else {
      alert("Please fill all fields");
    }
  };
  //------------------------------------------------------------------------------------------------------
  // to  get the data of the department to be updated
  const GetData = async (Id) => {
    await BusService.getBusById(Id)
      .then((response) => {
        console.log(response.data);
        console.log("carried");
        setaddDept(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //use effect
  useEffect(() => {
    console.log(Id);
    GetData(Id);
  }, []);

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const ValidationErrors = {};
    if (addDept.busNo === "") {
      ValidationErrors.busNo = "* bus number is required";
    }

    if (addDept.busName === "") {
      ValidationErrors.busName = "* bus name required";
    }
    if (addDept.busType === "") {
      ValidationErrors.busType = "* bus type is required";
    }
    if (addDept.busCapacity === "") {
      ValidationErrors.busCapacity = "* bus capacity is required";
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
          onSubmit={(e) => onSubmit(e, addDept)}
          className="col-md-6 offset-md-3 border rounded p-5 mt-5 shadow "
          accordion
          id="deptUpdateForm"
        >
          <h3>Edit Bus details</h3>
          <div>
            <label htmlFor="busId" className="form-label  fw-bold">
              Bus ID:
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              placeholder="Enter bus id"
              readOnly
              name="busId"
              value={addDept.busId}
              onBlur={handleSubmit}
              onChange={(e) => onRegChange(e)}
            />
            {console.log(addDept)}
            {errors.busId && (
              <span
                style={{
                  color: "red",
                }}
              >
                {errors.busId}
              </span>
            )}
          </div>
          <br />

          <div>
            <label htmlFor="busNo" className="form-label fw-bold">
              Bus No:
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              placeholder="Enter bus no"
              name="busNo"
              value={addDept.busNo}
              //onBlur={handleSubmit}
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
            <label htmlFor="busName" className="form-label fw-bold me-1   ">
              Bus Name:
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              placeholder="Enter bus name"
              name="busName"
              value={addDept.busName}
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
              value={addDept.busType}
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
              placeholder="Enter capacity"
              name="busCapacity"
              value={addDept.busCapacity}
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

          <button className="btn btn-success btn-md mx-2 ">Save</button>
          <Link className="btn btn-light  btn-md mx-2" to={"/bushome"}>
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}

export default UpdateBus;
