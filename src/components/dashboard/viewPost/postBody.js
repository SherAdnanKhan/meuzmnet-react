import React, { useState, useRef } from 'react';
import { Link } from "react-router-dom";
import { getCurrentUser } from '../../../actions/authActions';
import ImagePostOption from '../../common/ImagePostOption';
import ToolTip from '../../common/toolTip/toolTip';


const PostBody = ({
  post, updatedCritqueStatus, onAddVault,
  onUnFavGallery, onReportPost, onModelDelete,
  onSharePost, onShareStrqModel,
  onTurnOffCrtiques, onRepostModal,
  onMzFlashModal,
}) => {
  const [show, setShow] = useState(false);
  const eventRef = useRef();


  const handleButtonPress = () => {
    eventRef.current = setTimeout(() => {
      setShow(!show);
    }, 2000)
  };

  const handleButtonRelease = () => {
    clearTimeout(eventRef.current);
  };

  return (
    <>
      <div className="image-option-box">
        {post &&
          <ImagePostOption
            post={post.post}
            onUnFavGallery={onUnFavGallery}
            onSharePost={onSharePost}
            onReportPost={onReportPost}
            onModelDelete={onModelDelete}
            onShareStrqModel={onShareStrqModel}
            onTurnOffCrtiques={onTurnOffCrtiques}
            updatedCritqueStatus={updatedCritqueStatus}
            onRepostModal={onRepostModal}
            onMzFlashModal={onMzFlashModal}
            onAddVault={onAddVault}
          />
        }
      </div>
      {getCurrentUser() &&
        <div className="valut-icon show-valut">
          <i
            className="fa fa-ellipsis-v postOptions"
            aria-hidden="true"
            data-for="more"
            data-tip="more"
          ></i>
          <ToolTip id="more" />
          <img
            className="valut-img"
            alt=""
            src="/assets/images/vaulticon.png"
            data-for="vault"
            data-tip="vault"
            onClick={() => onAddVault(post?.post)}
          />
          <ToolTip id="vault" />
        </div>
      }
      <div className="post-body">
        {post &&
          <div className="image-div"
            onTouchStart={handleButtonPress}
            onTouchEnd={handleButtonRelease}
          // onActivePost={onActivePost}
          >
            {post?.post?.post_type === 2
              ? (
                <video
                  width="320"
                  height="240"
                  controls
                  style={{ width: "100%", heigth: "100%" }}
                >
                  <source src={post?.post?.image?.path} type="video/mp4" />
                  <source src={post?.post?.image?.path} type="video/ogg" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img src={post?.post?.image?.path} alt="" style={{ width: "100%", heigth: "100%" }} />
              )
            }
          </div>
        }
        <div className={show ? 'right-clicked show' : 'right-clicked'}>
          {post?.other_posts?.map((other, index) => (
            <div className="boxes img-align" key={index}>
              <Link to={`/viewpost/${other.slug}`}>
                {other.post_type <= 1 &&
                  <img
                    className="valut-img"
                    alt=""
                    src={other.image.path}
                  />
                }
                {other.post_type === 2 &&
                  <video controls>
                    <source src={other.image.path} type="video/mp4" />
                    <source src={other.image.path} type="video/ogg" />
                    Your browser does not support the video tag.
                  </video>
                }
              </Link>
            </div>
          ))
          }
        </div>
      </div>
      <div className="galleryPeek"
      >
        <img           //Gallery peak icon
          className="galleryPeek_img"
          src="/assets/images/gallerypeek.png"
          alt=""
          onClick={() => { setShow(!show) }}
          data-for="galleryPeak"
          data-tip="gallery peak"
        />
        <ToolTip id="galleryPeak" />
      </div>
    </>
  )
}

export default PostBody;