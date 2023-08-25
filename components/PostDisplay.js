import * as React from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import PublicIcon from '@mui/icons-material/Public';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { hoursAgo } from '@/assets/hours-ago';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import CustomDialog from './CustomDialog';
import { db } from '@/settings/firebase.setting';
import { doc,deleteDoc } from 'firebase/firestore';

export default function PostDisplay({postID,timePosted,body,postImage}) {
    const {data:session} = useSession();
    //MENU CONTROL >>>> START
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    //MENU CONTROL >>>> END

    //DIALOG CONTROL >>>> START
    const [openDialog, setOpenDialog] = React.useState(false);
    const handleClickOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);
    //DIALOG CONTROL >>>> END

    //FUNCTION FOR DELETE POST
    const handleDeletePost = async () => {
        await deleteDoc(doc(db,'posts',postID))
        .then(() => alert('post deleted'))
        .catch(e => console.error(e))
    }

    return (
        <>
        <div className="border border-gray-100 bg-white rounded-md shadow-md py-4 mb-4">
            <ul className="flex justify-between px-4">
                <li className="flex flex-row gap-1 items-center">
                    <Image 
                    className="rounded-full" 
                    src={session?.user.image} 
                    width={40} height={40} 
                    alt="profile photo"/>                                
                    <div className='flex flex-col'>
                        <small className="text-gray-800">{session?.user.name}</small>
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
            <MenuItem>Update</MenuItem>
            <MenuItem onClick={handleClickOpenDialog}>Delete</MenuItem>
        </Menu>

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
        </>
    )
}