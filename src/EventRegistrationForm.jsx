import "./EventRegistration.css";
import React, { useState, useEffect } from 'react';

const EventRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    attendingWithGuest: 'no',
    guestName: ''
  });

  const [errors, setErrors] = useState({});
  const [showSummary, setShowSummary] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    let formErrors = {};

    if (!formData.name) formErrors.name = 'Name is required';
    if (!formData.email) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email address is invalid';
    }
    if (!formData.age) {
      formErrors.age = 'Age is required';
    } else if (isNaN(formData.age) || formData.age <= 0) {
      formErrors.age = 'Age must be a number greater than 0';
    }
    if (formData.attendingWithGuest === 'yes' && !formData.guestName) {
      formErrors.guestName = 'Guest name is required';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setShowSummary(true);
    }
  };

  return (
    <div>
      <h1>Event Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </label>
          {errors.age && <p>{errors.age}</p>}
        </div>
        <div>
          <label>
            Are you attending with a guest?
            <select
              name="attendingWithGuest"
              value={formData.attendingWithGuest}
              onChange={handleChange}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </label>
        </div>
        {formData.attendingWithGuest === 'yes' && (
          <div>
            <label>
              Guest Name:
              <input
                type="text"
                name="guestName"
                value={formData.guestName}
                onChange={handleChange}
              />
            </label>
            {errors.guestName && <p>{errors.guestName}</p>}
          </div>
        )}
        <button type="submit">Submit</button>
      </form>

      {showSummary && (
        <div>
          <h2>Summary</h2>
          <p>Name: {formData.name}</p>
          <p>Email: {formData.email}</p>
          <p>Age: {formData.age}</p>
          <p>Attending with Guest: {formData.attendingWithGuest === 'yes' ? 'Yes' : 'No'}</p>
          {formData.attendingWithGuest === 'yes' && <p>Guest Name: {formData.guestName}</p>}
        </div>
      )}
    </div>
  );
};

export default EventRegistrationForm;
