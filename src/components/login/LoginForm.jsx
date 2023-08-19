import { useState } from "react";

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useNavigate } from "react-router-dom";
import { shallow } from "zustand/shallow";

import { logInWithEmailAndPassword } from "../../services/firebase";
import useAuthStore from "../../hooks/auth";

import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";

import InputField from "../form/InputField";

import { Link as RouterLink } from "react-router-dom";
import { sleep } from "../../utils/helper";

const LoginForm = () => {
  const [status, setStatus] = useState(null);
  const [statusMsg, setStatusMsg] = useState(null);

  const navigate = useNavigate();
  const { setSignIn } = useAuthStore(
    ({ setSignIn }) => ({ setSignIn }),
    shallow
  );

  // form validation rules
  const validationSchema = yup.object().shape({
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
    try {
      const { email, password } = values;

      const userCredential = await logInWithEmailAndPassword(email, password);
      console.log(userCredential);
      const token = await userCredential.user.getIdToken();
      console.log(token);

      setSignIn({
        token,
        profile: {
          email: userCredential.user.email,
        },
      });

      const sleepTime = 500;
      setStatus("success");
      setStatusMsg(`Login Success, redirect in ${sleepTime / 1000} secound`);

      await sleep(sleepTime);
      navigate("/", { replace: true });
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
          Sign in
        </Typography>
        <FormProvider {...methods}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <InputField label="Email Address" name="email" required autoFocus />
            <InputField name="password" type="password" required />

            <LoadingButton
              loading={isSubmitting}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </LoadingButton>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs>
                <Link component={RouterLink} to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
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

export default LoginForm;
