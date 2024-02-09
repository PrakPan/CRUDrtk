import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../index.css'
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "./redux/slice";


/**
 * @description  "Below is the Table Function Component "
 * @summary 1. It shows the user details in Tabular Form
 *         
 */

const Table = ({ User,Count }) => {
    const navigate = useNavigate();
    const dispatch =useDispatch();
    const [showModal, setShowModal] = useState(false);
    const { success } = useSelector((state) => state.app);

    const handleShow = () => setShowModal(true);
  
    const confirmDelete = () => {
      dispatch(deleteUser(User));
      if(success)
      notify(User.name);
      setShowModal(false);
    };
   
    const notify =(user)=>{
      if(success){
        console.log(success);
       toast(`User Deleted : ${user} `);
      }
    }
    
    const editHandler =()=>{
      console.log(User)
      if(User && User._id){
      navigate(`/edit/${User._id}`);
      }
    }
    
  return (
    <tr>
      <th scope="row">{Count}</th>
      <td>{User?.name}</td>
      <td>{User?.email}</td>
      <td>
        <button className="card-link btn btn-outline-success btn-sm btn-edit" onClick={editHandler}>
            {" "}
            Edit
        </button>
      </td>
      <td>
        <button
          className="card-link btn btn-outline-danger btn-sm "
          onClick={handleShow}
        >
          Delete 
        </button>
      </td>
      {showModal && (
        <div className="fullscreen-modal">
          <div className="modal-content">
            <p>Are you sure you want to delete {User.name}?</p>
            <div className="btn-grp">
            <button className= "btn btn-primary" onClick={() => setShowModal(false)}>Cancel</button>
            <button className= "btn btn-danger"onClick={confirmDelete}>Delete</button>
            </div>
         
          </div>
        </div>
      )}
    </tr>
  );
};
export default Table;