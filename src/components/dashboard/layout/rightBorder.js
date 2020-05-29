import React from 'react';
import { useHistory } from 'react-router-dom';

const RightBorder = () => {
  const history = useHistory();

  return (
    <div className="right">
      <img alt="" src="/assets/images/strqicon.png" onClick={() => history.push('/dashboard/conversations')} />
      <img alt="" src="/assets/images/mzflash.png" onClick={() => history.push('/dashboard/group-chat')} />
    </div>
  );
};

export default RightBorder;
