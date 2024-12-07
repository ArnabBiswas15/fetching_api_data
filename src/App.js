// App.js
import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]); // All fetched users
  const [filteredUsers, setFilteredUsers] = useState([]); // Filtered users
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const rowsPerPage = 5; // Users per page

  useEffect(() => {
    // Fetch user data from API on component mount
    const fetchUsers = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
    };

    fetchUsers();
  }, []);

  // Get current page's users
  const getCurrentPageUsers = () => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredUsers.slice(start, end);
  };

  // Handle search input
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to the first page
  };

  // Handle pagination
  const changePage = (direction) => {
    setCurrentPage(currentPage + direction);
  };

  return (
    <div className="app">
      <h1>User List Dashboard</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name..."
          onChange={handleSearch}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company Name</th>
          </tr>
        </thead>
        <tbody>
          {getCurrentPageUsers().map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.company.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => changePage(-1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(filteredUsers.length / rowsPerPage)}
        </span>
        <button
          disabled={currentPage === Math.ceil(filteredUsers.length / rowsPerPage)}
          onClick={() => changePage(1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
