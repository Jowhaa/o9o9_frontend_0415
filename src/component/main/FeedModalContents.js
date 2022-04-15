import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import PanoramaOutlinedIcon from '@mui/icons-material/PanoramaOutlined';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
//import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import YardOutlinedIcon from '@mui/icons-material/YardOutlined';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import { ButtonBase } from "@mui/material";
import "./FeedModalContents.css";
import FeedModalHashtags from "./FeedModalHashtags";
import './Emoji.css';
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Slack from "./Slack";
import SlackSelector from "react-reactions/lib/components/slack/SlackSelector";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

const FeedModalContents = ({props}) => {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [files, setFiles] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [hashArr, setHashArr] = useState([]);
  const [contents, setContents] = useState("");
  const [posting_type, setPosting_type] = useState("");
  const [showSelector, setShowSelector] = useState(false);

  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [company_name, setCompany_name] = useState("");
  const [work_area, setWork_area] = useState("");
  const [work_field, setWork_field] = useState("");
  const [work_condition, setWork_condition] = useState("");



  let history = useNavigate (); 
  // const content = "";
  // function setContent(tmp) {
  //    content = tmp;
  // }
  const { open, close, header } = props;

  useEffect(()=>{
    console.log("[props value-------------->]", props, typeof close);
  })
  useEffect(() => {
    console.log("hashArr--->", hashArr);

  }, [hashArr]);


  // 사진 미리보기
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };





  const onChangeContent = (e) => {
    console.log(e.target.value);
    setContents(e.target.value);
  };

  const writeBtn = ()=>{
    // content(+emoji), hashtag, image
    setShowSelector(false);

    console.log(contents, imageSrc, hashArr);

    let hashtag = "";
    if(hashArr.length !== 0){
      hashtag = hashArr.reduce((acc, cur)=>{
        if(cur.length>0){
          return  acc+"#"+cur;
        }
        return acc;
      })
      console.log(hashtag);
     
      //setHashtag(result);
    }


   
/**
 * 
 * 'MBOARD_SEQ', 'bigint', 'NO', 'PRI', NULL, 'auto_increment'
'USER_SEQ', 'bigint', 'NO', '', NULL, ''
'CONTENTS', 'longtext', 'NO', '', NULL, ''
'VIEW_YN', 'char(1)', 'NO', '', NULL, ''
'WDATE', 'datetime', 'NO', '', NULL, ''
'DEL_YN', 'char(1)', 'NO', '', NULL, ''
'lIKE_SEQ', 'bigint', 'NO', '', NULL, ''

 */
    var frmData = new FormData();

    console.log("document.myform.filename.files[0]:-----", document.myform.filename.files[0]);
    frmData.append("contents", contents);
    frmData.append("file", document.myform.filename.files[0]);
    frmData.append("hashtag", hashtag);
    frmData.append("user_seq", 1);
    frmData.append("view_yn", 1);
    frmData.append("del_yn", 1);
    frmData.append("like_seq", 1);
    frmData.append("posting_type", posting_type);

    frmData.append("start_date", start_date);
    frmData.append("end_date", end_date);
    frmData.append("company_name", company_name);
    frmData.append("work_area", work_area);
    frmData.append("work_field", work_field);
    frmData.append("work_condition", work_condition);

    Axios.post('http://localhost:9090/mainboard/insert/', frmData)
    .then(
        res =>{
          console.log(res.data);
          alert("등록되었습니다.");
          close();
          history('/');//list 로 이동하기 
        } 
    );


    // var frmData2 = new FormData();
    // frmData2.append("mboard_seq",mboard_seq);
    // frmData2.append("user_seq",user_seq);
    // frmData2.append("emoji","추천");

    // Axios.post('http://localhost:9090/like/insert/', frmData)
    // .then(
    //     res =>{
    //       console.log(res.data);
    //       alert("등록되었습니다.");
    //       history('/');//list 로 이동하기 
    //     } 
    // );


  }
const onClickEmoji = () => {
  setShowSelector(!showSelector);
}

const handleSelect = (emoji) => {
  console.log(emoji);
  setContents(contents+emoji);
}

useEffect(()=>{
  console.log(contents)
}, [contents])


const onClickImgBtn = () => {
  setShowSelector(false);
}
const onClickVideoBtn = () => {
  setShowSelector(false);
}

const onChangeStartDate = (e)=>{
  setStart_date(e.target.value);
}
const onChangeEndDate= (e)=>{
  setEnd_date(e.target.value);
}
const onChangeCompanyName= (e)=>{
  setCompany_name(e.target.value);
}
const onChangeWorkArea= (e)=>{
  setWork_area(e.target.value);
}
const onChangeWorkField= (e)=>{
  setWork_field(e.target.value);
}
const onChangeCondition= (e)=>{
  setWork_condition(e.target.value);
}
const onChangePostingType= (e)=>{
  setPosting_type(e.target.value);
}

  return (
    <>
       <Box sx={{ width: "100px", margin:"10px"}}>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
          글 종류
          </InputLabel>
          <NativeSelect name="posting_type" onChange={onChangePostingType} defaultValue={0}>
          <option value={0}>일반글</option>
          <option value={1}>채용공고</option>
          <option value={2}>광고</option>
          </NativeSelect>
        </Box>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width:"100%",
        }}
      >     

      <TextField name="start_date" id="outlined-basic" label="접수시작" variant="outlined" onChange={onChangeStartDate}/>
      <TextField name="end_date" id="outlined-basic" label="접수마감" variant="outlined" onChange={onChangeEndDate}/>
      <TextField name="company_name"  id="outlined-basic" label="회사이름" variant="outlined" onChange={onChangeCompanyName}/>
      <TextField name="work_area"  id="outlined-basic" label="근무지역" variant="outlined" onChange={onChangeWorkArea}/>
      <TextField name="work_field" id="outlined-basic" label="채용분야" variant="outlined" onChange={onChangeWorkField}/>
      <TextField name="work_condition"  id="outlined-basic" label="자격요건" variant="outlined"onChange={onChangeCondition} />
      </div>
    
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
      
    

        {imageSrc && (
          <img
            src={imageSrc}
            alt="preview-img"
            style={{ height: "100px", padding: "10px" }}
          />
        )}
        <TextField
          name="contents"
          style={{ display: "flex", padding: "5", flex: "1" }}
          multiline
          rows={5}
          placeholder="나누고 싶은 이야기가 있으세요?"
          variant="outlined"
          onChange={onChangeContent}
          value={contents}
        ></TextField>
      </div>

      <FeedModalHashtags hashArr={hashArr} setHashArr={setHashArr} />

      <div className="FeedModalContents">
        <div className="FeedModalContents__bottom">
          <div className="FeedModalContents__option" onClick={onClickImgBtn}>
            <ButtonBase variant="contained" component="label">
            <form name="myform" encType="multipart/form-data">
              <input
                name="filename"
                type="file"
                hidden
                onChange={(e) => encodeFileToBase64(e.target.files[0])}
              />
              </form>
              <YardOutlinedIcon style={{ color: "#61b3ff" }} />
              &nbsp;&nbsp;<h3>사진</h3>
            </ButtonBase>
          </div>
          
          <div className="FeedModalContents__option" onClick={onClickVideoBtn}>
            <ButtonBase variant="contained" component="label">
              <input
                type="file"
                hidden
                accept="img/*"
                onChange={(e) => encodeFileToBase64(e.target.files[0])}
              />
              <SmartDisplayOutlinedIcon style={{ color: "#8ee673" }} />
              &nbsp;&nbsp;<h3>동영상</h3>
            </ButtonBase>
          </div>
          
          <div style={{ position: 'relative' }}>
            <div className="FeedModalContents__option" onClick={onClickEmoji}>
              <ButtonBase variant="contained" component="label">
                <AddReactionOutlinedIcon style={{ color: "orange" }}  />
              
                &nbsp;&nbsp;<h3>이모티콘</h3>
              </ButtonBase>
            </div>
            { showSelector ? (
              <div style={{zIndex:'9999', position: 'absolute', top:'50px', left:'-50%', marginTop: '10px' }}>
              <SlackSelector onSelect={ handleSelect}/>
              </div>
            ) : null }

          </div>


          <div className="FeedModalContents__option">
            <ButtonBase variant="contained" component="label" onClick={writeBtn}>
              <RateReviewOutlinedIcon style={{ color: "#fa81c0"}} />
              &nbsp;&nbsp;<h3>올리기</h3>
            </ButtonBase>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedModalContents;
