// import * as React from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { useNavigate } from "react-router-dom";
// import useInput from "./useInput";
// import { useUserDispatch } from "./UserContext";
// import { sendFindIdReq } from "./UserApi";

// const theme = createTheme();

// function FindIdPage() {
//     const navigate = useNavigate();
//     const dispatch = useUserDispatch();
  
//     const [mail, onChangeMail, setMail] = useInput("");
//     const [phone, onChangePhone, setPhone] = useInput("");
  
//     const onFindId = async () => {
//       if (!mail || !phone) {
//         alert("모든 값을 정확하게 입력해주세요");
//         return;
//       }
//       const userInfo = { user_mail: mail, user_phone: phone };
//       console.log("[LoginPage-사용자정보]", userInfo);
//       try {
//         const data = await sendFindIdReq({ user_mail: mail, user_phone: phone });
//         const { result, user_seq } = data;
//         alert(result);
  
//           /**
//            *  user_id: window.sessionStorage.getItem("user_id"),
//           user_seq: window.sessionStorage.getItem("user_seq"),
//           user_level: window.sessionStorage.getItem("user_level"),
//            */
    
//           navigate("/"); //  경로이동
//         } 
//       }  catch (error) {
//         console.log(error);
//       }
//     };
  
//     return (
//       <ThemeProvider theme={theme}>
//         <Container component="main" maxWidth="xs">
//           <CssBaseline />
//           <Box
//             sx={{
//               marginTop: 8,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5">
//               계정 아이디 찾기
//             </Typography>
//             <Box component="form" sx={{ mt: 1 }}>
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="mail"
//                 label="이메일 주소"
//                 name="mail"
//                 autoFocus
//                 onChange={onChangeMail}
//               />
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="phone"
//                 label="핸드폰 번호"
//                 id="phone"
//                 onChange={onChangePhone}
//               />
  
//               <Button
//                 onClick={onFindId}
//                 type="button"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 }}
//               >
//                 찾기
//               </Button>
//               <Grid container>
//                 <Grid item xs>
//                   <Link href="/findid" variant="body2">
//                     아이디 찾기
//                   </Link>
//                   &nbsp;&nbsp;&nbsp;
//                   <Link href="/findpwd" variant="body2">
//                     비밀번호 찾기
//                   </Link>
//                 </Grid>
//                 <Grid item>
//                   <Link href="/signup" variant="body2">
//                     {"회원가입하기"}
//                   </Link>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Box>
//         </Container>
//       </ThemeProvider>
//     );
// }  
//   export default FindId;