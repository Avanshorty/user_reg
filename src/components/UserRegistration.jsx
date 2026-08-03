import { useState } from "react";
import "./UserRegistration.css";

const hobbies = [
  {
    value: "music",
    name: "Music",
  },
  {
    value: "movie",
    name: "Movies",
  },
  {
    value: "plastic-model",
    name: "Plastic Model",
  },
];

const genders = [
  {
    value: "male",
    name: "Male",
  },
  {
    value: "female",
    name: "Female",
  },
  {
    value: "others",
    name: "Others",
  },
];

const departments = {
  accounting: ["Accountant", "Senior Accountant", "Payroll Officer"],

  informationTechnology: [
    "Software Developer",
    "System Analyst",
    "IT Support",
  ],

  humanResources: ["HR Officer", "Recruiter", "HR Manager"],
};

const departmentNames = {
  accounting: "Accounting",
  informationTechnology: "Information Technology",
  humanResources: "Human Resources",
};

function UserRegistration() {
  const defaultForm = {
    username: "",
    firstname: "",
    lastname: "",
    gender: "",
    hobbies: [],
    department: "",
    jobPosition: "",
  };

  const [formData, setFormData] = useState(defaultForm);
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "department") {
      setFormData({
        ...formData,
        department: value,
        jobPosition: "",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleHobbyChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setFormData({
        ...formData,
        hobbies: [...formData.hobbies, value],
      });
    } else {
      setFormData({
        ...formData,
        hobbies: formData.hobbies.filter((hobby) => hobby !== value),
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmittedData({ ...formData });
  };

  const handleReset = () => {
    setFormData(defaultForm);
    setSubmittedData(null);
  };

  return (
    <div className="registration-container">
      <h2>User Registration</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="username">Username</label>

          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label htmlFor="firstname">Firstname</label>

          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label htmlFor="lastname">Lastname</label>

          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label>Gender</label>

          <div className="options">
            {genders.map((gender) => (
              <label key={gender.value}>
                <input
                  type="radio"
                  name="gender"
                  value={gender.value}
                  checked={formData.gender === gender.value}
                  onChange={handleChange}
                />

                {gender.name}
              </label>
            ))}
          </div>
        </div>

        <div className="form-row">
          <label>Hobbies</label>

          <div className="options">
            {hobbies.map((hobby) => (
              <label key={hobby.value}>
                <input
                  type="checkbox"
                  name="hobbies"
                  value={hobby.value}
                  checked={formData.hobbies.includes(hobby.value)}
                  onChange={handleHobbyChange}
                />

                {hobby.name}
              </label>
            ))}
          </div>
        </div>

        <div className="form-row">
          <label htmlFor="department">Department</label>

          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="">Please select</option>

            {Object.keys(departments).map((department) => (
              <option key={department} value={department}>
                {departmentNames[department]}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label htmlFor="jobPosition">Job Position</label>

          <select
            id="jobPosition"
            name="jobPosition"
            value={formData.jobPosition}
            onChange={handleChange}
            disabled={!formData.department}
          >
            <option value="">Please select</option>

            {formData.department &&
              departments[formData.department].map((position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
          </select>
        </div>

        <hr />

        <div className="button-area">
          <button type="button" onClick={handleReset}>
            Reset
          </button>

          <button type="submit">Submit</button>
        </div>
      </form>

      {submittedData && (
        <div className="result">
          <h3>Submitted Data</h3>

          <p>Username: {submittedData.username}</p>
          <p>Firstname: {submittedData.firstname}</p>
          <p>Lastname: {submittedData.lastname}</p>
          <p>Gender: {submittedData.gender}</p>

          <p>
            Hobbies:{" "}
            {submittedData.hobbies.length > 0
              ? submittedData.hobbies.join(", ")
              : "None"}
          </p>

          <p>
            Department:{" "}
            {departmentNames[submittedData.department] || ""}
          </p>

          <p>Job Position: {submittedData.jobPosition}</p>
        </div>
      )}
    </div>
  );
}

export default UserRegistration;