import { CircularProgress } from "@mui/material";

export default function ActivityIndicator() {
    return (
        <div className='h-screen w-full absolute top-0 left-0 flex justify-center items-center z-50 bg-violet-400/10'>
            <CircularProgress color='secondary'/>
        </div>
    )
}