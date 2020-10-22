import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, clearUsers } from '../../../actions/userActions';
import Avatar from '../../common/avatar';
import LazyInput from '../../common/lazyInput';

const Search = ({ feelColor }) => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { users } = useSelector(state => state.user);

  const handleSearch = useCallback(result => {
    dispatch(getAllUsers(result));
  }, [dispatch]);

  const handleChange = query => {
    setQuery(query);
  };

  return (
    <>
      <div
        className="search-bar"
        id="search-bar"
        style={{ backgroundColor: feelColor }}
      >
        <div className="back-btn" id="go-back">
          <i className="fa fa-arrow-left"></i>
        </div>
        <div className="search-input" style={{ backgroundColor: feelColor }} >
          <LazyInput
            type="text"
            id="search-field"
            value={query}
            onChange={handleChange}
            placeholder="Search"
            onSearchComplete={handleSearch}
          />
        </div>
      </div>
      <div id="search-result">
        {users?.map((user, index) => (
          <div key={index} className="result-box">
            <div className="profile-pic">
              <Link
                to={`/dashboard/studio/${user.slug}`}
                onClick={clearUsers}
              >
                <Avatar
                  user={user}
                />
              </Link>
              <div>
                <p className="usernames">
                  <Link to={`/dashboard/studio/${user.slug}`} >
                    {user.username}
                  </Link>
                </p>
                <p>
                  {user.art &&
                    <>
                      {user.art.parent && <> {user.art.parent.name + '/'} </>}
                      {user.art.name && <> {user.art.name} </>}
                    </>
                  }
                </p>
              </div>
            </div>
            <div className="other-pic">
              {user.posts_images_random.map((post_image, index_key) => {
                if (post_image.title.includes('.mp3') || post_image.title.includes('.mp4') || post_image.title.includes('.ogg')) {
                  return (
                    <video width="44" height="33" >
                      <source src={post_image.path} type="video/mp4" />
                      <source src={post_image.path} type="video/ogg" />
                            Your browser does not support the video tag.
                    </video>
                  )
                } else {
                  return (
                    <Link key={index_key} to='#'>
                      <img src={post_image.path} alt="" />
                    </Link>
                  )
                }
              }
              )}

            </div>
          </div>
        ))
        }
      </div>
    </>
  );
};

export default React.memo(Search);
