import { useState } from "react"
import { connect } from "react-redux"
import  styled from "styled-components";
import ReactPlayer from "react-player";
import { postArticleWithFirebase } from "./redux/actions";
import { Timestamp} from "firebase/firestore";

const ShareModel = (props) => {
  const [textAreaValue , setTextAreaValue] = useState("") ;
  const [selectImageOrMedia , setSelectImageOrMedia] = useState("") ;
  const [selectedImage , setSelectedImage] = useState("") ;
  const [selectedMedia , setSelectedMedia] = useState("") ;
  const handleChange = (e)=>{
    // access selected image
   const image = e.target.files[0] ;
   if(!image || undefined){
    alert(`this is not an image , this file is${typeof image}`)
   }else{
    setSelectedImage(image) ;
   }
  }
  const close = (event) =>{
   setTextAreaValue("") ;
   setSelectImageOrMedia("") ;
   setSelectedImage("");
   setSelectedMedia("") ;
   props.handleClick(event) ;
  }
  const handlePostArticles  =  (e) => {
     e.preventDefault() ;
     if(e.target !== e.currentTarget){
      return ;
     }
     const postInfo = {
      image: selectedImage,
      video: selectedMedia,
      user: props.user,
      description: textAreaValue,
      timestamp: Timestamp.now(),
     } ;
     // this will make a shareModel empty after user post or share a post to begin from start to write to write or upload video or image
     props.postArticles(postInfo)
   close(e) ;
  }
const Switch = (object) =>{
  setSelectImageOrMedia(object)
}
  return(
   <>
   {props.showModel &&
    <Container>
        <Content>
            <Header>
           <h2> Create a post </h2>
           <button onClick={(e) =>close()}>
            <img src="/images/close-icon.svg"/>
           </button>
            </Header>
          <ShareSection>
         <UserInfo>
         {props.user && props.user.photoURL ?(
            <img src={props.user.photoURL}/>
           ) : (
            <img src="/images/user.svg"/>
          )}
          <span>{props.user && props.user.displayName}</span>
         </UserInfo>
         <Editor>
            <textarea value={textAreaValue} onChange={(e) =>
                 setTextAreaValue(e.target.value)}
                  placeholder="what do you want to talk about?"
                  autoFocus={true}/>

          {selectImageOrMedia === "image" ?
          <UploadPhoto>
              <input type="file" name="image" id="file" onChange={handleChange} style={{display : "none"}}/>
               <p>
              <label className="label" style={{
                 cursor  : "pointer"
                , display : "block" ,
                marginBottom : "20px"
                }}
              htmlFor="file"> Select an image to share </label>
               </p>
               {selectedImage && (
                    <img src={URL.createObjectURL(selectedImage )} alt="image"/>
               )}
          </UploadPhoto>

           : selectImageOrMedia=== "media" && (
              <>
              <input
              type="text" value={selectedMedia} onChange={(e) => setSelectedMedia(e.target.value)}
               placeholder="please input a video link" style=
                {{
            width : "100%" ,
            height : "32px"
                 }}/>
                 {selectedMedia  && (
                   <ReactPlayer width="100%" url={selectedMedia}/>
                 )}
              </>
           )}
         </Editor>
          </ShareSection>
          <ShareCreation>
              <AttachAsset>
                <AssetButton onClick={() => Switch("image")}>
                  <img src="/images/share-image.svg" alt="" />
                </AssetButton>
                <AssetButton onClick={() => Switch("media")}>
                  <img src="/images/share-video.svg" alt="" />
                </AssetButton>
              </AttachAsset>
              <ShareComments>
                <AssetButton>
                  <img src="/images/share-comment.svg" alt="" />
                  Anyone
                </AssetButton>
              </ShareComments>
              <PostButton
                onClick={(e) => handlePostArticles(e)}
                disabled={!textAreaValue ? true : false}
              >
                Post
              </PostButton>
            </ShareCreation>

        </Content>
    </Container>
  } </>
)}
   const Container = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   z-index: 9999;
   color: black;
   background-color: rgba(0, 0, 0, 0.8);
   animation: fadeIn 0.3s;
 `;
 const Content = styled.div`
   width: 100%;
   max-width: 552px;
   background-color: white;
   max-height: 99%;
   overflow: initial;
   border-radius: 5px;
   position: relative;
   display: flex;
   flex-direction: column;
   top: 32px;
   margin: 0 auto;
   button {
     border: none;
     display: flex;
     justify-content: center;
     align-items: center;
     transition: background 0.3s ease;
   }
 `;
 const Header = styled.div`
   display: flex;
   justify-content: space-between;
   padding: 16px 20px;
   border-bottom: 1px solid rgba(0, 0, 0, 0.15);
   align-items: center;
   h2 {
     line-height: 1.5;
     font-weight: 400;
     font-size: 18px;
     color: rgba(0, 0, 0, 0.6);
   }
   button {
     height: 40px;
     width: 40px;
     min-width: auto;
     color: rgba(0, 0, 0, 0.15);
     background: none;
     border-radius: 50%;
     cursor: pointer;
     &:hover {
       background-color: rgba(0, 0, 0, 0.08);
     }
   }
   svg,
   img {
     pointer-events: none;
   }
 `;
 const ShareSection = styled.div`
   display: flex;
   flex-direction: column;
   flex-grow: 1;
   overflow-y: auto;
   vertical-align: baseline;
   background: transparent;
   padding: 8px 12px;
 `;
 const UserInfo = styled.div`
   display: flex;
   align-items: center;
   padding: 12px 24px;
   sv,
   img {
     width: 48px;
     height: 48px;
     background-clip: content-box;
     border: 2px solid transparent;
     border-radius: 50%;
   }
   span {
     font-weight: 600;
     line-height: 1.5;
     font-size: 16px;
     margin-left: 5px;
   }
 `;
 const ShareCreation = styled.div`
   display: flex;
   justify-content: space-between;
   padding: 12px 24px 16px 16px;
   height: 30px;
 `;
 const AssetButton = styled.button`
   height: 40px;
   min-width: auto;
   color: rgba(0, 0, 0, 0.6);
   font-weight: 500;
   font-size: 14px;
   background: none;
   border-radius: 50%;
   cursor: pointer;
   &:hover {
     background-color: rgba(0, 0, 0, 0.08);
   }
 `;
 const AttachAsset = styled.div`
   display: flex;
   align-items: center;
   padding-right: 8px;
   ${AssetButton} {
     width: 40px;
   }
 `;
 const ShareComments = styled.div`
   padding-left: 8px;
   margin-right: auto;
   border-left: 1px solid rgba(0, 0, 0, 0.15);
   display: grid;
   place-items: center;
   ${AssetButton} {
     svg,
     img {
       margin-right: 5px;
     }
     padding: 10px;
     height: 30px;
     border-radius: 30px;
     &:hover {
       background-color: rgba(0, 0, 0, 0.08);
     }
   }
 `;
 const PostButton = styled.button`
   min-with: 60px;
   padding-left: 16px;
   padding-right: 16px;
   background: ${(props) => (props.disabled ? "rgb(235,235,235)" : "#0a66c2")};
   color: ${(props) => (props.disabled ? "rgb(0,0,0,0.25)" : "white")};
   cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
   font-weight: 500;
   font-size: 16px;
   border-radius: 30px;
   &:hover {
     background: ${(props) => (props.disabled ? "" : "#004182")};
   }
 `;
 const UploadPhoto = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;
 const Editor = styled.div`
   padding: 12px 24px;
   textarea {
     width: 100%;
     min-height: 100px;
     resize: none;
     font-size: 16px;
     font-weight: 400;
     outline: none;
     border: none;
     line-height: 1.5;
   }
 `;

 const mapStateToProps = (state) =>{
  return {
   user : state.userPage.user
  }
 }
 const mapDispatchToProps = (dispatch) =>{
  return {
    postArticles : (postInfo) => dispatch(postArticleWithFirebase(postInfo))
  }
 }
export default connect(mapStateToProps ,mapDispatchToProps)(ShareModel)