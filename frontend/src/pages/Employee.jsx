import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Employees.module.css";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Add Modal
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    fullname: "",
    address: "",
  });

  // Edit Modal
  const [showEditForm, setShowEditForm] = useState(false);
  const [editEmployee, setEditEmployee] = useState({
    emp_id: "",
    firstname: "",
    middlename: "",
    lastname: "",
    fullname: "",
    address: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios
      .get("http://localhost:8000/api/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error("Error fetching employees", err));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure?")) return;

    axios
      .delete(`http://localhost:8000/api/employees/${id}`)
      .then(() => setEmployees(employees.filter((emp) => emp.emp_id !== id)))
      .catch((err) => console.error("Error deleting employee", err));
  };

  const handleAddEmployee = () => {
    const fullname = `${newEmployee.firstname} ${newEmployee.middlename} ${newEmployee.lastname}`;
    const employeeData = { ...newEmployee, fullname };

    axios
      .post("http://localhost:8000/api/employees", employeeData)
      .then(() => {
        fetchEmployees();
        setShowAddForm(false);
        setNewEmployee({ firstname: "", middlename: "", lastname: "", fullname: "", address: "" });
      })
      .catch((err) => console.error("Error adding employee", err));
  };

  // OPEN EDIT MODAL
  const handleEditOpen = (emp) => {
    setEditEmployee(emp);
    setShowEditForm(true);
  };

  // UPDATE EMPLOYEE
  const handleUpdateEmployee = () => {
    const fullname = `${editEmployee.firstname} ${editEmployee.middlename} ${editEmployee.lastname}`;
    const updatedData = { ...editEmployee, fullname };

    axios
      .put(`http://localhost:8000/api/employees/${editEmployee.emp_id}`, updatedData)
      .then(() => {
        fetchEmployees();
        setShowEditForm(false);
      })
      .catch((err) => console.error("Error updating employee", err));
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1>Employees</h1>

      <div className={styles.topBar}>
        <input
          type="text"
          placeholder="Search employee..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <button className={styles.addBtn} onClick={() => setShowAddForm(true)}>
          + Add New Employee
        </button>
      </div>

      {/* ADD MODAL */}
      {showAddForm && (
        <div
          className={styles.modalOverlay}
          onClick={(e) => e.target === e.currentTarget && setShowAddForm(false)}
        >
          <div className={styles.modal}>
            <h3>Add New Employee</h3>

            <input
              type="text"
              placeholder="First Name"
              value={newEmployee.firstname}
              onChange={(e) => setNewEmployee({ ...newEmployee, firstname: e.target.value })}
            />
            <input
              type="text"
              placeholder="Middle Name"
              value={newEmployee.middlename}
              onChange={(e) => setNewEmployee({ ...newEmployee, middlename: e.target.value })}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={newEmployee.lastname}
              onChange={(e) => setNewEmployee({ ...newEmployee, lastname: e.target.value })}
            />
            <input
              type="text"
              placeholder="Address"
              value={newEmployee.address}
              onChange={(e) => setNewEmployee({ ...newEmployee, address: e.target.value })}
            />

            <div className={styles.modalBtns}>
              <button className={styles.saveBtn} onClick={handleAddEmployee}>Add</button>
              <button className={styles.cancelBtn} onClick={() => setShowAddForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {showEditForm && (
        <div
          className={styles.modalOverlay}
          onClick={(e) => e.target === e.currentTarget && setShowEditForm(false)}
        >
          <div className={styles.modal}>
            <h3>Edit Employee</h3>

            <input
              type="text"
              placeholder="First Name"
              value={editEmployee.firstname}
              onChange={(e) => setEditEmployee({ ...editEmployee, firstname: e.target.value })}
            />
            <input
              type="text"
              placeholder="Middle Name"
              value={editEmployee.middlename}
              onChange={(e) => setEditEmployee({ ...editEmployee, middlename: e.target.value })}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={editEmployee.lastname}
              onChange={(e) => setEditEmployee({ ...editEmployee, lastname: e.target.value })}
            />
            <input
              type="text"
              placeholder="Address"
              value={editEmployee.address}
              onChange={(e) => setEditEmployee({ ...editEmployee, address: e.target.value })}
            />

            <div className={styles.modalBtns}>
              <button className={styles.saveBtn} onClick={handleUpdateEmployee}>Update</button>
              <button className={styles.cancelBtn} onClick={() => setShowEditForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredEmployees.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>No employees found</td>
            </tr>
          ) : (
            filteredEmployees.map((emp) => (
              <tr key={emp.emp_id}>
                <td>{emp.emp_id}</td>
                <td>{emp.fullname}</td>
                <td>{emp.address}</td>
                <td>
                  <button
                    className={styles.editBtn}
                    onClick={() => handleEditOpen(emp)}
                  >
                    Edit
                  </button>

                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(emp.emp_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;
