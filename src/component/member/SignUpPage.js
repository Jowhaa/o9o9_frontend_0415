import React, { useCallback, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { PersonOutline } from "@material-ui/icons";
import useInput from "./useInput";
import { useNavigate } from "react-router-dom";
import { sendInsertReq } from "./UserApi";

const theme2 = createTheme();

function SignUpPage() {
  const navigate = useNavigate();

  const [id, onChangeId, setId] = useInput("");
  const [pwd, onChangePwd, setPwd] = useInput("");
  const [confirmPwd, onChangeConfirmPwd, setConfirmPwd] = useInput("");

  const [user_name, onChangeName, setName] = useInput("");
  const [user_mail, onChangeEmail, setEmail] = useInput("");
  const [user_phone, onChangePhone, setPhone] = useInput("");
  const [user_address1, onChangeAddr1, setAddr1] = useInput("");
  const [user_address2, onChangeAddr2, setAddr2] = useInput("");
  const [user_birth, onChangeBirth, setBrith] = useInput("");

  const onSignUp = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const info = await sendInsertReq(data);
    console.log("[SignUpPage-onSignUp]", info);
    if (info.result === "success") {
      alert("회원 가입이 완료되었습니다.");
      onReset();
      navigate("/login");
    } else {
      alert("회원 가입 에러");
    }
  };

  const onReset = useCallback(() => {
    setId("");
    setPwd("");
    setConfirmPwd("");
    setName("");
    setEmail("");
    setPhone("");
    setAddr1("");
    setAddr2("");
  }, [
    setId,
    setPwd,
    setConfirmPwd,
    setName,
    setEmail,
    setPhone,
    setAddr1,
    setAddr2,
  ]);


  return (
    <ThemeProvider theme={theme2}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <form name="myform" encType="multipart/form-data" onSubmit={onSignUp}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                marginBottom: "20px",
              }}
            >
              
            </div>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="아이디"
                  name="user_id"
                  required
                  fullWidth
                  id="user_id"
                  label="아이디"
                  autoFocus
                  value={id}
                  onChange={onChangeId}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="user_password"
                  label="비밀번호"
                  type="password"
                  id="user_password"
                  autoComplete="password"
                  value={pwd}
                  onChange={onChangePwd}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="비밀번호 확인"
                  type="cpassword"
                  autoComplete="cpassword"
                  value={confirmPwd}
                  onChange={onChangeConfirmPwd}
                  error={confirmPwd === pwd ? false : true}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="user_name"
                  label="이름"
                  id="user_name"
                  autoComplete="name"
                  value={user_name}
                  onChange={onChangeName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="user_mail"
                  label="이메일"
                  id="user_mail"
                  autoComplete="email"
                  value={user_mail}
                  onChange={onChangeEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="user_phone"
                  label="전화번호"
                  id="user_phone"
                  autoComplete="phone"
                  value={user_phone}
                  onChange={onChangePhone}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="user_address1"
                  label="주소1"
                  id="user_address1"
                  autoComplete="address1"
                  value={user_address1}
                  onChange={onChangeAddr1}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="user_address2"
                  label="주소2"
                  id="user_address2"
                  autoComplete="address2"
                  value={user_address2}
                  onChange={onChangeAddr2}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="user_birth"
                  label="생년월일"
                  id="user_birth"
                  autoComplete="user_birth"
                  value={user_birth}
                  onChange={onChangeBirth}
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              등록
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUpPage;
