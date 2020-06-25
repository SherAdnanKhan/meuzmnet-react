import React, { useState } from 'react';
import Avatar from '../../common/avatar';
import Input from '../../common/input';
import { useDispatch } from 'react-redux';
import { createFeed, createFeedComment } from '../../../actions/mzFlashActions';

const FeedSection = ({ collectiveFeeds, onModelChange, showModel, currentUser }) => {
  const dispatch = useDispatch();

  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [error, setError] = useState('');
  const [data, setData] = useState({
    feed: '',
    video: null,
    image: null
  });
  const [comment, setComment] = useState({})

  const handleChange = ({ target: input }) => {
    if (input.type === 'file') {
      onModelChange(false);
      if (input.files[0]) {
        if (input.name === 'image') {
          setData({ ...data, image: input.files[0], video: null });
          setImageUrl(URL.createObjectURL(input.files[0]));
          setVideoUrl('');
        } else if (input.name === 'video') {
          setData({ ...data, video: input.files[0], image: null });
          setVideoUrl(URL.createObjectURL(input.files[0]));
          setImageUrl('');
        }
      }
    } else {
      setData({ ...data, [input.name]: input.value });
      setCharCount(input.value.length);
    }
  };

  const handleCommentChange = ({ target: input }) => {
    setComment({ ...comment, [input.name]: input.value });
  };

  const handleEnter = (e, feedId) => {
    if (e.keyCode === 13) {
      const commentData = {
        feed_id: feedId,
        comment: comment[feedId]
      };
      dispatch(createFeedComment(commentData));
      setComment({ ...comment, [feedId]: '' });
    }
  }

  const validate = () => {
    let error = '';

    if (!data.feed) {
      error = 'Please enter your feed';
    }
    return error;
  };

  const handleSubmit = e => {
    e.preventDefault();

    const error = validate();
    const formData = new FormData();

    if (!error) {
      for (let key in data) {
        if (data[key]) {
          formData.append(key, data[key]);
        }
      }
      dispatch(createFeed(formData));
      setData({ ...data, image: null, video: null, feed: '' });
      setImageUrl('');
      setVideoUrl('');
      setCharCount(0);
    }
    setError(error);
  };

  const handleRepost = (e, feed) => {
    e.preventDefault();

    const formData = {};
    formData.feed_id = feed.id;
    formData.feed = feed.feed;

    dispatch(createFeed(formData));
  };

  return (
    <div className="col-4 box-3">
      <div className="message-input">
        <form className="form-inline" onSubmit={handleSubmit}>
          <i
            className="fa fa-plus"
            aria-hidden="true"
            onClick={() => onModelChange(true)}
          >
          </i>
          <Input
            type="text"
            id="feed"
            name="feed"
            value={data.feed}
            maxLength={200}
            onChange={handleChange}
            error={error}
          />
          <br />
          <input className="clickable btn-send" type="submit" defaultValue="Submit" />
        </form>
        <div className="counter"> ({charCount}/200)</div>
        {imageUrl &&
          <div className="image-preview">
            <img alt="" src={imageUrl} />
          </div>
        }
        {videoUrl &&
          <div className="video-preview">
            <video controls>
              <source src={videoUrl} type="video/mp4" />
              <source src={videoUrl} type="video/ogg" />
            Your browser does not support the video tag.
        </video>
          </div>
        }
        {showModel &&
          <div className="add-img-vid-box">
            <i
              className="fa fa-times close-add-box"
              onClick={() => onModelChange(false)}
            />
            <label>
              <img alt="" src="/assets/images/plus.png" />
            Add Image
            <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </label>
            <label>
              <img alt="" src="/assets/images/plus.png" />
            Add Video
            <input
                type="file"
                name="video"
                accept=".mp4"
                onChange={handleChange}
              />
            </label>
          </div>
        }
      </div>
      {collectiveFeeds &&
        collectiveFeeds.data.map((feed, index) => (
          <div className=" sub-box row set-sources" key={index}>
            <div className="col-3">
              <Avatar
                avatars={feed.user.avatars}
                feelColor={feed.user.feel_color}
              />
            </div>
            {feed.parent &&
              <div className="reposted-text">
                {feed.user.id === currentUser.id
                  ? <> You have reposted this feed </>
                  : <> {feed.user.username} hase reposted this feed </>
                }
              </div>
            }
            <div className="col-8">
              <span>{feed.user.username}</span>
            </div>
            <p className="submit-text">{feed.feed} </p>
            <div className="imgvideo-mzflash">
              {feed.feed_type === 1 &&
                feed.image &&
                <img
                  src={feed.image.path}
                  alt="Snow"
                  className="img-css"
                />
              }
              {feed.feed_type === 2 &&
                feed.image &&
                <div className="video">
                  <video controls>
                    <source src={feed.image.path} type="video/mp4" />
                    <source src={feed.image.path} type="video/ogg" />
                  Your browser does not support the video tag.
                </video>
                </div>
              }
            </div>
            <div className="flex-container">
              <div className="action">
                <button className="comment" to="#">Comment</button>
              </div>
              <div className="actions-repost">
                <button
                  className="repost"
                  onClick={e => handleRepost(e, feed)}
                >
                  Repost
                </button>
              </div>
            </div>
            <input
              type="text"
              id={feed.id}
              name={feed.id}
              value={comment[feed.id] ? comment[feed.id] : ''}
              placeholder="Enter a Comment..."
              onChange={handleCommentChange}
              onKeyUp={e => handleEnter(e, feed.id)}
            />
          </div>
        ))}
    </div>
  );
};

export default FeedSection;
