import React, { useState, useEffect, useRef } from 'react';
import Conversation from '../conversation';
import ChatBox from './chatBox';
import { isChrome } from '../../../utils/helperFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { clearConversation, getAllConversations, getConversation, deleteConversation } from '../../../actions/conversationActions';
import Spinner from '../../common/spinner';
import useViewport from '../../common/useViewport';
import { useRouteMatch } from 'react-router-dom';
import Loader from "../../common/loader";
import ConfirmationModal from "./confirmationModal";
import ChatShortCut from "../chat/chatShortcut";
import LeftBorder from '../layout/leftBorder';
import RightBorder from '../layout/rightBorder';
import { changeFeelColor } from '../../../actions/colorActions';
import ChangeColor from '../layout/changeColor';


const Chat = () => {
  const dispatch = useDispatch();
  const { params } = useRouteMatch();
  const { width } = useViewport();
  const breakPoint = 768;
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedConversationId, setSelectedConversationId] = useState("")
  const {
    conversation: { conversations, conversation, conversationLoader },
    loading: { loading },
    feelColor: { feelColor }
  } = useSelector(state => state);

  const [activeConversation, setActiveConversation] = useState("");
  const [hasConversation, setHasConversation] = useState(false);

  const conversationRef = useRef();

  useEffect(() => {
    dispatch(getAllConversations());
  }, [dispatch]);

  useEffect(() => {
    if (params.slug) {
      if (conversation) {
        if (!hasConversation) {
          setActiveConversation(conversation);
          dispatch(clearConversation());
          setHasConversation(hasConversation => hasConversation = true)
        }
      }
    }
  }, [conversation, dispatch, hasConversation, params]);

  const handleBackPress = () => {
    setActiveConversation('');
  }

  useEffect(() => {
    if (params.slug) {
      dispatch(getConversation(params.slug));
    }
  }, [params, dispatch])


  const handleActiveConversation = conversation => {
    setActiveConversation(conversation)
  }

  const handleCallNextPage = () => {
    dispatch(getAllConversations(currentPage + 1));
    setCurrentPage(currentPage => currentPage + 1);
  };

  const handleDeleteModal = (status, id) => {
    setSelectedConversationId(id)
    setShowDeleteModal(status)
  }

  const handleDeleteConversation = () => {
    dispatch(deleteConversation(selectedConversationId));
    setShowDeleteModal(false)
    if (selectedConversationId) {
      setActiveConversation('')
    }
  }

  const handleUserSelect = slug => {
    dispatch(getConversation(slug, 1, async con => {
      await dispatch(clearConversation());
      setActiveConversation(con);
    }));
  }

  const handleColorChange = colorId => {
    dispatch(changeFeelColor(colorId));
  };

  return (
    <div className={`frameReady ${feelColor}`}>
      <div className={!isChrome() ? "chat-Row safari" : "chat-Row"}>
        <LeftBorder />
        <RightBorder />
        <ChangeColor onColorChange={handleColorChange} />
        {loading && currentPage === 1 && <Spinner />}
        {showDeleteModal &&
          <ConfirmationModal
            message="Are you sure you want to delete conversation?"
            onCancel={handleDeleteModal}
            onConfirm={() => handleDeleteConversation()}
          />
        }
        {width <= breakPoint
          ? (
            <>
              {!activeConversation &&
                <div
                  className="conversation"
                  ref={conversationRef}>
                  <Conversation
                    conversations={conversations?.data}
                    onActiveConversation={handleActiveConversation}
                    activeConversation={activeConversation}
                    onCallNextPage={handleCallNextPage}
                    currentPage={currentPage}
                    conversationLoader={conversationLoader}
                    nextPageUrl={conversations?.next_page_url}
                    onDeleteConversation={handleDeleteConversation}
                    feelColor={feelColor}
                    toggleDeleteModal={handleDeleteModal}
                    onUserSelect={handleUserSelect}
                  />
                  {conversationLoader && <Loader />}
                </div>
              }
            </>
          ) : (
            <div className="conversation" ref={conversationRef}>
              <Conversation
                conversations={conversations?.data}
                onActiveConversation={handleActiveConversation}
                activeConversation={activeConversation}
                onCallNextPage={handleCallNextPage}
                currentPage={currentPage}
                conversationLoader={conversationLoader}
                nextPageUrl={conversations?.next_page_url}
                onDeleteConversation={handleDeleteConversation}
                feelColor={feelColor}
                toggleDeleteModal={handleDeleteModal}
                onUserSelect={handleUserSelect}
              />
              {conversationLoader && <Loader />}
            </div>
          )
        }
        {/* Mobile View */}
        {width <= breakPoint
          ? (
            <>
              {activeConversation &&
                <div className="chat-Block">
                  <ChatShortCut onActiveConversation={handleActiveConversation} />
                  <ChatBox
                    activeConversation={activeConversation}
                    onBackPress={handleBackPress}
                  />
                </div>
              }
            </>
          ) : (
            // Desktop View
            <div className="chat-Block">
              {activeConversation &&
                <ChatBox
                  activeConversation={activeConversation}
                // onBackPress={handleBackPress}
                />
              }
            </div>
          )
        }
      </div>
    </div>

  );
};

export default Chat;