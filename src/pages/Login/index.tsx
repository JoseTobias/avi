import * as React from "react";
import Typography from "@mui/material/Typography";
import { BoxGradient, ContainerFullScreen, GridFullScreen } from "./styles";
import {
  Paper,
  Grid,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Link,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "../../components";

interface State {
  mail: string;
  password: string;
  showPassword: boolean;
}

interface Error {
  mail: string;
  password: string;
}

export default function Home() {
  const [values, setValues] = React.useState<State>({
    mail: "",
    password: "",
    showPassword: false,
  });
  const [errors, setError] = React.useState<Error>({
    mail: "",
    password: "",
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleChangeValue =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      handleChangeError(prop, "");
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleChangeError = (prop: keyof State, error: string) => {
    setError({ ...errors, [prop]: error });
  };

  const validateEmail = (email: string) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const submit = () => {
    const empty = {
      mail: !values.mail.length,
      password: !values.password.length,
    };
    if (empty.mail || empty.password) {
      const errorMessage = "Campo obrigatório";
      setError({
        mail: !values.mail.length ? errorMessage : "",
        password: !values.password.length ? errorMessage : "",
      });
      return;
    }
    if (!validateEmail(values.mail)) {
      handleChangeError("mail", "Email inválido");
      return;
    }
  };

  return (
    <BoxGradient>
      <ContainerFullScreen>
        <GridFullScreen
          container
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Grid md={6} xs={8} width="100%" container justifyContent="center">
            <Grid md={8}>
              <Paper elevation={3}>
                <Box
                  display="flex"
                  p={4}
                  alignItems="center"
                  flexDirection="column"
                >
                  <Typography variant="h3" component="h1" gutterBottom>
                    Login
                  </Typography>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                  >
                    <TextField
                      id="standard-basic"
                      label="Email"
                      variant="standard"
                      value={values.mail}
                      onChange={handleChangeValue("mail")}
                      error={!!errors.mail.length}
                      helperText={errors.mail}
                    />
                    <FormControl variant="standard">
                      <InputLabel
                        htmlFor="standard-adornment-password"
                        error={!!errors.password.length}
                      >
                        Password
                      </InputLabel>
                      <Input
                        id="standard-adornment-password"
                        type={values.showPassword ? "text" : "password"}
                        value={values.password}
                        onChange={handleChangeValue("password")}
                        error={!!errors.password.length}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {values.showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {!!errors.password && (
                        <FormHelperText error={true}>
                          {errors.password}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Box>
                  <Box
                    mt={4}
                    justifyContent="space-between"
                    display="flex"
                    width="100%"
                  >
                    <Link
                      href="#"
                      underline="none"
                      variant="caption"
                      component="button"
                    >
                      Fazer uma conta
                    </Link>
                    <Link
                      href="#"
                      underline="none"
                      variant="caption"
                      component="button"
                    >
                      Esqueceu sua senha?
                    </Link>
                  </Box>
                  <Box mt={2} width="100%">
                    <LoadingButton loading={false} onClick={submit}>
                      Entrar
                    </LoadingButton>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </GridFullScreen>
      </ContainerFullScreen>
    </BoxGradient>
  );
}
