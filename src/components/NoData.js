import React from 'react'
import '../index.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { searchUser } from "./redux/slice";


/**
 * @description  "Below is the NoData Function Component "
 * @summary 1. It is shown when there is no search entry for the data being searched
 *         
 */
const NoData = () => {
    const navigate =useNavigate();
    const dispatch = useDispatch();
    const homeHandler =()=>{
      dispatch(searchUser([]));
        navigate("/");
    }
  return (
    <div className='img-container'>
       <img src='1.jpg' alt ="No data" className='img-search'/>
        <button className='btn btn-danger' onClick={homeHandler} style={{marginTop : '1rem'}}>Back to Home</button> 
    </div>
  )
}

export default NoData