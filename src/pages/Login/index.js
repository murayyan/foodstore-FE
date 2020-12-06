import * as React from "react";
import {
  InputText,
  InputPassword,
  Button,
  FormControl,
  Card,
  LayoutOne,
} from "upkit";
import { useForm } from "react-hook-form";
import { useHistory, Link } from "react-router-dom";
import StoreLogo from "../../components/StoreLogo";
import { useDispatch } from "react-redux";
import { userLogin } from "../../features/Auth/actions";
import { rules } from "./validation";
import { login } from "../../api/auth";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};
const Login = () => {
  const { register, handleSubmit, errors, setError } = useForm();
  const [status, setStatus] = React.useState(statuslist.idle);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async ({ email, password }) => {
    // (2) set status menjadi `process`
    setStatus(statuslist.process);
    // (3) kirim data ke Web API menggunakan helper `login`
    let { data } = await login(email, password);
    // (4) cek apakah server mengembalikan error
    if (data.error) {
      // (5) tangani error bertipe 'invalidCredential'
      setError("password", {
        type: "invalidCredential",
        message: data.message,
      });
      // (6) set status menjadi `error`
      setStatus(statuslist.error);
    } else {
      // (7) BERHASIL LOGIN
      // (8) ambil data `user` dan `token` dari respon server
      let { user, token } = data;
      // (9) dispatch ke Redux store, action `userLogin` dengan data `user` dan `token`

      dispatch(userLogin(user, token));
      // (10) redirect ke halaman home
      history.push("/");
    }
    setStatus(statuslist.success);
  };

  return (
    <LayoutOne size="small">
      <br />
      <Card color="white">
        <div className="mb-5 text-center">
          {" "}
          <StoreLogo />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {" "}
          <FormControl errorMessage={errors.email?.message}>
            <InputText
              placeholder="email"
              fitContainer
              name="email"
              ref={register(rules.email)}
            />
          </FormControl>
          <FormControl errorMessage={errors.password?.message}>
            {" "}
            <InputPassword
              placeholder="password"
              name="password"
              fitContainer
              ref={register(rules.password)}
            />
          </FormControl>
          <Button fitContainer size="large" disabled={status === "process"}>
            Login
          </Button>
        </form>
        <div className="mt-2 text-center">
          Belum punya akun?{" "}
          <Link to="/register">
            <b>Daftar sekarang.</b>
          </Link>
        </div>
      </Card>
    </LayoutOne>
  );
};

export default Login;
