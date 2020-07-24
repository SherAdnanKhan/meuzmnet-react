import React, { useState,useContext } from 'react'
import ImageCropper from '../../common/imageCropper';
import { isEmpty } from '../../../utils/helperFunctions';
import { useHistory } from 'react-router-dom';
import UserContext from "../../../context/userContext";

const ExhibitionModel = ({ onSave }) => {
  const [croppedImage, setCroppedImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [toggle, setToggle] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const user = useContext(UserContext);
  console.log("user=",user)
  const history = useHistory();
  const handleCompleteCrop = blob => {
    setCroppedImage(blob);
  };

  const handleToggle = value => {
    setToggle(value);
    setImage()
  };

  const handleSkip = value => {
    setToggle(value);
    setCroppedImage('');
  };

  const handleChange = ({ target: input }) => {
    if (input.name === 'image' && input.files[0]) {
      setImage(input.files[0]);
      setImageUrl(URL.createObjectURL(input.files[0]));
      setToggle(true);
      setVideo(null);
      setIsValid(true);
    } else if (input.name === 'video' && input.files[0]) {
      setVideo(input.files[0]);
      setImage(null);
      setImageUrl('');
      setToggle(false);
      setIsValid(true);
      setCroppedImage(null);
    }
  };

  const handleSave = () => {
    if (croppedImage) {
      onSave('image', croppedImage)
    } else if (image) {
      onSave('image', image);
    } else if (video) {
      onSave('video', video);
    }
  };

  return (
    <div className="exhibition-model">
      <div className="update-image">
        <ImageCropper
          imageUrl={imageUrl}
          toggle={toggle}
          onToggle={handleToggle}
          onSkip={handleSkip}
          onCompleteCrop={handleCompleteCrop}
          croppedImage={croppedImage}
        />
        <div className="Exhibit-head">
          <div className="left-caret">
            <i
              className="fa fa-angle-left clickable"
              aria-hidden="true"
              onClick={() => history.goBack()}
            >
            </i>
          </div>

          <h2 >Add an Exhibit</h2>
        </div>
        <div className="up-img-box">

          {isEmpty(croppedImage) && !isEmpty(imageUrl) && <img className="update-pic" src={imageUrl} alt="gallery" />}
          {!isEmpty(croppedImage) && <img className="update-pic" src={URL.createObjectURL(croppedImage)} alt="gallery" />}
          {video &&
            <video width="320" height="240" controls>
              <source src={URL.createObjectURL(video)} type="video/mp4" />
              <source src={URL.createObjectURL(video)} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          }
          <div className="add-nag-icon" > 
            <div className="nag">
              <div className="nag-icon" style={{backgroundColor:user.feel.color_code}} >
                <img alt="" src="/assets/images/plus.png" />
              </div>
              <div className="nag-btn" style={{backgroundColor:user.feel.color_code}} >
                Add image
              </div>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
              />
            </div>
            <div className="nag">
              <div className="nag-icon" style={{backgroundColor:user.feel.color_code}}>
                <img
                  alt=""
                  src="/assets/images/plus.png"
                />
              </div>
              <div className="nag-btn" style={{backgroundColor:user.feel.color_code}}>
                Add video
                </div>
              <input
                type="file"
                accept=".mp4"
                name="video"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="actions" > 
          <button
            onClick={handleSave}
            className={isValid ? 'clickable' : 'btn-disable'}
            disabled={!isValid}
            style={{backgroundColor:user.feel.color_code}}
          >
            Save
           </button>
        </div>
      </div>
    </div>
  );
};

export default ExhibitionModel;
