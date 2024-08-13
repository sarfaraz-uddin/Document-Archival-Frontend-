
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUserById, updateUserById } from "../../../slices/qaManagment/UserManagement/thunk";  // Make sure to import your thunk correctly
import TableContainer from "../../../Components/Common/TableContainerReactTable";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

export default function UserList({onEditUser,columns,municipalities}) {
  const data = React.useMemo(() => municipalities, [municipalities]);
  const tableColumns = React.useMemo(() => columns, [columns]);
  const dispatch = useDispatch();

  console.log(municipalities);
  // Fetch users from Redux state
  const users = useSelector((state) => state.User.users);
  console.log("users", users)
  const loading = useSelector((state) => state.User.loading);
  const error = useSelector((state) => state.User.error);

  useEffect(() => {
    // Fetch users when the component mounts
    dispatch(getUsers());
  }, [dispatch]);

  // const columns = [
  //   {
  //     Header: "ID",
  //     accessor: "id",
  //     disableFilters: true,
  //     filterable: false,
  //   },
  //   {
  //     Header: "username",
  //     accessor: "username",
  //     disableFilters: true,
  //     filterable: false,
  //   },
  //   {
  //     Header: "Firstname",
  //     accessor: "firstname",
  //     disableFilters: true,
  //     filterable: false,
  //   },
  //   {
  //     Header: "LastName",
  //     accessor: "lastname",
  //     disableFilters: true,
  //     filterable: false,
  //   },
  //   {
  //     Header: "password",
  //     accessor: "password",
  //     disableFilters: true,
  //     filterable: false,
  //   },
  //   {
  //     Header: "role",
  //     accessor: "role",
  //     disableFilters: true,
  //     filterable: false,
  //   },
  
  //   {
  //     Header: "Action",
  //     Cell: ({ row }) => (
  //       <div className="hstack gap-3 flex-wrap">
  //         <Link className="link-success fs-15" onClick={() => onEditUser(row.original)}>
  //           <i className="ri-edit-2-line"></i>
  //         </Link>
  //         <Link
  //           className="link-danger fs-15"
  //           onClick={() => handleDeleteUser(row.original.id)}
  //         >
  //           <i className="ri-delete-bin-line"></i>
  //         </Link>
  //       </div>
  //     ),
  //   },
  // ];

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
          columns={tableColumns}
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

