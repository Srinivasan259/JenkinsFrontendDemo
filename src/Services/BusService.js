import React, { Component } from "react";
import axios from "axios";

const addbus = "http://localhost:8080/addbus"; // adding the bus
const findAllbus = "http://localhost:8080/bus"; // get all  busses
const findBusbyId = "http://localhost:8080/findBusbyId/"; // find bus by id
const findBusbyName = "http://localhost:8080/findBusbyName/"; // find bus by name
const deletebus = "http://localhost:8080/deletebus/"; // delete by id
const updatebus = "http://localhost:8080/updatebus"; // update bus
const getallbusId = "http://localhost:8080/getAllbusids";

class BusService extends Component {
  addBus(addDept) {
    return axios.post(addbus, addDept);
  }

  getAllBus() {
    return axios.get(findAllbus);
  }

  getAllBusId() {
    return axios.get(getallbusId);
  }

  getBusById(busId) {
    return axios.get(findBusbyId + busId);
  }

  getBusByName(busName) {
    return axios.get(findBusbyName + busName);
  }

  updateBus(addDept) {
    return axios.put(updatebus, addDept);
  }

  deleteBus(busId) {
    return axios.delete(deletebus + busId);
  }
}
export default new BusService();
