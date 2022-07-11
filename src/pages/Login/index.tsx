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
import { useNavigate, Link as NavigateLink } from "react-router-dom";

import { LoadingButton } from "../../components";

import { AuthService } from "../../services/Auth";
import { useAlert } from "../../hooks/alert";
import { useAuth } from "../../hooks/auth";

interface State {
  mail: string;
  password: string;
  showPassword: boolean;
}

interface Error {
  mail: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const { setFeedback } = useAlert();
  const { signIn } = useAuth();

  const [values, setValues] = React.useState<State>({
    mail: "tobiassouza0@gmail.com",
    password: "12345678",
    showPassword: false,
  });
  const [errors, setError] = React.useState<Error>({
    mail: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);

  const authService = React.useMemo(() => new AuthService(), []);

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

  const submit = async () => {
    setLoading(true);
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
      setLoading(false);
      return;
    }
    if (!validateEmail(values.mail)) {
      handleChangeError("mail", "Email inválido");
      setLoading(false);
      return;
    }

    try {
      await signIn({
        email: values.mail,
        password: values.password,
      });
      navigate("/");
    } catch (error) {
      setFeedback({
        type: "error",
        message: error,
      });
    } finally {
      setLoading(false);
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
                      id="mail-input"
                      label="Email"
                      variant="standard"
                      value={values.mail}
                      onChange={handleChangeValue("mail")}
                      error={!!errors.mail.length}
                      helperText={errors.mail}
                    />
                    <Box mt={1}>
                      <FormControl variant="standard">
                        <InputLabel
                          htmlFor="password-label"
                          error={!!errors.password.length}
                        >
                          Password
                        </InputLabel>
                        <Input
                          id="password-input"
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
                  </Box>
                  <Box
                    mt={3}
                    justifyContent="space-between"
                    display="flex"
                    width="100%"
                  >
                    <NavigateLink to="/register">
                      <Link
                        href="#"
                        underline="none"
                        variant="caption"
                        component="button"
                      >
                        Fazer uma conta
                      </Link>
                    </NavigateLink>
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
                    <LoadingButton
                      loading={loading}
                      onClick={submit}
                      fullWidth
                      variant="contained"
                      size="large"
                    >
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
