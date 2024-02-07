import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser} from "./redux/slice/index";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../index.css'

const Result = ({ User,Count }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const notify =(user)=>{
       toast(`User Deleted : ${user} `);
    }
  
  return (
    <tr>
      <th scope="row">{Count}</th>
      <td>{User.name}</td>
      <td>{User.email}</td>
      <td>
        <button className="card-link btn btn-outline-success btn-sm btn-edit" onClick={()=>navigate(`/edit/${User.id}`)}>
            {" "}
            Edit
        </button>
      </td>
      <td>
        <button
          className="card-link btn btn-outline-danger btn-sm "
          onClick={() =>{ dispatch(deleteUser(User));
            notify(User.name);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};
export default Result;