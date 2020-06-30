import React from 'react';
import Avatar from "../../common/avatar";
import { Link, useRouteMatch } from 'react-router-dom';
import Stroke from '../../common/stroke';
import { makeStoke, unStoke } from "../../../actions/postAction";
import { useDispatch } from "react-redux";


const LobbyPosts = ({ post }) => {
  const { params: { id } } = useRouteMatch();
  const dispatch = useDispatch();
  const handleUnStoke = (e, ID) => {
    //e.preventDefault();
    dispatch(unStoke(ID, id))
  }

  const handleStoke = (e, ID) => {
    //e.preventDefault();
    dispatch(makeStoke(ID, id));
  }
  return (
    <div className="post-page">
      <div className="post-head">
        <p className="usernames">
          <Link to={`/dashboard/studio/${post.user.slug}`} >
            {post.user.username}
          </Link>
        </p>
        <Link to={`/dashboard/studio/${post.user.slug}`} >
          <Avatar avatars={post.user.avatars && post.user.avatars} feelColor={post.user.feel_color} />
        </Link>
        {post.user.art &&
          <>
            {post.user.art.parent && post.user.art.parent.name + '/'}
            {post.user.art.name && post.user.art.name}
          </>
        }
      </div>
      <div className="valut-icon">
        <img className="valut-img" alt="" src="/assets/images/vaulticon.png" />
      </div>
      <div className="post-body">
        {post.post_type === 2
          ? (
            <video width="320" height="240" controls>
              <source src={post.image.path} type="video/mp4" />
              <source src={post.image.path} type="video/ogg" />
           Your browser does not support the video tag.
            </video>
          ) : (
            <img src={post.image.path} alt="" stye={{ width: "100%", heigth: "100%" }} />
          )
        }

      </div>
      <div className="onearttitle">
        <p>{post && post.title}</p>
        <div class="lobby-icon">
          <div className="strk-btn">
            <Stroke
              hasStroke={post.has_stroke}
              className="strk-img"
              onStroke={() => handleStoke(post.id)}
              onUnstroke={() => handleUnStoke(post.id)}
            />
            {post.stroke_users.length}
          </div>
          <div className="action">
            <img className="comment-img" alt="" src="/assets/images/crit1.png" />
            {post.comments.length}
          </div>
          <div className="action">
            <img className="comment-img" alt="" src="/assets/images/ncommnicon.png" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LobbyPosts;