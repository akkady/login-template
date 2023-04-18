import { useEffect, useState } from "react";
import { LockClosedIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserService from "../api/user.service";
import { SignInSchema } from "../utils/validation";
import useAuth from "../hooks/useAuth";
import jwtDecode from "jwt-decode";
import useToggle from "../hooks/useToggle";

const Login = () => {
  const { setAuth } = useAuth();
  const [check, toggle] = useToggle("persist", false);
  const [alert, setAlert] = useState({ show: false, msg: "" });

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const logIn = (data) => {
    UserService.login(data)
      .then((res) => {
        const acces_token = res.headers
          .getAuthorization()
          ?.replace("Bearer ", "");
        const refresh_token = res.headers.get("X-Refresh-token");
        const decoded = jwtDecode(acces_token);
        setAuth({
          username: decoded.sub,
          roles: decoded.roles,
          token: acces_token,
        });
        sessionStorage.setItem("refresh", refresh_token);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setAlert({
          show: true,
          msg: err?.response?.data?.message || "Something went wrong",
        });
      });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Create if you don't have one
              </Link>
            </p>
            {alert.show && (
              <div
                className="bg-red-50 border border-red-400 text-orange-400 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{alert.msg}</span>
                <button
                  onClick={() => setAlert({ show: false, msg: "" })}
                  className="absolute top-0 bottom-0 right-0 px-4 py-3"
                >
                  <XMarkIcon className="fill-current h-6 w-6 text-orange-400" />
                </button>
              </div>
            )}
            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              validationSchema={SignInSchema}
              onSubmit={logIn}
            >
              {(props) => (
                <Form className="mt-1 space-y-6">
                  <div className="">
                    <div className="py-4">
                      <label
                        htmlFor="username-input"
                        className="flex justify-between items-center mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Username
                        <ErrorMessage name="username">
                          {(msg) => (
                            <span
                              className="flex items-center text-orange-400 text-sm font-normal ml-2"
                              role="alert"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-4 mr-1"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                                />
                              </svg>
                              {msg}
                            </span>
                          )}
                        </ErrorMessage>
                      </label>
                      <Field
                        id="username-input"
                        name="username"
                        type="text"
                        autoComplete="text"
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Email address"
                      />
                    </div>
                    <div className="py-4">
                      <label
                        htmlFor="password"
                        className="flex justify-between items-center mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                        <ErrorMessage name="password">
                          {(msg) => (
                            <span
                              className="flex items-center text-orange-400 text-sm font-normal ml-2"
                              role="alert"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-4 mr-1"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                                />
                              </svg>
                              {msg}
                            </span>
                          )}
                        </ErrorMessage>
                      </label>
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Password"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        defaultChecked={check}
                        onChange={toggle}
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-900"
                      >
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <Link
                        to="/forgot"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </div>

                  <div>
                    <button
                      disabled={!props.isValid}
                      type="submit"
                      className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-slate-500"
                    >
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <LockClosedIcon
                          className="h-5 w-5 text-inherit"
                          aria-hidden="true"
                        />
                      </span>
                      Sign in
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
