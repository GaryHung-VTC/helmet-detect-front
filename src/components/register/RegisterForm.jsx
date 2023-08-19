import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { registerWithEmailAndPassword } from "../../services/firebase";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";

import InputField from "../form/InputField";

import { request } from "../../services/requestWrapper";

import { sleep } from "../../utils/helper";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [status, setStatus] = useState(null);
  const [statusMsg, setStatusMsg] = useState(null);

  // form validation rules
  const validationSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  });
  const formOptions = {
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  };

  const methods = useForm(formOptions);

  const { handleSubmit, formState } = methods;

  const { isSubmitting } = formState;

  const onSubmit = async (values) => {
    console.log(values);
    try {

      const { name, email, password } = values;

      await registerWithEmailAndPassword(name, email, password);

      const sleepTime = 500;
      setStatus("success");
      setStatusMsg(`Register Success, redirect in ${sleepTime / 1000} secound`);

      await sleep(sleepTime);
      navigate("/login", { replace: true });
    } catch (error) {
      setStatus("error");
      setStatusMsg(error?.message);
      return error;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <FormProvider {...methods}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <InputField name="name" required />
            <InputField label="Email Address" name="email" required />
            <InputField name="password" type="password" required autoFocus />

            <LoadingButton
              loading={isSubmitting}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </LoadingButton>
          </Box>
        </FormProvider>
      </Box>

      {status && (
        <Alert
          sx={{
            marginTop: 2,
          }}
          severity={status}
        >
          {statusMsg}
        </Alert>
      )}
    </Container>
  );
};

export default RegisterForm;
