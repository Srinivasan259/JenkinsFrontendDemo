import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BusHome from "./Pages/BusHome";
import AddBus from "./Pages/AddBus";
import UpdateBus from "./Pages/UpdateBus";
import PassengerHome from "./Pages/PassengerHome";
import Index from "./Layout/Index";
import AddPassenger from "./Pages/AddPassenger";
import UpdatePassengers from "./Pages/UpdatePassenger";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/bushome" element={<BusHome />}></Route>
          <Route path="/addbus" element={<AddBus />}></Route>
          <Route path="/updateBus/:Id" element={<UpdateBus />}></Route>

          <Route path="/passhome" element={<PassengerHome />}></Route>
          <Route path="/" element={<Index />} />
          <Route path="/addpass" element={<AddPassenger />} />
          <Route
            path="/updatepass/:passengerId"
            element={<UpdatePassengers />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
