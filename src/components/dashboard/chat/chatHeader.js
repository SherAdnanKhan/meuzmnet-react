import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import MeuzmLogo from '../../common/meuzmLogo';
import Avatar from '../../common/avatar';
import socket from '../../../services/socketService';
import CallingModal from './callingModal';
import { useWindowUnloadEffect } from '../../common/useWindowUnloadEffect';
import useViewport from '../../common/useViewport';
import ToolTip from '../../common/toolTip/toolTip';
import { useSelector } from "react-redux";
import OtherUserOptions from './OtherUserOptions';
import ReportUserModal from './reportUserModal';
import ConfirmationModal from './confirmationModal'
import { muteUser, blockUser, unMuteUser, unBlockUser } from "./../../../actions/userActions";
import { useDispatch } from "react-redux"
import NoAnswerModal from './noAnswerModal';

const ChatHeader = ({
  conversation, onlineUsers, onOpenInvitationModel,
  onOpenParticipatsModel, currentUser, onBackPress,
  onOpenDraw, user, isBlocked, isViewAble, isMuted, onLeaveMessage
}) => {
  const filtered = conversation?.participants.filter(p => p.id !== currentUser.id)[0];
  const history = useHistory();
  const rejectedUsers = useRef([]);
  const interval = useRef();
  const [hasRendered, setHasRendered] = useState(false);
  const [showCallingModal, setShowCallingModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showMuteModal, setShowMuteModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [hasMeeting, sethasMeeting] = useState(null);
  const [countUp, setCountUp] = useState(0);
  const [noAnswerModal, setNoAnswerModal] = useState(false);
  const allParticipants = useRef([]);
  const audioRef = useRef();

  const { width } = useViewport();
  const breakPoint = 768;

  const { feelColor } = useSelector(state => state.feelColor)
  const dispatch = useDispatch();

  const handleDecline = useCallback(() => {
    clearInterval(interval.current);
    setShowCallingModal(false);
    setCountUp(countUp => countUp = 0);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    socket.emit('decline-call', {
      caller: currentUser,
      room: conversation?.id,
      participants: conversation
        ?.participants
        ?.filter(p => p.id !== currentUser.id || [])
    })
  }, [conversation, currentUser]);

  useWindowUnloadEffect(() => {
    socket.off('call-accepted');
    socket.off('onMeetingEnded')
    socket.off('call-rejected')
    clearInterval(interval);
  }, true);

  useEffect(() => {
    if (countUp === 15) {
      handleDecline();
      setNoAnswerModal(noAnswerModal => noAnswerModal = true);
    }
  }, [countUp, handleDecline]);

  useEffect(() => {
    if (conversation?.participants) {
      allParticipants.current = conversation?.participants;
    }

    if (conversation) {
      socket.emit('onMeetingStatus', conversation.id, meetingStatus => {
        sethasMeeting(meetingStatus);
      });
    }
  }, [conversation]);

  useEffect(() => {
    if (!hasRendered) {
      socket.on('onMeetingEnded', () => {
        sethasMeeting(false);
      })
      socket.on('call-accepted', data => {
        clearInterval(interval.current);

        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        history.push(`/video-call/${data.room}`)
      });

      socket.on('call-rejected', data => {
        if (!rejectedUsers.current.some(user => user.id === data.user.id)) {
          rejectedUsers.current.push(data.user);
        }

        if (rejectedUsers.current.length === allParticipants.current?.length - 1) {
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
          setShowCallingModal(showCallingModal => showCallingModal = false);
          clearInterval(interval.current);
        }
      });
      setHasRendered(true);
    }
  }, [history, hasRendered, conversation]);

  const handleCall = async () => {
    rejectedUsers.current = [];

    noAnswerModal && setNoAnswerModal(false);
    setShowCallingModal(true);

    audioRef.current = new Audio('/assets/sounds/Skype Ringtone 2018.mp3');

    try {
      await audioRef.current.play();
    } catch (ex) {
    }

    socket.emit('outgoing-call', {
      caller: currentUser,
      room: conversation?.id,
      participants: conversation
        ?.participants
        ?.filter(p => p.id !== currentUser.id) || []
    });

    interval.current = setInterval(() => {
      setCountUp(countUp => countUp + 1);
    }, 1000);
  };

  const handleDraw = () => {
    socket.emit('open draw', { room: conversation?.id })
    onOpenDraw();
  }

  const handleReportModal = (status) => {
    setShowReportModal(status)
  }

  const handleBlockModal = (status) => {
    setShowBlockModal(status)
  }

  const handleMuteModal = (status) => {
    setShowMuteModal(status)
  }

  const handleMuteUser = (user) => {
    if (isMuted) {
      const data = {
        unmute_user_id: user.id
      }
      dispatch(unMuteUser(data, user.username))
    }
    else {
      const data = {
        mute_user_id: user.id
      }
      dispatch(muteUser(data, user.username))
    }
    setShowMuteModal(false);
  }

  const handleBlockUser = (user) => {
    if (isBlocked) {
      const data = {
        unblock_user_id: user.id
      }
      dispatch(unBlockUser(data, user.username))
    }
    else {
      const data = {
        block_user_id: user.id
      }
      dispatch(blockUser(data, user.username))
    }
    setShowBlockModal(false);
  }

  const handleChangeNoAnswerModal = () => {
    setNoAnswerModal(false);
  }

  const handleJoinMeeting = () => {
    history.push(`/video-call/${conversation.id}`);
  }

  const handleLeaveMessage = message => {
    onLeaveMessage(message);
    setNoAnswerModal(false);
  }

  return (
    <div
      className='chat-header'
      style={{
        backgroundColor:
          conversation?.participants.length > 2
            ? 'red'
            : filtered?.feel.color_code
      }}
    >
      {filtered && width <= breakPoint &&
        <>
          <i
            className="fa fa-arrow-left clickable"
            onClick={onBackPress}
          />
        </>
      }
      {
        conversation?.participants.length > 2
          ? (
            <div onClick={onOpenParticipatsModel}>
              <MeuzmLogo />
            </div>
          ) : (
            <>
              <div className="add-strq">
                <OtherUserOptions
                  user={filtered}
                  onReportModal={handleReportModal}
                  onBlockModal={handleBlockModal}
                  onMuteModal={handleMuteModal}
                  isBlocked={isBlocked}
                  isMuted={isMuted}
                />
              </div>
              <Link to={`/studio/${filtered?.slug}`} >
                <Avatar
                  user={filtered}
                />
              </Link>
            </>
          )
      }
      <div className="user-Status">
        {conversation?.participants.length > 2
          ? (
            <>
              <p className="clickable" onClick={onOpenParticipatsModel}>
                {conversation.participants.length - 1} participants
              </p>
            </>
          ) : (
            <>
              <p>
                <Link to={`/studio/${filtered?.slug}`} >{filtered?.username}</Link>
              </p>
              {isViewAble &&
                <span>
                  {onlineUsers?.some(slug => slug === filtered?.slug)
                    ? <> Online </>
                    : <>{filtered?.last_login}</>
                  }
                </span>
              }
            </>
          )
        }
      </div>
      {isViewAble &&
        <div className="call-btn">
          <i
            className="fas fa-user-plus"
            aria-hidden="true"
            onClick={onOpenInvitationModel}
            data-tip="Invite Others"
            data-for="invite"
          />
          <ToolTip id="invite" />

          {hasMeeting === false &&
            <div onClick={handleCall}>
              <img
                href="#"
                src="/assets/images/icons/VidStrq.png"
                className="call-icon"
                alt="Video Call"
                data-for="call"
                data-tip="call"
              />
              <ToolTip id="call" />
            </div>
          }

          {hasMeeting === true &&
            <div>
              <button
                data-for="Join Call"
                data-tip="Join Call"
                onClick={handleJoinMeeting}
              >
                Join
              </button>
              <ToolTip id="Join Call" />
            </div>
          }
          <img
            src="/assets/images/icons/DrawStrq.png"
            alt="Draw" data-tip="Draw" data-for="draw"
            onClick={handleDraw}
          />
          <ToolTip id="draw" />
        </div>
      }
      {showCallingModal &&
        <CallingModal
          onDecline={handleDecline}
          feelColor={feelColor}
          participants={conversation?.participants}
          currentUser={currentUser}
        />
      }
      {showReportModal && filtered &&
        <ReportUserModal
          user={filtered}
          onClose={handleReportModal}
        />
      }
      {showBlockModal && filtered &&
        <ConfirmationModal
          message={isBlocked ?
            `Are you sure you want to unblock ${filtered.username}?`
            : `Are you sure you want to block ${filtered.username}?`}
          onCancel={handleBlockModal}
          onConfirm={() => handleBlockUser(filtered)}
        />
      }
      {showMuteModal && filtered &&
        <ConfirmationModal
          message={isMuted ?
            `Are you sure you want to unmute ${filtered.username}?` :
            `Are you sure you want to mute ${filtered.username}?`
          }
          onCancel={handleMuteModal}
          onConfirm={() => handleMuteUser(filtered)}
        />
      }

      {noAnswerModal &&
        <NoAnswerModal
          onClose={handleChangeNoAnswerModal}
          feelColor={feelColor}
          onLeaveMessage={handleLeaveMessage}
          onCallMade={handleCall}
        />
      }
    </div>
  );
};

export default ChatHeader;
