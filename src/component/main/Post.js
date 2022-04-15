import React, { useCallback, useEffect, useState } from "react";
import "./Post.css";
import { Avatar, Box } from "@material-ui/core";
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import NearMeIcon from "@material-ui/icons/NearMe";
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import { AvatarGroup, Button, TextField } from "@mui/material";
import "./Feed.css";
import PostReply from "./PostReply";
import { Link } from "react-router-dom";
import {  SlackSelector,
          FacebookSelector,
          FacebookCounter } from 'react-reactions';
import icons from "../helpers/icons";
import FacebookCounterReaction from "../facebook/FacebookCounterReaction";
import FeedPopupButton from './FeedPopupButton'
import "./FeedModal";
import Facebook from "./Facebook";
import _ from 'lodash';
import { textAlign } from "@mui/system";
import axios from "axios";


const initialState = {
  counters: [{
    emoji: 'like',
    by: 'Case Sandberg',
  }, {
    emoji: 'like',
    by: 'Henry Boldizsar',
  }, {
    emoji: 'like',
    by: 'Joseph Poon',
  }, {
    emoji: 'like',
    by: 'Elizabeth Stark',
  }, {
    emoji: 'like',
    by: 'Cameron Gillard',
  }, {
    emoji: 'love',
    by: 'Rob Sandberg',
  }],
  user: 'Case Sandberg',
  showSelector: false,
}

function Post({post}) {
  const {mboard_seq, user_image, contents_url, user_name, timestamp, contents, hashtag, user_seq, posting_type,
    jobposting_seq, start_date, end_date, company_name, work_area, work_field, work_condition} = post

  const jobpost = [jobposting_seq, start_date, end_date, company_name, work_area, work_field, work_condition];

  console.log("user_image------------>"+user_image);

  const [state, setState]= useState(initialState);
  const [empty, setEmpty] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [replys, setReplys] = useState([]);
  const [reply, setReply] = useState();
  const [fbemoji,setFBemoji] = useState("");
  const [ment, setMent] = useState("추천");
  const handleAdd = () => setState({ showSelector: true })

  const onChangeUserMent = (e) => {
    setReply(e.target.value);
  }

  useEffect(()=>{
    setFBemoji(icons.find("facebook", "like"));
    var frmLikeData = new FormData();
    frmLikeData.append("mboard_seq",mboard_seq);
    frmLikeData.append("user_seq",user_seq);

    axios 
    .post(`http://localhost:9090/like/view/`, frmLikeData)
    .then((res) => {
      console.log(res.data);
      setFBemoji(icons.find("facebook", res.data.emoji));       
     // console.log("replys-----", replys);
    })
    .catch((e) => {
     // console.log(e);
    });

  },[])

  useEffect(() => {
    //console.log(isShow);
  }, []);
 
  const getReplys = useCallback( () => {
    axios 
      .get(`http://localhost:9090/reply/list/${mboard_seq}`)
      .then((res) => {
        //console.log(res);
        setReplys(res.data);
       // console.log("replys-----", replys);
      })
      .catch((e) => {
       // console.log(e);
      });
  }, []);

  const onClickReplyBtn= () => {
    var frmData = new FormData();
    frmData.append("mboard_seq", mboard_seq);
    frmData.append("user_seq",user_seq);
    frmData.append("reply", reply);

    axios 
    .post(`http://localhost:9090/reply/insert`, frmData)
    .then((res) => {
     // console.log(res);
    setIsShow(true);
    getReplys();
    setReply("");
    })
    .catch((e) => {
     // console.log(e);
    });

    var frmLikeData = new FormData();
    frmLikeData.append("mboard_seq",mboard_seq);
    frmLikeData.append("user_seq",user_seq);
    frmLikeData.append("emoji","추천");

    axios 
    .post(`http://localhost:9090/like/insert`, frmLikeData)
    .then((res) => {
      console.log(res.data);
    })
    .catch((e) => {
    // console.log(e);
    });
    
  }
  let loadData=()=>{
    //console.log("------------------>",isShow);
    setIsShow(!isShow);
    getReplys();
  }
  const onClick = () => {
    loadData();
    //setReplys(res);
  };


  useEffect(()=>{console.log("posting_type", posting_type)},[])


  const handleSelect = (emoji) => {

  
  // const index = _.findIndex(state.counters, { by: state.user })
  // if (index > -1) {
  //   setState({
  //     counters: [
  //       ...state.counters.slice(0, index),
  //       { emoji, by: state.user },
  //       ...state.counters.slice(index + 1),
  //     ],
  //     showSelector: false,
  //   })
  // } else {
  //   setState({
  //     counters: [...state.counters, { emoji, by:state.user }],
  //     showSelector: false,
  //   })
  // }

    setFBemoji(icons.find("facebook", emoji)); 
    let tempMent='';
    if(emoji==='like') tempMent='추천~꾹!'
    if(emoji==='love') tempMent='좋아요'
    if(emoji==='haha') tempMent='하하하'
    if(emoji==='wow') tempMent='와~우!'
    if(emoji==='sad') tempMent='힝~'
    if(emoji==='angry') tempMent='@!#$$@#'

    setMent(tempMent);
    setState({ showSelector: false });

    var frmLikeData = new FormData();
    frmLikeData.append("mboard_seq",mboard_seq);
    frmLikeData.append("user_seq",user_seq);
    frmLikeData.append("emoji",emoji);

    axios 
    //.get(`http://localhost:9090/like/update?mboard_seq=1&user_seq=1&emoji=하하하`)
     .post(`http://localhost:9090/like/update`, frmLikeData)
    .then((res) => {
      console.log(res.data);
    })
    .catch((e) => {
    // console.log(e);
    });

  }


  /**
   * 
   *       <option value={0}>일반글</option>
          <option value={1}>채용공고</option>
          <option value={2}>광고</option>
   */

  return (
    <div className="post">
      <div className="post__top">
        <Avatar src={user_image} className="post__avatar" />
        <div className="post__topInfo">
          <h3>{user_name}</h3>
          {/* just use when you need to update time */}
          {/* <p>{new Date(timestamp?.toDate()).toUTCString()}</p> */}
          <p>{timestamp}</p>
          {posting_type==="1" && <p>{"채용공고"}</p>}
          {posting_type==="2" && <p>{"광고"}</p>}
        </div>
      </div>

      {contents_url && <div className="post__image" >
        <img src={contents_url} alt="" style={{width:"200px" ,height:"200px", textAlign:"center"}} />
      </div>}

      <div className="post__bottom">
        <p>{contents}</p>

        {
          jobposting_seq && (
            
            jobpost.map((data)=><p>{data}</p>)
          )
        }


        {hashtag.split("#").map((data) => (
          <Link style={{ paddingRight: 5 }} to={`/feed/hashtag/${data}`}>
            #{data}
          </Link>
        ))}
      </div>

      <div>
        <AvatarGroup/> 123
      </div>

      <div className="post__options">
        <div className="post__option">
            
          {/*<SentimentSatisfiedAltOutlinedIcon />*/}
          {/*<FacebookSelector onSelect={(emoji) => setEmoji3(emoji)} />*/}
          {/*} <ModalHover onHover={<FacebookSelector onSelect={(emoji) => setEmoji3(emoji)}/>}/>*/}
          <div style={{ position: 'relative' }}>
   
          {/* <div onClick={ handleAdd }><img src={fbemoji} style={{width:"20px",height:"20px",color:"#ababab"}} alt="test"/>&nbsp;&nbsp;좋아요</div> */}
          {/* <RecommendIcon/> */}
            <div onClick={handleAdd} className="FeedPopupButton__bottom">
              <div><img src={fbemoji} style={{ width:"25px",height:"25px",color: "#7e7e7e" }} alt="test"/></div>
              <div>&nbsp;&nbsp;{ment}</div>
            </div>
            { state.showSelector ? (
              <div style={{position: 'absolute', bottom: '100%', left:'-100%', marginBottom: '10px' }}>
                <FacebookSelector onSelect={ handleSelect} />
              </div>
            ) : null }
          </div>        
        </div>
           
          
        <div className="post__option comment" onClick={onClick}>
          <div className="FeedPopupButton__bottom">
            <ChatOutlinedIcon style={{color:"#5a92ff"}} />
            <div>&nbsp;&nbsp;댓글</div>
          </div>
        </div>

        <div className="post__option">
          <div className="FeedPopupButton__bottom">
          <NearMeIcon style={{color:"#5a92ff"}} />
          <div>&nbsp;&nbsp;공유</div>
          </div>
        </div>

        {/* <div className="post__option">
          <AccountCircleIcon />
          <ExpandMoreOutlined />
        </div> */}
      </div>

      <div className="reply">
        <Box
          sx={{
            width: 550,
            maxWidth: "100%",
          }}
        >
          {isShow && (
            <>
              <Box sx={{ height: 100 }}>
                <div>
                  <TextField fullWidth onChange={onChangeUserMent} value={reply}  placeholder="의견을 나눠주세요 :)"></TextField>
                </div>

                <div>
                  <Button className="button" style={{float: "right", color:"#61b3ff"}} onClick={onClickReplyBtn}>
                    <WbSunnyOutlinedIcon/>댓글달기</Button>
                </div>
              </Box>

              {replys &&
                replys.map((data)=>
                <div>
                <PostReply
                  getReplys = {getReplys}
                  reply_seq={data.reply_seq}
                  profile_url="https://raw.githubusercontent.com/emilyoun/Facebook-Clone-with-REACT/main/Screen%20Shot%202021-01-02%20at%206.03.01%20PM.png"
                  user_name={data.user_name}
                  rdate={data.rdate}
                  contents={data.reply}
                />
              </div>)
              
              }
        
            </>
          )}
        </Box>
      </div>
    </div>
  );
}
         

//export default React.memo(Post);
export default Post;
