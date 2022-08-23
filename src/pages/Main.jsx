import Router from "../shared/Router";
import { useState, useEffect, React } from "react";
import styled from "styled-components";
import axios from "axios";
import ImageUpload from "../components/ImageUpload";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { FaRegComment } from 'react-icons/fa';
import { BsSuitHeart } from 'react-icons/bs';
import { BiDotsHorizontalRounded } from 'react-icons/bi';


function Main() {

  const { postId } = useParams();

  const navigate = useNavigate();

  //삭제 및 수정 모달
  const [modal, setModal] = useState(false);
  const [list, setList] = useState([]);

  //모든 게시물 조회
  const getAxiosData = async () => {
    const axiosData = await axios.get('http://taesik.shop/api/post', {

    })

    setList(axiosData.data)
    console.log(axiosData.data)

  }
  useEffect(() => {
    getAxiosData();
  }, [])




  //게시물 삭제
  const deleteListhandeler = async (ev) => {
    ev.preventDefault();
    await axios.delete('http://localhost:3001/posts/${postId}')
  }

  const getModal = (id)=> {

  }


  // const getCommentData = async () => {
  //   const commentData = await axios.get('')
  // }
  return (
    <All_box>
      <Header/>
      <Bigbox>
        <Section>
        {
          list.map((a) => {
            return (

                <div key={a.postId}>
                  <Outbox>
                    <Title>
                      <Setting>
                        <Pro src={a.userimage} />
                        <h4>{a.nickname}</h4>
                      </Setting>
                      <Icon><BiDotsHorizontalRounded style={{ marginTop: "15px", float: "right" }} onClick={() => { setModal(!modal) }} /></Icon>
                      {
                        modal === true ? (<>
                          <ModalBackground onClick={() => {
                            setModal(!modal)

                          }}>
                            <ModalBox onClick={(event) => { event.stopPropagation() }}  >
                              <p onClick={deleteListhandeler}>삭제</p>
                              <p>수정</p>
                              <p onClick={() => { setModal(!modal)  }}>취소</p>
                            </ModalBox>
                          </ModalBackground>
                        </>) : null
                      }
                    </Title>
                    <div>
                      <MainImg src={a.img} />
                    </div>
                    <div style={{ padding:"10px"}}>
                      <Icon style={{ marginTop: "10px" }}><BsSuitHeart style={{ marginRight: "15px" }} /><FaRegComment /></Icon>
                      <p style={{ margin: "5px 0px", paddingLeft: "5px" }}>좋아요 {a.postlikes}</p>
                      <Setting> <h4 style={{ margin: "5px 0px", paddingLeft: "5px" }}>{a.nickname}</h4> <p style={{ margin: "5px 0px", paddingLeft: "5px" }}>{a.content}</p></Setting>
                      <p onClick={() => { navigate(`/detail/${a.postId}`) }} style={{ margin: "5px 0px", paddingLeft: "5px" }}>댓글 {a.cntcomments}개 모두 보기</p>
                      <Setting><h4 style={{ margin: "5px 0px", paddingLeft: "5px" }}>닉네임</h4> <p style={{ margin: "5px 0px", paddingLeft: "5px" }}>댓글임</p></Setting>
                    </div>
                  </Outbox>
                </div>
        
            )
          })
        }
        </Section>
        <Twobox>
          <Twobox_head>
            <Twobox_img/>
            <Twobox_text>
              <h2>닉네임임</h2>
            </Twobox_text>
          </Twobox_head>
          <Text_box>
            <p>회원님을 위한 추천</p>
            <p>모두보기</p>
          </Text_box>

          {/* /*여기 맵돌릴거임 */}
          <Twobox_last>
            <Twobox_lastImg/>
            <Twobox_lastText>
              <h2>추천 닉네임</h2>
            </Twobox_lastText>
          </Twobox_last>
          {/* /*여기까지 맵돌릴거임 */}


        </Twobox>
      </Bigbox>
    </All_box>
  );
}

export default Main;

const All_box = styled.div`
  max-width: 2000px;
  min-width: 100px;
`

const Bigbox = styled.div`
  display: flex;
  justify-content: center;
`
const Twobox = styled.div`
  height: 300px;
  width: 400px;
  border: 1px solid red;
  margin-top: 40px;
  margin-left: 20px;
`

const Twobox_head = styled.div`
  height: 80px;
  border: 1px solid red;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  
`

const Twobox_img = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  border: 1px solid red;
  background-color: black;
`
const Twobox_text =styled.div`
    border: 1px solid red;
    height: 100%;
    width: 335px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h2 {
      margin: 5px;
      padding-left: 10px;
    }
`
const Text_box =styled.div`
  height: 30px;
  width: 100%;
  align-items: center;
  display: flex;
  border: 1px solid red;
  justify-content: space-between;

  h2 {
      margin: 3px;
      padding-left: 3px;
    }
`

const Twobox_last =styled.div`
margin-top: 10px;
height: 60px;
  border: 1px solid red;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`
const Twobox_lastImg = styled.img`
height: 60px;
width: 60px;
border-radius: 50%;
border: 1px solid red;
background-color: black;
` 

const Twobox_lastText =styled.div`
border: 1px solid red;
height: 100%;
width: 335px;
display: flex;
flex-direction: column;
justify-content: center;
h2 {
  margin: 5px;
  padding-left: 10px;
}
` 

const Section = styled.div`
display: flex;
flex-direction: column;
`

const Outbox = styled.div`
  border-radius: 12px;
  border: 1px solid red;
  width: 500px;
  height: 700px;
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`

// 수정 삭제 모달
const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;


const ModalBox = styled.div`
    background-color: white;
    border-radius: 10px;
    width: 40%;
    height: 20%;
    max-width: 500px;
    min-width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

/// 

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
 `

const Pro = styled.img`
  margin-top: 2px;
  margin-left: 4px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
 `

const MainImg = styled.img`
  
  width: 100%;
  height: 400px;
  margin-top: 15px;
`

const Setting = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`
const Icon = styled.div`
  font-size: 30px;
  cursor: pointer;
`
