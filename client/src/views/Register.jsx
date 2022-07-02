//import { useState } from 'react';
import Button from "react-bootstrap/Button";
//import Alert from 'react-bootstrap/Alert';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
//import useInput from '../hooks/useInput';
import { useDispatch } from "react-redux";
import { userRegister } from "../features/user";
import style from "../styles/General.module.css";

function Register() {
  const navigate = useNavigate();

  /* const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [dni, setDni] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [rePassword, setRePassword] = useState(); */

  const dispatch = useDispatch();

  if (localStorage.getItem("registered")) localStorage.removeItem("registered")
/* 
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : {} */

  // const [showPassword, setShowPassword] = useState(false);

  // const user = localStorage.getItem("user")
  //   ? JSON.parse(localStorage.getItem("user"))
  //   : {};

  const handleRegister = (values) => {

    dispatch(
      userRegister({
        fname: values.fname,
        lname: values.lname,
        dni: values.dni,
        email: values.email,
        password: values.password,
      })
    ).then(() => {
      const registered = JSON.parse(localStorage.getItem("registered")).data.fname || null;
      console.log('ESTO ES el FNAME de REGISTERED', registered)
      alert(registered
      ? 'Hola ' + registered + ', te has registrado exitosamente!'
      : 'Problema en el registro')
    })
      .then(() => navigate("/login"));
  };

  const validate = Yup.object({
    fname: Yup.string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .matches(/^[aA-zZ\s]+$/, "Sólo se permiten letras en este campo")
      .required("Se requiere un nombre"),
    lname: Yup.string()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .matches(/^[aA-zZ\s]+$/, "Sólo se permiten letras en este campo")
      .required("Se requiere un apellido"),
    dni: Yup.number()
      .min(1000000, "El formato de número de DNI es incorrecto")
      .required("Se requiere su número de DNI"),
    email: Yup.string()
      .email("El formato de email ingresado no es válido")
      .required("Se requiere un email"),
    password: Yup.string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .matches(/^(?=.*[a-z])/, "La contraseña debe tener al menos 1 minúscula")
      .matches(/^(?=.*[A-Z])/, "La contraseña debe tener al menos 1 mayúscula")
      .matches(/^(?=.*[0-9])/, "La contraseña debe tener al menos 1 número")
      .required("Se requiere contraseña"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "La contraseña no coincide")
      .required("Se requiere confirmación de contraseña"),
  });

  return (
    <div className={style.mainContainer}>
      <div className={style.logoContainer}>
        <img
          className={style.largeLogo}
          src={require("../images/1.png")}
          alt="miTurno"
        />
        <img
          className={style.smallLogo}
          src={require("../images/2.png")}
          alt="miTurno"
        />
      </div>

      <Formik
        initialValues={{
          fname: "",
          lname: "",
          dni: "",
          email: "",
          password: "",
          rePassword: "",
        }}
        validationSchema={validate}
        onSubmit={(values) => {
          handleRegister(values);
        }}
      >
        {(formik, isSubmitting) => (
          <div className={style.contentContainer}>
            <div>
              <h2>Registro</h2>

              <Form>
                <div className="form-group">
                  <label className={style.formField} htmlFor="fname">
                    Nombre
                  </label>
                  <Field
                    name="fname"
                    placeholder="Ingrese su nombre"
                    type="text"
                    className={
                      formik.touched.fname && formik.errors.fname
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                  />
                  {formik.touched.fname && formik.errors.fname ? (
                    <div className="invalid-feedback">
                      {formik.errors.fname}
                    </div>
                  ) : null}
                </div>

                <div className="form-group">
                  <label className={style.formField} htmlFor="fname">
                    Apellido
                  </label>
                  <Field
                    name="lname"
                    placeholder="Ingrese su apellido"
                    type="text"
                    className={
                      formik.touched.lname && formik.errors.lname
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                  />
                  {formik.touched.lname && formik.errors.lname ? (
                    <div className="invalid-feedback">
                      {formik.errors.lname}
                    </div>
                  ) : null}
                </div>

                <div className="form-group">
                  <label className={style.formField} htmlFor="dni">
                    N° documento
                  </label>
                  <Field
                    name="dni"
                    placeholder="Ingrese su n° de documento (sin puntos. Ej.: 34345345)"
                    type="number"
                    className={
                      formik.touched.dni && formik.errors.dni
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                  />
                  {formik.touched.dni && formik.errors.dni ? (
                    <div className="invalid-feedback">{formik.errors.dni}</div>
                  ) : null}
                </div>

                <div className="form-group">
                  <label className={style.formField} htmlFor="email">
                    Email
                  </label>
                  <Field
                    name="email"
                    placeholder="Ingrese su email"
                    type="email"
                    className={
                      formik.touched.email && formik.errors.email
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="invalid-feedback">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>

                <div className="form-group">
                  <label className={style.formField} htmlFor="password">
                    Contraseña
                  </label>
                  <Field
                    name="password"
                    placeholder="Al menos: 8 caracteres, 1 mayúscula, 1 minúscula y 1 número"
                    type="password"
                    className={
                      formik.touched.password && formik.errors.password
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="invalid-feedback">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>

                <div className="form-group">
                  <label className={style.formField} htmlFor="rePassword">
                    Repetir contraseña
                  </label>
                  <Field
                    name="rePassword"
                    placeholder="Repetir contraseña"
                    type="password"
                    className={
                      formik.touched.rePassword && formik.errors.rePassword
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                  />
                  {formik.touched.rePassword && formik.errors.rePassword ? (
                    <div className="invalid-feedback">
                      {formik.errors.rePassword}
                    </div>
                  ) : null}
                </div>

                <div className={style.boton}>
                  <Button variant="secondary" type="submit">
                    Registrarme
                  </Button>
                </div>
              </Form>
              <div className={style.unregistred}>
                <p className={style.p}>Ya tengo una cuenta</p>
                <Link to="/login">Ir a login</Link>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default Register;
