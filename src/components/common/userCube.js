import React from 'react';

const UserCube = ({ user }) => {
  return (
    <div className='cubescroll'>
      <div className="procu_">
        <div className="scene">
          {user?.avatars?.length > 0
            && (
              <div className="cube">
                {user?.avatars?.length === 1
                  && (
                    <>
                      <div
                        className="cube-face  cube-face-front"
                        style={{
                          backgroundColor: user.feel.color_code,
                          borderColor: user.feel.color_code,
                          boxShadow: `0 0 20px ${user.feel.color_code}`
                        }}
                      >
                        <img alt="" src={user.avatars[0].path} height="100%" />
                      </div>
                      <div
                        className="cube-face  cube-face-back"
                        style={{
                          backgroundColor: user.feel.color_code,
                          borderColor: user.feel.color_code,
                          boxShadow: `0 0 20px ${user.feel.color_code}`
                        }}
                      >
                        <img alt="" src={user.avatars[0].path} height="100%" />
                      </div>
                      <div
                        className="cube-face  cube-face-left"
                        style={{
                          backgroundColor: user.feel.color_code,
                          borderColor: user.feel.color_code,
                          boxShadow: `0 0 20px ${user.feel.color_code}`
                        }}
                      >
                        <img alt="" src={user.avatars[0].path} height="100%" />
                      </div>
                      <div
                        className="cube-face  cube-face-right"
                        style={{
                          backgroundColor: user.feel.color_code,
                          borderColor: user.feel.color_code,
                          boxShadow: `0 0 20px ${user.feel.color_code}`
                        }}
                      >
                        <img alt="" src={user.avatars[0].path} height="100%" />
                      </div>
                    </>
                  )}
                {user?.avatars?.length === 2
                  && (
                    <>
                      <div
                        className="cube-face  cube-face-front"
                        style={{
                          backgroundColor: user.feel.color_code,
                          borderColor: user.feel.color_code,
                          boxShadow: `0 0 20px ${user.feel.color_code}`
                        }}
                      >
                        <img alt="" src={user.avatars[0].path} height="100%" />
                      </div>
                      <div
                        className="cube-face  cube-face-back"
                        style={{
                          backgroundColor: user.feel.color_code,
                          borderColor: user.feel.color_code,
                          boxShadow: `0 0 20px ${user.feel.color_code}`
                        }}
                      >
                        <img alt="" src={user.avatars[0].path} height="100%" />
                      </div>
                      <div
                        className="cube-face  cube-face-left"
                        style={{
                          backgroundColor: user.feel.color_code,
                          borderColor: user.feel.color_code,
                          boxShadow: `0 0 20px ${user.feel.color_code}`
                        }}
                      >
                        <img alt="" src={user.avatars[1].path} height="100%" />
                      </div>
                      <div
                        className="cube-face  cube-face-right"
                        style={{
                          backgroundColor: user.feel.color_code,
                          borderColor: user.feel.color_code,
                          boxShadow: `0 0 20px ${user.feel.color_code}`
                        }}
                      >
                        <img alt="" src={user.avatars[1].path} height="100%" />
                      </div>
                    </>
                  )}
                {user?.avatars?.length === 3
                  && (
                    <>
                      <div
                        className="cube-face  cube-face-front"
                        style={{
                          backgroundColor: user.feel.color_code,
                          borderColor: user.feel.color_code,
                          boxShadow: `0 0 20px ${user.feel.color_code}`
                        }}
                      >
                        <img alt="" src={user.avatars[0].path} height="100%" />
                      </div>
                      <div
                        className="cube-face  cube-face-back"
                        style={{
                          backgroundColor: user.feel.color_code,
                          borderColor: user.feel.color_code,
                          boxShadow: `0 0 20px ${user.feel.color_code}`
                        }}
                      >
                        <img alt="" src={user.avatars[1].path} height="100%" />
                      </div>
                      <div
                        className="cube-face  cube-face-left"
                        style={{
                          backgroundColor: user.feel.color_code,
                          borderColor: user.feel.color_code,
                          boxShadow: `0 0 20px ${user.feel.color_code}`
                        }}
                      >
                        <img alt="" src={user.avatars[2].path} height="100%" />
                      </div>
                      <div
                        className="cube-face  cube-face-right"
                        style={{
                          backgroundColor: user.feel.color_code,
                          borderColor: user.feel.color_code,
                          boxShadow: `0 0 20px ${user.feel.color_code}`
                        }}
                      >
                        <img alt="" src={user.avatars[0].path} height="100%" />
                      </div>
                    </>
                  )}
                {user?.avatars?.length >= 4
                  && (
                    <>
                      <div
                        className="cube-face  cube-face-front"
                        style={{
                          backgroundColor: user.feel.color_code,
                          borderColor: user.feel.color_code,
                          boxShadow: `0 0 20px ${user.feel.color_code}`
                        }}
                      >
                        <img alt="" src={user.avatars[0].path} height="100%" />
                      </div>
                      <div
                        className="cube-face  cube-face-back"
                        style={{
                          backgroundColor: user.feel.color_code,
                          borderColor: user.feel.color_code,
                          boxShadow: `0 0 20px ${user.feel.color_code}`
                        }}
                      >
                        <img alt="" src={user.avatars[1].path} height="100%" />
                      </div>
                      <div
                        className="cube-face  cube-face-left"
                        style={{
                          backgroundColor: user.feel.color_code,
                          borderColor: user.feel.color_code,
                          boxShadow: `0 0 20px ${user.feel.color_code}`
                        }}
                      >
                        <img alt="" src={user.avatars[2].path} height="100%" />
                      </div>
                      <div
                        className="cube-face  cube-face-right"
                        style={{
                          backgroundColor: user.feel.color_code,
                          borderColor: user.feel.color_code,
                          boxShadow: `0 0 20px ${user.feel.color_code}`
                        }}
                      >
                        <img alt="" src={user.avatars[3].path} height="100%" />
                      </div>
                    </>
                  )}
              </div>
            )}
        </div>
      </div>
      <div className="cuna">
        <div className="namerow">
          {user?.first_name}
        </div>
        <div className="artrow">
          {user?.last_name}
        </div>
        <div className="user-art">
          {user?.art
            && (
              <>
                <p> {user?.art?.parent?.name} </p>
                <p> {user?.art?.name} </p>
              </>
            )}
        </div>
      </div>
    </div >
  );
};

export default UserCube;
