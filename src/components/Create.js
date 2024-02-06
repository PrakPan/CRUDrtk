import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create } from "../../src/components/redux/slice/index";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../index.css'

// toast.configure();

const Create = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success } = useSelector((state) => state.app);

  const handleSubmit = (values) => {
    dispatch(create(values));
    console.log(values);
  };

  useEffect(() => {
    if (success) {
      notify();
      setTimeout(() => {
        navigate("/"); 
      }, 1000);
    }
  }, [success, navigate]);

  const validate = (values) => {
    const errors = {};

    if (!values || !values.name) {
      errors.name = "Name is required";
    }

    if (!values || !values.email) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  const notify = () => {
    toast.success("User Created");
  };

  return (
    <div className="vh-100 text-center">
      <ToastContainer />
      <h2 className="mt-3">Fill the details of User</h2>
      <Formik
        initialValues={{ name: "", email: "" }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        <Form className="w-50 mx-auto my-5">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <Field
              type="text"
              name="name"
              className="form-control outline:none rounded"
              placeholder="Enter name"
            />
            <ErrorMessage name="name" component="div" className="text-danger" />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <Field
              type="email"
              name="email"
              className="form-control rounded"
              placeholder="Enter Email"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-danger"
            />
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-secondary"
              onClick={() => navigate("/")}
              style={{marginRight:"1rem"}}
            >
              Go Back
            </button>
            <button
              type="submit"
              className="disabled"
              
            >
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Create;
