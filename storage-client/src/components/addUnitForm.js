import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddUnit = () => {
    const [formData, setFormData] = useState({
        name: '',
        photo: '',
        city: '',
        street: '',
        contactPerson: '',
        contactPhone: ''
    });
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length === 0) {
            // Form is valid, perform submission logic here
            console.log(formData);
            // Make Axios POST request to login endpoint
            const response = await axios.post('http://localhost:3000/storage/unit', {
                ...formData
            });
            // Reset the form fields
            setFormData({
                name: '',
                photo: '',
                city: '',
                street: '',
                contactPerson: '',
                contactPhone: ''
            });
            navigate('/');
        } else {
            // Set the validation errors
            setErrors(validationErrors);
        }
    };

    const validateForm = () => {
        const errors = {};
        // Validate name field
        if (!formData.name || formData.name.length < 2) {
            errors.name = 'Please enter a valid name (minimum 2 characters)';
        }

        // Validate city field
        if (!formData.city || formData.city.length < 2) {
            errors.city = 'Please enter a valid city (minimum 2 characters)';
        }

        // Validate street field
        if (!formData.street || formData.street.length < 2) {
            errors.street = 'Please enter a valid street (minimum 2 characters)';
        }

        // Validate phone number format using regex
        const phoneRegex = /^(\+972|0)[2-9]\d{1,2}[-\s]?\d{3}[-\s]?\d{4}$/;// Israeli phone number format
        if (formData.contactPhone && !phoneRegex.test(formData.contactPhone)) {
            errors.contactPhone = 'Please enter a valid Israeli phone number';
        }

        // Add more complex validation rules for other form fields if needed
        // For example, checking for required fields, length limits, etc.

        return errors;
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="w-1/2 p-8 bg-gray-100 rounded-lg" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-4">Add Unit</h2>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Unit Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        required
                    />
                    {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Photo:</label>
                    <input
                        type="text"
                        name="photo"
                        value={formData.photo}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">City:</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Street:</label>
                    <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Contact Person:</label>
                    <input
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        required
                    />
                    {errors.contactPerson && <p className="text-red-500">{errors.contactPerson}</p>}
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Contact Phone:</label>
                    <input
                        type="text"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        required
                    />
                    {errors.contactPhone && <p className="text-red-500">{errors.contactPhone}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddUnit;
