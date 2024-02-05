import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser} from "./redux/slice/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Result = ({ User,Count }) => {
    const dispatch = useDispatch();
    const notify =()=>{
       toast("User Deleted");
    }
  
  return (
    <tr>
      <th scope="row">{Count}</th>
      <td>{User.name}</td>
      <td>{User.email}</td>
      <td>
        <button className="card-link btn btn-outline-success btn-sm ">
          <Link to={`/edit/${User.id}`} className="link-class">
            {" "}
            Edit
          </Link>
        </button>
      </td>
      <td>
        <button
          className="card-link btn btn-outline-danger btn-sm "
          onClick={() =>{ dispatch(deleteUser(User));
            notify();
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};
export default Result;
