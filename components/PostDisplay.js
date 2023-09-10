import * as React from 'react';
import { AppContext } from '@/settings/globals';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import PublicIcon from '@mui/icons-material/Public';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { hoursAgo } from '@/assets/hours-ago';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button,TextField } from '@mui/material';
import CustomDialog from './CustomDialog';
import { db } from '@/settings/firebase.setting';
import { doc,deleteDoc,updateDoc } from 'firebase/firestore';
import ActivityIndicator from '@/utils/activity-indicator';

export default function PostDisplay({postID,timePosted,body,postImage,authorUid}) {
    const {data:session} = useSession();
    const [formInput,setFormInput] = React.useState(body);//for update post form
    const [showActivityIndicator,setShowActivityIndicator] = React.useState(false);
    const {users} = React.useContext(AppContext);

    const getPostByAuthorInfo = (authorUID) => {
        const filteredUser = users.filter(item => item.id == authorUID);

        return {
            a_name:filteredUser[0]?.data.name,
            a_photo:filteredUser[0]?.data.image
        }
    }

    //MENU CONTROL >>>> START
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    //MENU CONTROL >>>> END

    //DELETE DIALOG CONTROL >>>> START
    const [openDialog, setOpenDialog] = React.useState(false);
    const handleClickOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);
    //DELETE DIALOG CONTROL >>>> END

    //UPDATE DIALOG CONTROL >>>> START
    const [openDailogUpdate, setOpenDailogUpdate] = React.useState(false);
    const handleClickOpenDailogUpdate = () => setOpenDailogUpdate(true);
    const handleCloseDailogUpdate = () => setOpenDailogUpdate(false);
    //UPDATE DIALOG CONTROL >>>> END

    //FUNCTION FOR DELETE POST
    const handleDeletePost = async () => {
        await deleteDoc(doc(db,'posts',postID))
        .then(() => alert('post deleted'))
        .catch(e => console.error(e))
    }

    //DELETE A POST HANDLER
    const handleUpdatePost = async () => {
        handleCloseDailogUpdate();//close dialog
        setShowActivityIndicator(true);//start ActivityIndicator

        await updateDoc(doc(db,'posts',postID),{
            body:formInput,
            updatedAt:new Date().getTime(),
        },{
            merge:true,
        })
        .then(() => {
            setShowActivityIndicator(false);//stop ActivityIndicator
            alert('Post updated successfuly');
        })
        .catch(error =>{ 
            setShowActivityIndicator(false);//stop ActivityIndicator
            console.error(error);
        })
    }

    return (
        <>
        { showActivityIndicator ? <ActivityIndicator/> : null}

        <div className="border border-gray-100 bg-white rounded-md shadow-md py-4 mb-4">
            <ul className="flex justify-between px-4">
                <li className="flex flex-row gap-1 items-center">
                    <Image 
                    className="rounded-full" 
                    src={getPostByAuthorInfo(authorUid).a_photo} 
                    width={40} height={40} 
                    alt="profile photo"/>                                
                    <div className='flex flex-col'>
                        <small className="text-gray-800">{getPostByAuthorInfo(authorUid).a_name}</small>
                        <small className='text-gray-500'>
                            <span>{hoursAgo(timePosted)} hours ago</span>
                            <PublicIcon sx={{fontSize:15}} />
                        </small>
                    </div>
                </li>
                <li>
                    <div className="text-gray-700">
                        <button className='p-2 hover:bg-gray-200 rounded-full'>
                            <MoreHorizIcon
                            onClick={handleClick} />
                        </button>
                    </div>
                </li>
            </ul>
            
            <p className='px-4'>{body}</p>
            <Image  
            src={postImage}
            width={560}
            height={560}
            alt='post image'
            className='w-full h-auto py-4'/>
            <div className='flex flex-row justify-between px-4'>
                <div className='flex items-center justify-center w-[20px] h-[20px] rounded-full bg-sky-800'>
                    <ThumbUpIcon 
                    sx={{ color:'white',fontSize:15 }}
                    />
                </div>
                <span className='text-gray-500'>
                    2 comments
                </span>
            </div>
            <hr style={{color:'black'}}/>

            <div className='flex flex-row justify-around  gap-4 pt-2'>
                <button className='w-full p-2 hover:bg-gray-200 text-gray-500 rounded'>
                    <ThumbUpIcon />
                    Like
                </button>
                <button className='w-full p-2 hover:bg-gray-200 text-gray-500 rounded'>
                    <ChatBubbleOutlineRoundedIcon />
                    Comment
                </button>
            </div>
        </div>  

        <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        >
            <MenuItem onClick={handleClickOpenDailogUpdate}>Update</MenuItem>
            <MenuItem onClick={handleClickOpenDialog}>Delete</MenuItem>
        </Menu>

        {/* DELETE DIALOG */}
        <CustomDialog 
        openProp={openDialog} 
        handleCloseProp={handleCloseDialog} 
        title='Delete post?'>
            <p>Confirm post deletion</p>
            <Button 
            variant='outlined' 
            color='error' 
            onClick={handleDeletePost}>
                Yes, delete
            </Button>
        </CustomDialog>

        {/* UPDATE DIALOG */}
        <CustomDialog 
        openProp={openDailogUpdate} 
        handleCloseProp={handleCloseDailogUpdate} 
        title='Update post'>
            <TextField
            multiline={true}
            className='w-full'
            value={formInput}
            onChange={(text) => setFormInput(text.target.value)}/>

            <Button 
            variant='outlined' 
            color='primary' 
            style={{marginTop:8}}
            onClick={handleUpdatePost}
            >
                Update
            </Button>
        </CustomDialog>
        </>
    )
}