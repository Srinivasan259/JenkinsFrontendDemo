import React, { Component } from "react";
import axios from "axios";

const addpass = "http://localhost:8080/addpass"; // adding the pass
const findAllpass = "http://localhost:8080/passenger"; // get all  pass
const findPassbyId = "http://localhost:8080/findPassengerbyId/"; // find pass by id

const deletepass = "http://localhost:8080/deletepass/"; // delete by id
const updatepas = "http://localhost:8080/updatepass"; // update pass
const getallpassId = "http://localhost:8080/getAllpassengerids";

class PassengerService extends Component {
  addPass(buses) {
    return axios.post(addpass, buses);
  }

  getAllPass() {
    return axios.get(findAllpass);
  }

  getAllPassId() {
    return axios.get(getallpassId);
  }

  getPassById(passengerId) {
    return axios.get(findPassbyId + passengerId);
  }

  updatePass(editemployee) {
    return axios.put(updatepas, editemployee);
  }

  deletePass(passengerId) {
    return axios.delete(deletepass + passengerId);
  }
}
export default new PassengerService();
