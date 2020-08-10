import React, { useEffect, useState } from 'react';
import { useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PostFooter from "./postFooter";
import ViewPostHead from "./postHead";
import ViewPostBody from "./postBody";
import ViewPostHeader from "./postHeader";
import Comment from './comments';
import LobbyModal from "../../common/lobbyModal";
import SharePostModal from '../../common/sharePostModal';
import ReportPostModel from '../../common/reportPostModel';
import SharePostStrqModal from '../../common/sharePostStrqModal';
import TurnOffCrtiqueModal from "../../common/turnOffCritqueModal";
import RepostModal from "../../common/repostModal";
import MzFlashModal from "../../common/mzFlashModal";
import { getFavourites } from '../../../actions/userActions';
import { getUserArtById } from "../../../actions/userActions";
import { getPost, strokePost, unstrokePost } from "../../../actions/postAction";
import { unfavGallery, getMyGalleries } from "../../../actions/galleryActions";
import { deletePost, reportPost, changeCritqueStatus, sharePostOnStrq, repost, shareMzFlash } from '../../../actions/postAction';


const ViewPost = () => {
  const user_art_id = JSON.parse(localStorage.getItem('user'))?.art_id
  const dispatch = useDispatch();
  const { params: { id } } = useRouteMatch();
  const {
    user: { favouriteUsers },
    postView: { crtiqueStatus, sendUser },
    gallery: { myGalleries },

  } = useSelector(state => state);
  const [activePost, setActivePost] = useState('');
  const [showModelShare, setShowModelShare] = useState(false);
  const [showModelReport, setShowModelReport] = useState(false);
  const [showModelStrqShare, setshowModelStrqShare] = useState(false);
  const [showModalTurnOffCritque, setshowModalTurnOffCritque] = useState(false);
  const [showModalRepost, setShowModalRepost] = useState(false);
  const [galleryId, setGalleryId] = useState('');
  const [showMzFlashModal, setShowMzFlashModal] = useState(false);
  const [showDeleteModel, setShowDeleteModel] = useState(false);

  const {
    postView: { post, comments },
  } = useSelector(state => state);

  useEffect(() => {
    dispatch(getPost(id))
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getMyGalleries());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFavourites());
    dispatch(getUserArtById(user_art_id));
  }, [dispatch, user_art_id]);

  const handleUnStoke = () => {
    dispatch(unstrokePost(post.post.id, post.post.gallery_id, post.post.user))
  }
  const handleStoke = () => {
    dispatch(strokePost(post.post.id, post.post.gallery_id, post.post.user));
  }
  const handlePostDeleteModel = (value) => {
    setShowDeleteModel(value);
  };
  const handleDelete = (status, post) => {
    setShowDeleteModel(status);
    dispatch(deletePost(post));
  }

  const handleShareModel = (status, post) => {
    //dispatch(standardSharePost(post.id));
    setShowModelShare(status);
  };

  const handleUnfavGallery = (gallery) => {
    dispatch(unfavGallery(gallery));
  }

  const handleReportModel = (status, post) => {
    setShowModelReport(status);
  }

  const onReport = (post) => {
    dispatch(reportPost(post.id));
    setShowModelReport(false);
  }

  const handleStrqShareModel = (status, post) => {
    setshowModelStrqShare(status);
  }

  const onStrqShare = (post, userId) => {

    dispatch(sharePostOnStrq(post, userId));
  }
  const handleTurnOffCrtiquesModal = (value) => {
    setshowModalTurnOffCritque(value);
  }
  const handleTurnOnOffCrtique = (modalStatus, post, status) => {
    setshowModalTurnOffCritque(modalStatus);
    dispatch(changeCritqueStatus(post, status));
  }
  const handleMzFlashModal = (status) => {
    setShowMzFlashModal(status);
  }
  const handleMzFlash = (status, post) => {
    setShowMzFlashModal(status);
    dispatch(shareMzFlash(post));
  }
  const handleRepostLobby = (status, post, gallery) => {
    dispatch(repost(post.id, gallery))
    setShowModalRepost(status);
  }
  const handleRepostModal = (status,) => {
    setShowModalRepost(status);
  }
  const getSelectedGalleryId = (gallery) => {
    setGalleryId(gallery);
  }
  const handleActivePost = post => {

    if (post.id === activePost.id) {
      setActivePost('');
    } else {
      setActivePost(post);
    }
  }

  return (
    <>
      {showDeleteModel &&
        <LobbyModal
          onDelete={handleDelete}
          onModalClose={handlePostDeleteModel}
          activePost={post?.post}
          onSharePost={handleShareModel}
        />
      }
      {showModelShare &&
        <SharePostModal
          onModalClose={handleShareModel}
          post={post?.post}
        />
      }
      {showModelReport &&
        <ReportPostModel
          onReport={onReport}
          onModalClose={handleReportModel}
          post={post?.post}
          selectedGallery={galleryId}
        />
      }
      {showModelStrqShare &&
        <SharePostStrqModal
          onShare={onStrqShare}
          onModalClose={handleStrqShareModel}
          post={post?.post}
          favouriteUsers={favouriteUsers}
          sendUser={sendUser}
        />
      }
      {showModalRepost &&
        <RepostModal
          onRepost={handleRepostLobby}
          onModalClose={handleRepostModal}
          post={post?.post}
          myGalleries={myGalleries}
          selectedGalleryId={galleryId}
          onGalleryId={getSelectedGalleryId}
        />
      }
      {showModalTurnOffCritque &&
        <TurnOffCrtiqueModal
          onModalClose={handleTurnOffCrtiquesModal}
          post={post?.post}
          updatedCritqueStatus={crtiqueStatus}
          onHandleCrtique={handleTurnOnOffCrtique} />
      }
      {showMzFlashModal &&
        <MzFlashModal onModalClose={handleMzFlashModal} post={post?.post} onConfirm={handleMzFlash} />
      }
      <div className={`post-page ${post && post?.user?.feel_color}`}>
        <ViewPostHeader
          post={post && post?.post}
        />
        <ViewPostHead
          post={post && post?.post}
        />
        <ViewPostBody
          post={post?.post}
          onActivePost={handleActivePost}
          onUnFavGallery={handleUnfavGallery}
          activePost={activePost}
          onModelDelete={handlePostDeleteModel}
          onSharePost={handleShareModel}
          onReportPost={handleReportModel}
          onShareStrqModel={handleStrqShareModel}
          onStrqShare={onStrqShare}
          onTurnOffCrtiques={handleTurnOffCrtiquesModal}
          updatedCritqueStatus={crtiqueStatus}
          onRepostModal={handleRepostModal}
          onMzFlashModal={handleMzFlashModal}
        />
        <PostFooter
          post={post?.post}
          comments={comments}
          handleStoke={handleStoke}
          handleUnStoke={handleUnStoke}
          updatedCritqueStatus={crtiqueStatus}
        />
        <Comment post={post && post.post} />
      </div>
    </>
  )
}
export default ViewPost;