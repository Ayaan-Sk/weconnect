import React, { useState } from 'react';

const SignupPage = () => {
  const [selectedUserType, setSelectedUserType] = useState('');
  const [formData, setFormData] = useState({});

  const handleUserTypeChange = (event) => {
    setSelectedUserType(event.target.value);
    setFormData({}); // Clear form data when user type changes
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let apiEndpoint = '';
    switch (selectedUserType) {
      case 'Student':
        apiEndpoint = '/api/students/signup'; // Replace with your actual student signup endpoint
        break;
      case 'College':
        apiEndpoint = '/api/colleges/signup'; // Replace with your actual college signup endpoint
        break;
      case 'Alumni':
        apiEndpoint = '/api/alumni/signup'; // Replace with your actual alumni signup endpoint
        break;
      case 'HR':
        apiEndpoint = '/api/hr/signup'; // Replace with your actual HR signup endpoint
        break;
      default:
        console.error('Invalid user type selected.');
        return;
    }

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Signup successful:', data);
        // Handle successful signup (e.g., redirect to login, show success message)
      } else {
        console.error('Signup failed:', data.message || 'Something went wrong');
        // Handle signup errors (e.g., display error message to user)
      }
    } catch (error) {
      console.error('Error during signup:', error);
      // Handle network errors or other exceptions
    }
  };

  const renderFormFields = () => {
    // This function will conditionally render fields based on selectedUserType
    switch (selectedUserType) {
      case 'Student':
        return (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="studentName">
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="studentName"
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name || ''}
                onChange={handleInputChange}
              />
            </div>
             <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="studentId">
                Student ID
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="studentId"
                type="text"
                placeholder="Student ID"
                name="studentId"
                value={formData.studentId || ''}
                onChange={handleInputChange}
              />
            </div>
             <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="departmentId">
                Department ID
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="departmentId"
                type="text"
                placeholder="Department ID"
                name="departmentId"
                value={formData.departmentId || ''}
                onChange={handleInputChange}              />
            </div>
          </>
        );
      case 'College':
        return (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="collegeName">
                College Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="collegeName"
                type="text"
                placeholder="College Name"
                name="collegeName"
                value={formData.collegeName || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                type="text"
                placeholder="Address"
                name="address"
                value={formData.address || ''}
                onChange={handleInputChange}
              />
            </div>
             <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactInfo">
                Contact Information
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="contactInfo"
                type="text"
                placeholder="Contact Information"
                name="contactInfo"
                value={formData.contactInfo || ''}                onChange={handleInputChange}              />
            </div>
          </>
        );
      case 'Alumni':
        return (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="alumniName">
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="alumniName"
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name || ''}
                onChange={handleInputChange}
              />
            </div>
             <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="enrollmentNumber">
                Enrollment Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="enrollmentNumber"
                type="text"
                placeholder="Enrollment Number"
                name="enrollmentNumber"
                value={formData.enrollmentNumber || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="graduationYear">
                Graduation Year
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="graduationYear"
                type="text"
                placeholder="Graduation Year"
                name="graduationYear"
                value={formData.graduationYear || ''}                onChange={handleInputChange}              />
            </div>
          </>
        );
      case 'HR':
        return (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hrName">
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="hrName"
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
                Company
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="company"
                type="text"
                placeholder="Company"
                name="company"
                value={formData.company || ''}
                onChange={handleInputChange}
              />
            </div>
             <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">
                Position
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="position"
                type="text"
                placeholder="Position"
                name="position"
                value={formData.position || ''}                onChange={handleInputChange}              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userType">
            Select User Type
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="userType"
            value={selectedUserType}
            onChange={handleUserTypeChange}
          >
            <option value="">-- Select --</option>
            <option value="Student">Student</option>
            <option value="College">College</option>
            <option value="Alumni">Alumni</option>
            <option value="HR">HR</option>
          </select>
        </div>

        {selectedUserType && (
          <form onSubmit={handleSubmit}>
             {/* Common fields */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password || ''}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Render specific fields based on selected user type */}
            {renderFormFields()}

            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignupPage;