import "../scss/TaskList.scss";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, getTasks, reset } from "../redux/taskSlice";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

// Table Header Columns
const columns = [
  { field: "id", headerName: "ID", width: 230 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "startDate", headerName: "Start Date", width: 130 },
  { field: "endDate", headerName: "Start Date", width: 130 },
  { field: "Project", headerName: "Project", width: 130 },
  { field: "description", headerName: "Description", width: 130 },
  { field: "assignees", headerName: "Asignees", width: 130 },
  { field: "Priority ", headerName: "Priority", width: 130 },
 
];

const TaskList = () => {
  const [taskList, setTaskList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    tasks,
    isGetTasksSuccess,
    isGetTasksError,
    isDeleteTaskSuccess,
    isDeleteTaskError,
    message,
  } = useSelector((state) => state.task);

  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(getTasks());
    } else {
      setTaskList(tasks);
    }
  }, [dispatch, tasks.length, tasks]);

  useEffect(() => {
    if (isGetTasksError) {
      dispatch(reset());
    }
    if (isGetTasksSuccess) {
      setTaskList(tasks);
      dispatch(reset());
    }
  }, [
    tasks,
    isGetTasksSuccess,
    isGetTasksError,
    message,
    dispatch,
    setTaskList,
  ]);

  useEffect(() => {
    if (isDeleteTaskError) {
      toast.error(`Error occured: ${message.message}`);
      dispatch(reset());
    }
    if (isDeleteTaskSuccess) {
      toast.success("Task Deletion successful");
      dispatch(reset());
      dispatch(getTasks());
      navigate("/");
    }
  }, [isDeleteTaskError, isDeleteTaskSuccess, message, dispatch, navigate]);

  const handleEdit = (id) => {
    navigate(`edit/${id}`);
  };

  const handleDelete = (taskId) => {
    const task = taskList.filter((u) => taskId === u.id)[0];
    confirmAlert({
      title: `Task: ${task.name}`,
      message: "Are you sure to delete the task ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(deleteTask(taskId));
          },
        },
        {
          label: "No",
          onClick: () => {
            console.log("Deletion Canceled");
          },
        },
      ],
    });
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (

          <div className="cellAction">
            <div
              className="editButton"
              onClick={() => handleEdit(params.row.id)}
            >
              Edit
            </div>
            <div
              className="deleteButton deleteTask"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="task-list" >
      <div className="table" style={{height: '300px',width: '100%'}}>
        <DataGrid
          rows={taskList}
          columns={columns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default TaskList;
