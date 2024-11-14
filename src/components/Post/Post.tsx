import React, { useEffect, useState } from "react";
import { format } from "date-fns";

import { StyledPost, PostCommentsBox } from "./Post.style";
import { PostSettings } from "./PostSettings";
import { useDeletePostMutation } from "../../store/API/postApi";
import { PostCommentsItem } from "./PostCommentsItem";
import { PostCommentsEditor } from "./PostCommentsEditor";

import type { PostItem } from "../../store/API/postApi";
import {
  useAddPostPhotoMutation,
  useDeletePostPhotoMutation,
} from "../../store/API/photosApi";

interface IPostProps {
  isLiked?: boolean;
  isMarked?: boolean;
  post: PostItem;
  onPostDelete?: () => void;
  onPostEditClick?: () => void;
  onPostUpdated?: () => void;
}

export const Post = ({
  isLiked,
  isMarked,
  post,
  onPostDelete,
  onPostEditClick,
  onPostUpdated,
}: IPostProps) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [newCommentValue, setNewCommentValue] = useState<string>("");
  const [deletePost, { isSuccess }] = useDeletePostMutation();
  const [uploadFile, { isSuccess: isPhotoAddedSuccessfully }] =
    useAddPostPhotoMutation();
  const [deleteFile, { isSuccess: isPhotoDeletedSuccessfully }] =
    useDeletePostPhotoMutation();

  const {
    main_text,
    user_fk: { name },
    reg_date,
    photos,
    id,
    comments,
  } = post;

  useEffect(() => {
    if (typeof onPostDelete === "function" && isSuccess) {
      onPostDelete();
      setIsSettingsOpen(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (
      typeof onPostUpdated === "function" &&
      (isPhotoAddedSuccessfully || isPhotoDeletedSuccessfully)
    ) {
      onPostUpdated();
    }
  }, [isPhotoAddedSuccessfully, isPhotoDeletedSuccessfully]);

  const handlePostDelete = () => {
    deletePost(id);
  };

  const handleEditClick = () => {
    if (typeof onPostEditClick === "function") {
      onPostEditClick();
      setIsSettingsOpen(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("event", event);

    if (event.target.files?.length) {
      const formData = new FormData();

      formData.append("post_id", `${id}`);
      formData.append("photo_file", event.target.files[0]);

      uploadFile(formData);
    }
  };

  const handleDeletePhoto = (photoId: string) => {
    deleteFile(photoId);
  };

  return (
    <StyledPost $isLiked={isLiked} $isMarked={isMarked}>
      <div className="UserElem">
        <img src="./img/users/aleksandr-maykov.jpeg" alt="User" />
        <div className="user__description">
          <span className="main__text">{name}</span>
          <p className="secondary__text">
            {format(new Date(reg_date), "dd-MM-yyyy")}
          </p>
        </div>
      </div>
      <p className="Post__text">{main_text}</p>
      {!!photos.length && (
        <div className="media-container">
          {photos.map((photo) => (
            <span className="post-image-box">
              <img
                key={`photo-${photo.photo_id}`}
                className="media__item"
                src={`http://161.35.153.209:5430${photo.photo_url}`}
                alt="Post Item"
              />
              <svg
                id="_Слой_2"
                data-name="Слой 2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 14 14"
                className="delete-post-photo-btn"
                onClick={() => handleDeletePhoto(`${photo.photo_id}`)}
              >
                <g id="_Слой_1-2" data-name="Слой 1">
                  <path
                    className="cls-1"
                    d="M13,8h-5v5c0,.27-.11,.52-.29,.71-.19,.19-.44,.29-.71,.29s-.52-.11-.71-.29c-.19-.19-.29-.44-.29-.71v-5H1c-.27,0-.52-.11-.71-.29-.19-.19-.29-.44-.29-.71s.11-.52,.29-.71c.19-.19,.44-.29,.71-.29H6V1c0-.27,.11-.52,.29-.71,.19-.19,.44-.29,.71-.29s.52,.11,.71,.29c.19,.19,.29,.44,.29,.71V6h5c.27,0,.52,.11,.71,.29,.19,.19,.29,.44,.29,.71s-.11,.52-.29,.71c-.19,.19-.44,.29-.71,.29Z"
                  />
                </g>
              </svg>
            </span>
          ))}
        </div>
      )}
      <div className="PostControls">
        <div className="icon-wrapper comment">
          <span className="count comments-count">{comments.length}</span>
          <svg
            className="icon icon-comment"
            viewBox="0 0 26 26"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="comment"
              d="M9.25 25.5C8.91848 25.5 8.60054 25.3683 8.36612 25.1339C8.1317 24.8995 8 24.5815 8 24.25V20.5H3C2.33696 20.5 1.70107 20.2366 1.23223 19.7678C0.763392 19.2989 0.5 18.663 0.5 18V3C0.5 2.33696 0.763392 1.70107 1.23223 1.23223C1.70107 0.763392 2.33696 0.5 3 0.5H23C23.663 0.5 24.2989 0.763392 24.7678 1.23223C25.2366 1.70107 25.5 2.33696 25.5 3V18C25.5 18.663 25.2366 19.2989 24.7678 19.7678C24.2989 20.2366 23.663 20.5 23 20.5H15.375L10.75 25.1375C10.5 25.375 10.1875 25.5 9.875 25.5H9.25ZM10.5 18V21.85L14.35 18H23V3H3V18H10.5Z"
              fill="#6D6F7A"
            />
          </svg>
        </div>
        <div className="icon-wrapper repost">
          <svg
            className="icon icon-repost"
            viewBox="0 0 32 26"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="icon"
              d="M31.1767 11.6881L20.105 0.818783C19.9503 0.666682 19.753 0.563052 19.5383 0.520999C19.3235 0.478945 19.1009 0.500357 18.8985 0.582526C18.6962 0.664696 18.5232 0.803931 18.4014 0.982625C18.2797 1.16132 18.2146 1.37144 18.2145 1.58643V7.06864C14.6246 7.37026 10.6595 9.09577 7.39755 11.8117C3.46988 15.0834 1.02443 19.2993 0.510988 23.6824C0.470864 24.0231 0.541243 24.3676 0.712109 24.6669C0.882976 24.9661 1.14562 25.2048 1.46267 25.349C1.77972 25.4932 2.13502 25.5355 2.47801 25.47C2.82099 25.4044 3.13418 25.2344 3.37301 24.984C4.89536 23.393 10.3122 18.3619 18.2145 17.9189V23.3251C18.2146 23.54 18.2797 23.7502 18.4014 23.9289C18.5232 24.1075 18.6962 24.2468 18.8985 24.329C19.1009 24.4111 19.3235 24.4325 19.5383 24.3905C19.753 24.3484 19.9503 24.2448 20.105 24.0927L31.1767 13.2234C31.3837 13.0196 31.5 12.7436 31.5 12.4557C31.5 12.1679 31.3837 11.8919 31.1767 11.6881ZM20.4289 20.7015V16.8035C20.4289 16.5152 20.3122 16.2387 20.1046 16.0349C19.897 15.831 19.6153 15.7165 19.3217 15.7165C15.4356 15.7165 11.6504 16.7124 8.07153 18.6784C6.24879 19.6841 4.55049 20.8932 3.01041 22.2816C3.8131 19.0425 5.83645 15.9625 8.82994 13.4693C12.0435 10.7941 15.9656 9.19495 19.3217 9.19495C19.6153 9.19495 19.897 9.08043 20.1046 8.87659C20.3122 8.67275 20.4289 8.39629 20.4289 8.10802V4.21137L28.8281 12.4557L20.4289 20.7015Z"
              fill="#6D6F7A"
            />
          </svg>
        </div>
        <div className="icon-wrapper upload-img">
          <input type="file" onChange={handleFileUpload} />
          <svg
            id="_Слой_2"
            data-name="Слой 2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 14"
          >
            <g id="_Слой_1-2" data-name="Слой 1">
              <path
                className="cls-1"
                d="M13,8h-5v5c0,.27-.11,.52-.29,.71-.19,.19-.44,.29-.71,.29s-.52-.11-.71-.29c-.19-.19-.29-.44-.29-.71v-5H1c-.27,0-.52-.11-.71-.29-.19-.19-.29-.44-.29-.71s.11-.52,.29-.71c.19-.19,.44-.29,.71-.29H6V1c0-.27,.11-.52,.29-.71,.19-.19,.44-.29,.71-.29s.52,.11,.71,.29c.19,.19,.29,.44,.29,.71V6h5c.27,0,.52,.11,.71,.29,.19,.19,.29,.44,.29,.71s-.11,.52-.29,.71c-.19,.19-.44,.29-.71,.29Z"
              />
            </g>
          </svg>
        </div>
      </div>
      <PostCommentsBox>
        {comments &&
          !!comments.length &&
          comments.map((comment) => (
            <div className="CommentBlock">
              <PostCommentsItem commentsText={comment} />
            </div>
          ))}
        <PostCommentsEditor
          value={newCommentValue}
          onChange={(event) => setNewCommentValue(event.target.value)}
        />
      </PostCommentsBox>
      <svg
        className="icon icon-more"
        viewBox="0 0 25 5"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
      >
        <g id="more">
          <circle id="ellipse" cx="22.5" cy="2.5" r="2.5" />
          <circle id="ellipse_2" cx="12.5" cy="2.5" r="2.5" />
          <circle id="ellipse_3" cx="2.5" cy="2.5" r="2.5" />
        </g>
      </svg>
      {isSettingsOpen && (
        <PostSettings
          onDeleteClick={handlePostDelete}
          onEditClick={handleEditClick}
        />
      )}
    </StyledPost>
  );
};
