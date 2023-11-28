import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTasks, register, reset } from "../redux/taskSlice";
import { toast } from "react-toastify";
import "../scss/New.scss";
import { useNavigate } from "react-router-dom";
const New = () => {
  const nameRef= useRef();
  const startdateRef = useRef();
  const enddateRef = useRef();
  const projectRef = useRef();
  const descriptionRef = useRef();
  const priorityRef = useRef();
  const assigneesRef = useRef();


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isRegisterSuccess, isRegisterError, message } = useSelector(
    (state) => state.task
  );

  useEffect(() => {
    if (isRegisterError) {
      toast.error(`Error occured: ${message.message}`);
      dispatch(reset());
    }
    if (isRegisterSuccess) {
      toast.success(`Added successfully`);
      dispatch(reset());
      dispatch(getTasks());
      navigate("/tasks");
    }
  }, [isRegisterSuccess, isRegisterError, message, dispatch, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskDetails = {
      name: nameRef.current.value,
      startDate: startdateRef.current.value,
      endDate: enddateRef.current.value,
      Project : projectRef.current.value,
      description : projectRef.current.value,
      Priority: priorityRef.current.value,
      assignees : assigneesRef.current.value
  
    };

    dispatch(register(taskDetails));

    nameRef.current.value=""
   startdateRef.current.value=""
     enddateRef.current.value=""
    projectRef.current.value=""
    descriptionRef.current.value=""
     priorityRef.current.value=""
     assigneesRef.current.value =""

  };

  return (
    <div className="new">
      <form onSubmit={handleSubmit}>
        <h1> Create a Task</h1>
        <div className="formInput">
          <label htmlFor="first_name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="task name"
            ref={nameRef}
            required
          />
        </div>

        <div className="formInput">
          <label htmlFor="age">Start Date</label>
          <input type="date" id="date" ref={startdateRef} required />
        </div>

        <div className="formInput">
          <label htmlFor="age">End Date</label>
          <input type="date" id="age" ref={enddateRef} required />
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
          <label htmlFor="">Assignee</label>
          <input
            type="text"
            id=""
            placeholder="Assignee"
            ref={assigneesRef}
            required
          />
         
         </div>

         <div className="formInput">
         <label htmlFor="">Priority</label>
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
  );
};

export default New;
