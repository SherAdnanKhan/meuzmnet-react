import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComments, createComment, clearComments } from '../../../actions/postAction';
import Avatar from '../../common/avatar';
import { getCurrentUser } from "../../../actions/authActions";

const Comment = ({ post, onClose }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const { comments, otherPrivacy } = useSelector(state => state.postView);
  const bottomRef = useRef();

  useEffect(() => {
    if (post) {
      dispatch(getComments(post.id))
    }
    return () => {
      dispatch(clearComments());
    }
  }, [post, dispatch]);

  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [comments]);

  const handleSubmit = () => {
    const data = {
      comment,
      post_id: post.id
    };
    dispatch(createComment(data, post.id, post.gallery_id, post.user));
    setComment('');
  };

  const getCommentTime = comment => {
    const splitted = comment.created_at.split(',');
    const time =
      (splitted[0] === 'just now' || splitted[0].includes('seconds'))
        ? splitted[0]
        : `${splitted[0]} ago`;

    return time;
  };

  return (
    <>
      <div className="user-list-view">
        <div className="user-list-top">
          <div className="user-name">
            <p>Akif</p>
          </div>
          <div className="user-cude">
            <div className="artcubecase">
              <div className="procusmallmove">
                <div className="scenesmall">
                  <a href="studio.php?idstudio=4&gal=1">
                    <div className="cubesmallmove">
                      <div className="cube-facesmall  cube-face-frontsmall" style={{ borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange' }}><img src="/assets/images/logowhite.png" height="100%" alt="" /></div>
                      <div className="cube-facesmall  cube-face-backsmall" style={{ borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange' }}><img src="/assets/images/logowhite.png" height="100%" alt="" /></div>
                      <div className="cube-facesmall  cube-face-leftsmall" style={{ borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange' }}><img src="/assets/images/logowhite.png" height="100%" alt="" /></div>
                      <div className="cube-facesmall  cube-face-rightsmall" style={{ borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange' }}><img src="/assets/images/logowhite.png" height="100%" alt="" /></div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="user-link">
            <p>WebDesign/ <br /> Programmer </p>
          </div>

        </div>
        <div className="big-image">
          <img src="/assets/images/gray.png" alt="" />
          <div className="right-box">
          </div>
        </div>
        <div>
          <p>Second</p>
        </div>
        <div className="user-btns">
          <div>
            <img src="/assets/images/strokeiconem.png" alt="" />
            <p>1 stroke</p>
          </div>
          <div>
            <img className="open-commet" src="/assets/images/crit1.png" alt="" />
          </div>
          <div>
            <img src="/assets/images/ncommnicon.png" alt="" />
          </div>
        </div>
      </div>

      <div className="comments-box">
        <div className="comment-bar">
          <div className="commnent-img">
            {(post?.post_type === 1 || post?.post_type === 0) &&
              <>
                {post?.image?.path &&
                  <img
                    alt=""
                    src={post?.image?.path}
                  />
                }
              </>
            }
            {post?.post_type === 2 &&
              <video controls>
                <source src={post?.image?.path}></source>
              </video>
            }
            <i className="fa fa-times close-comment" onClick={onClose}></i>
          </div>
          <div className="comment-sec">
            {comments &&
              comments.map((comment, index) => (
                <div className="user-commet" key={index}>
                  <div className="user-cude">
                    <Avatar
                      user={comment.user}
                    />
                  </div>
                  <div className="comment-info">
                    <p>{comment.user.username} : <span>{comment.description}</span> </p>
                    <p><span className="dim">{getCommentTime(comment)}</span></p>
                  </div>
                </div>
              ))
            }
            <div className="botton" ref={ref => bottomRef.current = ref}></div>
          </div>
          {otherPrivacy &&
            <>
              {((getCurrentUser()?.id === post?.created_by) || (post?.critiques_status === 1 && otherPrivacy?.is_allowed === 1)) ?
                <div className="text-area">
                  <div className="msg-input">
                    <textarea
                      placeholder=" Add a critique..."
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                    />
                  </div>
                  <button onClick={handleSubmit} className="clickable">
                    <img src="/assets/images/crit1.png" alt="" />
                  </button>
                </div>
                :
                <div className="comment-error">
                  <p>Comments are disabled for this post.</p>
                </div>
              }
            </>
          }
        </div>
      </div>
    </>
  );
};

export default React.memo(Comment);
