import * as React from "react";
import {
  LayoutOne,
  Card,
  FormControl,
  InputPassword,
  InputText,
  Button,
} from "upkit";
import { useForm } from "react-hook-form";
import { rules } from "./validation";
import { useHistory, Link } from "react-router-dom";
import { registerUser } from "../../api/auth";
import StoreLogo from "../../components/StoreLogo";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const Register = () => {
  let { register, handleSubmit, errors, setError } = useForm();
  let [status, setStatus] = React.useState(statuslist.idle);
  let history = useHistory();
  const onSubmit = async (formData) => {
    // (1) dapatkan variabel password dan password_confirmation
    let { password, password_confirmation } = formData;
    // (2) cek password vs password_confirmation
    if (password !== password_confirmation) {
      return setError("password_confirmation", {
        type: "equality",
        message: "Konfirmasi password harus dama dengan password",
      });
    }
    setStatus(statuslist.process);
    let { data } = await registerUser(formData);
    // (1) cek apakah ada error
    if (data.error) {
      // (2) dapatkan field terkait jika ada errors
      let fields = Object.keys(data.fields);
      // (3) untuk masing-masing field kita terapkan error dan tangkap pesan errornya
      fields.forEach((field) => {
        setError(field, {
          type: "server",
          message: data.fields[field]?.properties?.message,
        });
      });
      setStatus(statuslist.error);
      return;
    }
    setStatus(statuslist.success);
    history.push("/register/success");
  };
  return (
    <LayoutOne size="small">
      <Card color="white">
        <div className="mb-5 text-center">
          <StoreLogo />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl errorMessage={errors.full_name?.message}>
            <InputText
              name="full_name"
              placeholder="Full Name"
              fitContainer
              ref={register(rules.full_name)}
            />
          </FormControl>
          {/* (2) Input Email */}
          <FormControl errorMessage={errors.email?.message}>
            <InputText
              name="email"
              placeholder="Email"
              fitContainer
              ref={register(rules.email)}
            />
          </FormControl>
          {/* (3) Input Password */}
          <FormControl errorMessage={errors.password?.message}>
            <InputPassword
              name="password"
              placeholder="Password"
              fitContainer
              ref={register(rules.password)}
            />
          </FormControl>
          {/* (4) Input Konfirmasi Password */}
          <FormControl errorMessage={errors.password_confirmation?.message}>
            <InputPassword
              name="password_confirmation"
              placeholder="Password Confirmation"
              fitContainer
              ref={register(rules.password_confirmation)}
            />
          </FormControl>
          {/* (5) Button */}
          <Button
            size="large"
            fitContainer
            disabled={status === statuslist.process}
          >
            {status === statuslist.process ? "On Process" : "Register"}
          </Button>
        </form>
        <div className="mt-2 text-center">
          Sudah punya akun?{" "}
          <Link to="/login">
            {" "}
            <b> Masuk Sekarang. </b>{" "}
          </Link>
        </div>
      </Card>
    </LayoutOne>
  );
};

export default Register;
