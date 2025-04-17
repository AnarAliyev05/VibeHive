import React from 'react'
import './style.css'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate()
  return (
   <>
    <div className="register">
      <div className="register-container">
        <div className="register__left">
          <div className="register__logo">
            <span id='vibe'>Vibe</span><span id='hive'>Hive</span>
          </div>
          <div className="register__slogan">
            FEEL THE VIBE
          </div>
        </div>
        <div className="register__right">
          <div className="register__box">
            <Formik
              initialValues={{ email: "", password: "", confirmPassword: "" }}
              validationSchema={Yup.object({
                email: Yup.string().email("Invalid email").required("Email is required"),
                password: Yup.string().min(6, "At least 6 characters").required("Password is required"),
                confirmPassword: Yup.string()
                  .oneOf([Yup.ref("password"), null], "Passwords must match")
                  .required("Confirm Password is required"),
              })}
              onSubmit={(values) => {
                console.log("Register Data:", values);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="register-form">
                  <div className="form-group">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="input-field"
                    />
                    <ErrorMessage name="email" component="div" className="error-message" />
                  </div>

                  <div className="form-group">
                    <Field
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="input-field"
                    />
                    <ErrorMessage name="password" component="div" className="error-message" />
                  </div>

                  <div className="form-group">
                    <Field
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      className="input-field"
                    />
                    <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                  </div>

                  <button type="submit" disabled={isSubmitting} className="submit-button">
                    Register
                  </button>
                </Form>
              )}
            </Formik>

            <div className="register__box__line"></div>

            <div className="register__box__login">
              <button className="register-btn" onClick={() => navigate('/login')}>
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
   </>
  )
}

export default Register