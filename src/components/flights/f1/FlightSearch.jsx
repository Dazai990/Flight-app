import React, { useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import cities from "../../database/city_data";
import airClass from "../../database/class_data";
import flightList from "../../database/flight_data";
import FlightSearchResult from "./FlightSearchResult";

const FlightSearch = () => {
  const [newSearch, setNewSearch] = useState({
    flightType: '',
    fromPlace: '',
    toPlace: '',
    departDate: '',
    airClass: '',
    adult: '',
    child: '',
    infant: ''
  });

  const [filteredCities, setFilteredCities] = useState(cities);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setNewSearch((prev) => ({
      ...prev,
      [field]: value
    }));

    if (field === "fromPlace") {
      setFilteredCities(cities.filter(item => item.name !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const filteredFlights = flightList.filter((item) => {
    return (
      item.FromPlace.toLowerCase().includes(newSearch.fromPlace.toLowerCase()) &&
      item.ToPlace.toLowerCase().includes(newSearch.toPlace.toLowerCase())
    );
  });

  return (
    <>
      {!isSubmitted ? (
        <div className="container bg-light border rounded-4 p-4 shadow w-100 w-md-75 w-lg-50">
  <div className="mb-4 text-center">
    <h2 className="fw-bold text-primary">Search Flights</h2>
  </div>
  <form onSubmit={handleSubmit}>
    {/* Flight Type */}
    <div className="mb-4">
      <label className="form-label fw-bold">Flight Type:</label>
      <div className="d-flex gap-4">
        {["Round Trip", "One Way"].map((type) => (
          <div key={type} className="form-check">
            <input
              type="radio"
              id={type}
              name="flighttype"
              value={type}
              onChange={handleChange("flightType")}
              checked={newSearch.flightType === type}
              className="form-check-input"
              required
            />
            <label className="form-check-label" htmlFor={type}>
              {type}
            </label>
          </div>
        ))}
      </div>
    </div>

    {/* From - To - Date */}
    <div className="row mb-4">
      <div className="col-md-4 mb-3">
        <label htmlFor="fromCity" className="form-label fw-bold">From:</label>
        <select
          className="form-select"
          id="fromCity"
          value={newSearch.fromPlace}
          onChange={handleChange("fromPlace")}
          required
        >
          <option value="" disabled>-- Select From City --</option>
          {cities.map((city, idx) => (
            <option key={idx} value={city.shortName}>
              {city.name} ({city.shortName})
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-4 mb-3">
        <label htmlFor="toCity" className="form-label fw-bold">To:</label>
        <select
          className="form-select"
          id="toCity"
          value={newSearch.toPlace}
          onChange={handleChange("toPlace")}
          required
        >
          <option value="" disabled>-- Select To City --</option>
          {filteredCities.map((city, idx) => (
            <option key={idx} value={city.shortName}>
              {city.name} ({city.shortName})
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-4 mb-3">
        <label htmlFor="departDate" className="form-label fw-bold">Depart Date:</label>
        <input
          type="date"
          id="departDate"
          className="form-control"
          value={newSearch.departDate}
          onChange={handleChange("departDate")}
          required
        />
      </div>
    </div>

    {/* Travel Class */}
    <div className="mb-4">
      <label className="form-label fw-bold">Class:</label>
      <select
        className="form-select w-100"
        value={newSearch.airClass}
        onChange={handleChange("airClass")}
        required
      >
        <option value="" disabled>-- Select Class --</option>
        {airClass.map((item, idx) => (
          <option key={idx} value={item.className}>
            {item.className}
          </option>
        ))}
      </select>
    </div>

    {/* Traveller Details (Optional inputs can go here in future) */}
    {/* 
    You can add inputs for adults, children, infants here as needed 
    using the same column layout 
    */}

    {/* Buttons */}
    <div className="d-flex justify-content-center gap-3 mt-4">
      <button type="submit" className="btn btn-primary px-4">
        Search
      </button>
      <button
        type="button"
        className="btn btn-outline-secondary px-4"
        onClick={() => setNewSearch({
          flightType: '',
          fromPlace: '',
          toPlace: '',
          departDate: '',
          airClass: '',
          adult: '',
          child: '',
          infant: ''
        })}
      >
        Clear
      </button>
    </div>
  </form>
</div>

      ) : (
        <div className="container-fluid">
          <h2 className="text-center">Search Result</h2>
          <div className="container-fluid mb-3">
            <table className="table b-1">
              <tbody>
                <tr>
                  <td><h4>Flight Type : {newSearch.flightType} </h4></td>
                  <td><h4>From : {newSearch.fromPlace}</h4></td>
                  <td><h4>To : {newSearch.toPlace}</h4></td>
                  <td><h4>Depart Date : {newSearch.departDate}</h4></td>
                  <td>
                    <button
                      className="btn btn-info ms-2 mt-1"
                      onClick={() => setIsSubmitted(false)}
                      title="Edit Search"
                    >
                      <FaUserEdit /> Edit Search
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div>No Of Flights available: <b>{filteredFlights.length}</b></div>
          </div>

          <table className="table table-striped">
            <thead>
              <tr>
                <th>Id</th><th>Airlines</th><th>FlightCode</th><th>From</th>
                <th>To</th><th>Start</th><th>End</th><th>Class</th>
                <th>Fare</th><th>Frequency</th><th>Select</th>
              </tr>
            </thead>
            <tbody>
              {filteredFlights.map(fItem => (
                <FlightSearchResult key={fItem.id} item={fItem} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default FlightSearch;
