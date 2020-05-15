import React, {useEffect} from "react";
import {getOtherFavouriteUsers,getOtherFavouriteByUsers} from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Avatar from '../common/avatar';
import Spinner from '../common/spinner';

const Favas = (props) =>{
  const dispatch = useDispatch();
  const favas = useSelector(({ user }) => user?.otherFavouriteUsers)
  const { loading } = useSelector(state => state.loading);



  let url = window.location.href;
  

  useEffect(() => {
    if(url.split('/')[5] && url.split('/')[5] === 'by'){
      dispatch(getOtherFavouriteByUsers())
    }else{
      dispatch(getOtherFavouriteUsers()) 
    }   
  }, [dispatch,url]);

  return (
    <div className="favas">
      { 
        !loading && (
          favas?.length > 0 ? (
          <div className="favas-row">
          { favas?.map(( val,index ) => (
            <div className="favas-box">
               <div className="favas-avatar">
                 <Avatar avatars={val?.avatars} />
               </div>
             <div>
               <p>{val?.first_name}</p>
               <p>{val?.art?.name}</p>
               <p>Faving Gallery</p>
               <p>2</p>
             </div>
           </div>
          ))}
        </div>
          ) :  (
            <div style={{textAlign:"center"}}>
              <h1>No Favorites Available</h1>
            </div>
            
          )
        ) 
      }
       {loading &&
        <>
          <Spinner />
          <small style={{ textAlign: 'center', display: 'block' }}> Please wait...</small>
        </>
      }
     
    </div>
  )
}
export default Favas;