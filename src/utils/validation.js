import * as Yup from "yup";

export const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  pwd: Yup.string()
    .required("Password is required")
    .min(4, "Password is too short"),
  confirmPwd: Yup.string()
    .required("Confirm Password is required")
    .min(4, "Password is too short")
    .oneOf([Yup.ref("pwd"), null], "Passwords must match"),
});
export const SignInSchema = Yup.object().shape({
  username: Yup.string().required("Usrname is required").min(5),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password is too short"),
});
