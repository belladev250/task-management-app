import "../scss/New.scss";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editTask, getTasks, reset } from "../redux/taskSlice";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditTask = () => {
  const [taskId, setTaskId] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
 const nameRef= useRef();
  const startdateRef = useRef();
  const enddateRef = useRef();
  const projectRef = useRef();
  const descriptionRef = useRef();
  const priorityRef = useRef();
  const assigneesRef = useRef();
  const dispatch = useDispatch();
  const { tasks, isEditTaskSuccess, isEditTaskError, message } = useSelector(
    (state) => state.task
  );

  useEffect(() => {
    if (isEditTaskError) {
      toast.error(`Error occured: ${message.message}`);
      dispatch(reset());
    }
    if (isEditTaskSuccess) {
      toast.success(`${message.message}`);
      dispatch(reset());
      dispatch(getTasks());
      nameRef.current.value="";
      startdateRef.current.value="";
        enddateRef.current.value="";
       projectRef.current.value="";
       descriptionRef.current.value="";
        priorityRef.current.value="";
        assigneesRef.current.value ="";
   
     
      setTaskId("");
      navigate("/tasks");
    }
  }, [isEditTaskSuccess, isEditTaskError, message, dispatch, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskDetails = {
      id: taskId,
      name: nameRef.current.value,
      startDate: startdateRef.current.value,
      endDate: enddateRef.current.value,
      project : projectRef.current.value,
      description : projectRef.current.value,
      priority: priorityRef.current.value,
      assignees : assigneesRef.current.value
    };

    dispatch(editTask(taskDetails));
  };

  useEffect(() => {
    const taskId = location.pathname.split("/")[3];
    setTaskId(taskId);
    const task = tasks.filter((u) => taskId === u.id)[0];
  //  nameRef.current.value = task.name,
  //  startdateRef.current.value = task.startDate,
  //  enddateRef.current.value = task.endDate,
  //  projectRef.current.value = task.project,
  //  descriptionRef.current.value = task.description,
  //  priorityRef.current.value = task.priority,
  // assigneesRef.current.value = task.assignees
 }, [tasks, location.pathname]);

  return (
    <div className="">
    <div className="new">
      <form onSubmit={handleSubmit}>
        <h1>Edit Task</h1>
        <div className="formInput">
          <label htmlFor="NAME">Name</label>
          <input
            type="text"
            id="name"
            placeholder="task name"
            ref={nameRef}
            required
          />
        </div>

        <div className="formInput">
          <label htmlFor="date">Start Date</label>
          <input type="date" id="date" ref={startdateRef} required />
        </div>

        <div className="formInput">
          <label htmlFor="date">End Date</label>
          <input type="date" id="date" ref={enddateRef} required />
        </div>

        <div className="formInput">
          <label htmlFor="project">Projects</label>
          <input
            type="text"
            id="project"
            placeholder="projects"
            ref={projectRef}
            
          />
        </div>
        <div className="formInput">
          <label htmlFor="email">Description</label>
          <input
            type="text"
            id=""
            placeholder="Description"
            ref={descriptionRef}
            required
          />
        </div>
        <div className="formInput">
          <label htmlFor="email">Assignee</label>
          <input
            type="text"
            id=""
            placeholder="Assignee"
            ref={assigneesRef}
            required
          />
         
         </div>

         <div className="formInput">
         <label htmlFor="email">Priority</label>
         <select
            id="priority"
            name="priority"
             ref={priorityRef}
            className="mt-1 p-2 border rounded-md w-full"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          </div>

        <button>Submit</button>

      </form>
    </div>
    </div>
  );
};

export default EditTask;
