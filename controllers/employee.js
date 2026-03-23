import { query } from "../utils/connectToDB.js";
import {
  createRoleQuery,
  createEmployeeTableQuery,
  getALLEmployeeQuery,
  createEmployeeQuery
} from "../utils/sqlQuery.js";
import { createError } from "../utils/error.js";

// Get all employees
export async function getAllEmployee(req, res, next) {
  try {

    const response = await query(
      "SELECT to_regclass('employee_details');"
    );

    console.log(response.rows);

    // Create table if not exists
    if (!response.rows[0].to_regclass) {
      await query(createRoleQuery);
      await query(createEmployeeTableQuery);
    }

    const { rows } = await query(getALLEmployeeQuery);

    res.status(200).json(rows);

  } catch (error) {

    console.log(error.message);

    return next(
      createError(400, "Couldn't get employee details")
    );

  }
}

// Get single employee
export async function getEmployee(req, res, next) {
  try {
    const {name,role,salary,age,email} = req.body;
    if(!name || !email || !age || !salary) {
      return req.status(400).json({error : "Missing fields"})
    };
      const data = await query(createEmployeeQuery, [name, email, age, role, salary]);  
    } catch (error) {
   
  }

}

// Create employee
export async function createEmployee(req, res, next) {

}

// Update employee
export async function updateEmployee(req, res, next) {

}

// Delete employee
export async function deleteEmployee(req, res, next) {

}