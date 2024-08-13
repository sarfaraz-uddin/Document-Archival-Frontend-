import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  deleteUserById,
  updateUserById,
} from "../../../slices/qaManagment/UserManagement/thunk"; // Make sure to import your thunk correctly
import TableContainer from "../../../Components/Common/TableContainerReactTable";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

export default function List({ onEditUser, columns, data }) {
  console.log(data);
  const dispatch = useDispatch();

  // Fetch users from Redux state
  const users = useSelector((state) => state.User.users);
  console.log("users", users);
  const loading = useSelector((state) => state.User.loading);
  const error = useSelector((state) => state.User.error);

  useEffect(() => {
    // Fetch users when the component mounts
    dispatch(getUsers());
  }, [dispatch]);

  const handleDeleteUser = (userId) => {
    dispatch(deleteUserById(userId));
  };

  return (
    <React.Fragment>
      {/* Display loading state */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <TableContainer
          columns={columns}
          data={data}
          isPagination={true}
          isGlobalFilter={true}
          iscustomPageSize={false}
          isBordered={false}
          customPageSize={4}
          className="custom-header-css table align-middle table-nowrap"
          tableClassName="table-centered align-middle table-nowrap mb-0"
          theadClassName="text-muted table-light"
          SearchPlaceholder="Search..."
        />
      )}
    </React.Fragment>
  );
}
