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
import { useAlert } from "../../hooks/alert";
import { AuthService } from "../../services/Auth";
import { useNavigate } from "react-router-dom";

interface State {
  mail: string;
  name: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
}

interface Error {
  mail: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const navigate = useNavigate();
  const { setFeedback } = useAlert();
  const [values, setValues] = React.useState<State>({
    mail: "",
    password: "",
    name: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });
  const [errors, setError] = React.useState<Error>({
    mail: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = React.useState(false);

  const authService = React.useMemo(() => new AuthService(), []);

  const handleClickShowPassword = (
    key: "showPassword" | "showConfirmPassword"
  ) => {
    setValues({
      ...values,
      [key]: !values[key],
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

  const hasEmptyData = (data: State) => {
    const empty = {
      mail: !values.mail.length,
      name: !values.name.length,
      password: !values.password.length,
      confirmPassword: !values.confirmPassword.length,
    };

    return Object.values(empty).some((item) => item === true);
  };

  const submit = async () => {
    setLoading(true);
    if (hasEmptyData(values)) {
      const errorMessage = "Campo obrigatório";
      setError({
        mail: !values.mail.length ? errorMessage : "",
        password: !values.password.length ? errorMessage : "",
        name: !values.name.length ? errorMessage : "",
        confirmPassword: !values.confirmPassword.length ? errorMessage : "",
      });
      return;
    }
    if (!validateEmail(values.mail)) {
      handleChangeError("mail", "Email inválido");
      return;
    }
    if (values.password !== values.confirmPassword) {
      handleChangeError("confirmPassword", "As senhas devem ser iguais");
      return;
    }

    try {
      await authService.signUp({
        email: values.mail,
        password: values.password,
        name: values.name,
      });
      setFeedback({
        type: "success",
        message: "Cadastro realizado com sucesso",
        actionButtonText: "login",
        onActionButton: () => navigate("/login"),
      });
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
                    Cadastro
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
                    <TextField
                      id="name-input"
                      label="Nome"
                      variant="standard"
                      value={values.name}
                      onChange={handleChangeValue("name")}
                      error={!!errors.name.length}
                      helperText={errors.name}
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
                                onClick={() =>
                                  handleClickShowPassword("showPassword")
                                }
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

                    <Box mt={1}>
                      <FormControl variant="standard">
                        <InputLabel
                          htmlFor="password-label"
                          error={!!errors.password.length}
                        >
                          Confirm Password
                        </InputLabel>
                        <Input
                          id="confirm-password-input"
                          type={
                            values.showConfirmPassword ? "text" : "password"
                          }
                          value={values.confirmPassword}
                          onChange={handleChangeValue("confirmPassword")}
                          error={!!errors.confirmPassword.length}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() =>
                                  handleClickShowPassword("showConfirmPassword")
                                }
                                onMouseDown={handleMouseDownPassword}
                              >
                                {values.showConfirmPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        {!!errors.confirmPassword && (
                          <FormHelperText error={true}>
                            {errors.confirmPassword}
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
