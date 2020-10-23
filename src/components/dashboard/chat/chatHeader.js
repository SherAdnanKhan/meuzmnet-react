import React, { useEffect, useRef, useState } from 'react';
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
import BlockUserModal from "./blockUserModal";

const ChatHeader = ({
  conversation, onlineUsers, onOpenInvitationModel,
  onOpenParticipatsModel, currentUser, onBackPress, onOpenDraw, user

}) => {
  const filtered = conversation?.participants.filter(p => p.id !== currentUser.id)[0];
  const history = useHistory();
  const rejectedUsers = useRef([]);
  const timeout = useRef();
  const [hasRendered, setHasRendered] = useState(false);
  const [showCallingModal, setShowCallingModal] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const allParticipants = useRef([]);
  const audioRef = useRef();
  const { width } = useViewport();
  const breakPoint = 768;
  const { feelColor } = useSelector(state => state.feelColor)

  useWindowUnloadEffect(() => {
    socket.off('call-accepted');
    clearTimeout(timeout);
  }, true);


  useEffect(() => {
    if (conversation?.participants) {
      allParticipants.current = conversation?.participants;;
    }
  }, [conversation]);

  useEffect(() => {
    if (!hasRendered) {
      socket.on('call-accepted', data => {
        clearTimeout(timeout.current);

        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        history.push(`/dashboard/video-call/${data.room}`)
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
          clearTimeout(timeout.current);
        }
      });
      setHasRendered(true);
    }
  }, [history, hasRendered, conversation]);

  const handleCall = async () => {
    rejectedUsers.current = [];
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

    timeout.current = setTimeout(() => {
      if (!showCallingModal) {
        handleDecline();
      }
    }, 30000);
  };

  const handleDecline = () => {
    clearTimeout(timeout.current);
    setShowCallingModal(false);

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
  }

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

  const handleShowActions = e => {
    setShowActions(!showActions);
  };

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
      {filtered && width <= breakPoint ?  //Mobile View
        <>
          <i
            className="fa fa-arrow-left clickable"
            onClick={onBackPress}
          />
          <div className="add-strq" >
            <div className={showActions ? "main show-actions" : "main"} onClick={handleShowActions} >
              <OtherUserOptions user={filtered} onReportModal={handleReportModal} />
            </div>
          </div>
        </>
        //Desktop  View
        :
        <div className="add-strq">
          <OtherUserOptions user={filtered} onReportModal={handleReportModal} onBlockModal={handleBlockModal} />
        </div>
      }
      {
        conversation?.participants.length > 2
          ? (
            <div onClick={onOpenParticipatsModel}>
              <MeuzmLogo />
            </div>
          ) : (
            <Link to={`/dashboard/studio/${filtered?.slug}`} >
              <Avatar
                user={filtered}
              />
            </Link>
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
                <Link to={`/dashboard/studio/${filtered?.slug}`} >{filtered?.username}</Link>
              </p>
              <span>
                {onlineUsers?.some(slug => slug === filtered?.slug)
                  ? <> Online </>
                  : <>{filtered?.last_login}</>
                }
              </span>
            </>
          )
        }
      </div>

      <div className="call-btn">
        <i
          className="fas fa-user-plus"
          aria-hidden="true"
          onClick={onOpenInvitationModel}
          data-tip="Invite Others"
          data-for="invite"
        />
        <ToolTip id="invite" />

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
        <img
          src="/assets/images/icons/DrawStrq.png"
          alt="Draw" data-tip="Draw" data-for="draw"
          onClick={handleDraw}
        />
        <ToolTip id="draw" />

      </div>
      {
        showCallingModal &&
        <CallingModal
          onDecline={handleDecline}
          feelColor={feelColor}
        />
      }
      {
        showReportModal && filtered &&
        <ReportUserModal user={filtered} onClose={handleReportModal} />
      }
      {
        showBlockModal && filtered &&
        <BlockUserModal user={filtered} onClose={handleBlockModal} />
      }
    </div >
  );
};

export default ChatHeader;
