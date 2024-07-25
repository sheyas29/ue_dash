import React, { useState } from 'react';
import { PlusCircle, X } from 'lucide-react';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card';

const EmployeeList = ({ employees, contractId, onEdit, onDelete, onAdd }) => {
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    epf: '',
    esic: '',
    bankAccount: '',
    aadhar: '',
    mobile: '',
    dailyWage: '',
    jobRole: '',
    ifsc: '' // Added IFSC field
  });

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    epf: '',
    esic: '',
    bankAccount: '',
    aadhar: '',
    mobile: '',
    dailyWage: '',
    jobRole: '',
    ifsc: '' // Added IFSC field
  });

  const handleEditClick = (employee) => {
    setEditingEmployee(employee._id);
    setEditForm({
      name: employee.name,
      epf: employee.epf,
      esic: employee.esic,
      bankAccount: employee.bankAccount,
      aadhar: employee.aadhar,
      mobile: employee.mobile,
      dailyWage: employee.dailyWage,
      jobRole: employee.jobRole,
      ifsc: employee.ifsc // Added IFSC field
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({
      ...newEmployee,
      [name]: value,
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(editingEmployee, editForm);
    setEditingEmployee(null);
  };

  const handleDeleteClick = (id) => {
    onDelete(id);
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    onAdd(newEmployee);
    setNewEmployee({
      name: '',
      epf: '',
      esic: '',
      bankAccount: '',
      aadhar: '',
      mobile: '',
      dailyWage: '',
      jobRole: '',
      ifsc: '' // Reset IFSC field
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center py-3">
        <h2 className="text-2xl font-bold text-center">Employee List</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? <X className="mr-2" /> : <PlusCircle className="mr-2" />}
          {showForm ? 'Close Form' : 'Add Employee'}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Employee</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddEmployee} className="space-y-4">
              <Input type="text" name="name" placeholder="Name" value={newEmployee.name} onChange={handleNewInputChange} required  />
              <Input type="text" name="epf" placeholder="EPF" value={newEmployee.epf} onChange={handleNewInputChange} required />
              <Input type="text" name="esic" placeholder="ESIC" value={newEmployee.esic} onChange={handleNewInputChange} required />
              <Input type="text" name="bankAccount" placeholder="Bank Account" value={newEmployee.bankAccount} onChange={handleNewInputChange} required />
              <Input type="text" name="aadhar" placeholder="Aadhar" value={newEmployee.aadhar} onChange={handleNewInputChange} required  />
              <Input type="text" name="mobile" placeholder="Mobile" value={newEmployee.mobile} onChange={handleNewInputChange} required />
              <Input type="number" name="dailyWage" placeholder="Daily Wage" value={newEmployee.dailyWage} onChange={handleNewInputChange} required  />
              <Input type="text" name="jobRole" placeholder="Job Role" value={newEmployee.jobRole} onChange={handleNewInputChange} required />
              <Input type="text" name="ifsc" placeholder="IFSC" value={newEmployee.ifsc} onChange={handleNewInputChange} required /> {/* Added IFSC field */}
              <Button type="submit">Add Employee</Button>
            </form>
          </CardContent>
        </Card>
      )}

      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <table className="w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr style={{ backgroundColor: '#e63946' }}>
              <th className="px-4 py-2 text-white">Name</th>
              <th className="px-4 py-2 text-white">Job</th>
              <th className="px-4 py-2 text-white">ESIC</th>
              <th className="px-4 py-2 text-white">EPF</th>
              <th className="px-4 py-2 text-white">Bank Account</th>
              <th className="px-4 py-2 text-white">IFSC</th>
              <th className="px-4 py-2 text-white">Aadhar</th>
              <th className="px-4 py-2 text-white">Mobile</th>
              <th className="px-4 py-2 text-white">Daily Wage</th>
              <th className="px-4 py-2 text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id} className="border-b border-gray-200 hover:bg-gray-50">
                {editingEmployee === employee._id ? (
                  <>
                    <td><Input type="text" name="name" value={editForm.name} onChange={handleInputChange} required /></td>
                    <td><Input type="text" name="jobRole" value={editForm.jobRole} onChange={handleInputChange} required /></td>
                    <td><Input type="text" name="esic" value={editForm.esic} onChange={handleInputChange} required /></td>
                    <td><Input type="text" name="epf" value={editForm.epf} onChange={handleInputChange} required /></td>
                    <td><Input type="text" name="bankAccount" value={editForm.bankAccount} onChange={handleInputChange} required /></td>
                    <td><Input type="text" name="ifsc" value={editForm.ifsc} onChange={handleInputChange} required /></td>
                    <td><Input type="text" name="aadhar" value={editForm.aadhar} onChange={handleInputChange} required /></td>
                    <td><Input type="text" name="mobile" value={editForm.mobile} onChange={handleInputChange} required /></td>
                    <td><Input type="number" name="dailyWage" value={editForm.dailyWage} onChange={handleInputChange} required /></td>
                    <td className="space-x-2">
                      <Button onClick={handleEditSubmit}>Save</Button>
                      <Button onClick={() => setEditingEmployee(null)}>Cancel</Button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-2">{employee.name}</td>
                    <td className="px-4 py-2">{employee.jobRole}</td>
                    <td className="px-4 py-2">{employee.esic}</td>
                    <td className="px-4 py-2">{employee.epf}</td>
                    <td className="px-4 py-2">{employee.bankAccount}</td>
                    <td className="px-4 py-2">{employee.ifsc}</td>
                    <td className="px-4 py-2">{employee.aadhar}</td>
                    <td className="px-4 py-2">{employee.mobile}</td>
                    <td className="px-4 py-2">{employee.dailyWage}</td>
                    <td className="px-4 py-2 space-x-2">
                      <Button onClick={() => handleEditClick(employee)}>Edit</Button>
                      <Button onClick={() => handleDeleteClick(employee._id)}>Delete</Button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeList;
