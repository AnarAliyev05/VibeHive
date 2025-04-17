import React from 'react'
import './style.css'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';

function Login() {

const navigate = useNavigate()
  return (
    <div className="login">
      <div className="login-container">
        <div className="login__left">
          <div className="login__logo">
            <span id='vibe'>Vibe</span><span id='hive'>Hive</span>
          </div>
          <div className="login__slogan">
            FEEL THE VIBE
          </div>
        </div>
        <div className="login__right">
          <div className="login__box">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={Yup.object({
                email: Yup.string().email("Invalid email").required("Email is required"),
                password: Yup.string().min(6, "At least 6 characters").required("Password is required"),
              })}
              onSubmit={(values) => {
                console.log("Login Data:", values);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="login-form">
                  {/* Email */}
                  <div className="form-group">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="input-field"
                    />
                    <ErrorMessage name="email" component="div" className="error-message" />
                  </div>

                  {/* Password */}
                  <div className="form-group">
                    <Field
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="input-field"
                    />
                    <ErrorMessage name="password" component="div" className="error-message" />
                  </div>

                  {/* Submit Button */}
                  <button type="submit" disabled={isSubmitting} className="submit-button">
                    Login
                  </button>
                </Form>
              )}
            </Formik>
            <div className="login__box__forgot">
              <a href="">Forgot your Password?</a>
            </div>
            <div className="login__box__line"></div>
            <div className="login__box__register">
            <button className="register-btn" onClick={()=>navigate('/register')} >
             Go To Register
            </button></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login