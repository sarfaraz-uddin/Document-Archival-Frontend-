
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTestCaseForModule } from "../../../slices/qaManagment/Test/thunk";
import TableContainer from "../../Common/TableContainerReactTable";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { deleteTestCaseByID } from "../../../slices/qaManagment/Test/thunk";
import DOMPurify from 'dompurify';
//import reacthottoast




export default function TestCaseTable(props) {
  const dispatch = useDispatch();
  const testCaseData = useSelector(state => state.TestCase.testcase);


  useEffect(() => {
    //fetch all the testcases for the module
    dispatch(fetchTestCaseForModule(props.id));
  },[dispatch, props.id])

  const createMarkup = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  //delete testcase byid
  const handleDelete = (testid) => {
    dispatch(deleteTestCaseByID(testid));
  }


  const columns = [
    {
      Header: "ID",
      accessor: "id",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Title",
      accessor: "testTitle",
      disableFilters: true,
      filterable: false,
      
    },
    {
      Header: "Scenario",
      accessor: "scenario",
      disableFilters: true,
      filterable: false,
      Cell: ({ value }) => <div dangerouslySetInnerHTML={createMarkup(value)} />,
    },
    {
      Header: "Description",
      accessor: "Description",
      disableFilters: true,
      filterable: false,
      Cell: ({ value }) => <div dangerouslySetInnerHTML={createMarkup(value)} />,

    },
    {
      Header: "Pre-requisite",
      accessor: "PreRequisities",
      disableFilters: true,
      filterable: false,
      Cell: ({ value }) => <div dangerouslySetInnerHTML={createMarkup(value)} />,

    },
    {
      Header: "Steps",
      accessor: "TestSteps",
      disableFilters: true,
      filterable: false,
      Cell: ({ value }) => <div dangerouslySetInnerHTML={createMarkup(value)} />,

    },
    {
        Header: "Data",
        accessor: "TestData",
        disableFilters: true,
        filterable: false,
        Cell: ({ value }) => <div dangerouslySetInnerHTML={createMarkup(value)} />,

      },
      {
        Header: "Expected Result",
        accessor: "ExpectedResult",
        disableFilters: true,
        filterable: false,
        Cell: ({ value }) => <div dangerouslySetInnerHTML={createMarkup(value)} />,

      },
      // {
      //   Header: "Status",
      //   accessor: row => row.Status.toString(),
      //   disableFilters: true,
      //   filterable: false,
      // },
  
    {
      Header: "Action",
      Cell: ({ row }) => (
        <div className="hstack gap-3  text-center">
          <Link className="link-success" onClick={()=>props.onEditTest(row.original)} >
            <i className="ri-edit-2-line"></i>
          </Link>
          <Link onClick={() => handleDelete(row.original.id)}
            className="link-danger "
          >
            <i className="ri-delete-bin-line"></i>
          </Link>
          <Link to={`/project/module/testcase/${row.original.id}`}
            className="link-danger "
          >
            <i className="ri-eye-line text-info"></i>
          </Link>

         
        </div>
      ),
    },
  ];



  return (
    <React.Fragment>
      {/* Display loading state */}
     
        <TableContainer
          columns={columns}
          data={testCaseData}
          isPagination={true}
          isGlobalFilter={true}
          iscustomPageSize={false}
          isBordered={false}
          customPageSize={10}
          className="custom-header-css tabletable-striped-columns align-middle table-nowrap "
          tableClassName="table-centered  align-middle table-nowrap mb-0"
          theadClassName="text-danger table-light text-center "
          SearchPlaceholder="Search..."
        />
   
    </React.Fragment>
  );
}

