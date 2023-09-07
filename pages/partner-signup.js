import { useState } from 'react';
import Head from 'next/head';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField } from '@mui/material';
import { db,storage } from '@/settings/firebase.setting';
import { collection,addDoc,updateDoc,doc } from 'firebase/firestore';
import { ref,uploadString,getDownloadURL } from 'firebase/storage';
import ActivityIndicator from '@/utils/activity-indicator';
import CustomDialog from '@/components/CustomDialog';

const validationRules = yup.object().shape({
    compName:yup.string().required(),
    compDesc:yup.string().required(),
    email:yup.string().required(),
    address:yup.string(),
    phone:yup.string(),
});

export default function PartnerSignup() {
    const [selectedFile,setSelectedFile] = useState(null);
    const [showActivityIndicator,setShowActivityIndicator] = useState(false);

    //CONFIRMATION DIALOG >>>> START
    const [openDialog, setOpenDialog] = useState(false);
    const handleClickOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);
    //CONFIRMATION DIALOG >>>> END

    //get image file and convert to base64 string
    const imageToPost = (e) => {
        const reader = new FileReader();

        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = (readEvent) => {
            setSelectedFile(readEvent.target.result);
        }
    }

    // create post to firestore
    const handleCreatePartner = async () => {
        setShowActivityIndicator(true);

        //use company name to form a slug
        const strToArray = values.compName.split(' ');
        let slug = strToArray.join('-').toLowerCase();

        const docRes = await addDoc(collection(db,'partners'),{
            companyName:values.compName,
            compDec:values.compDesc,
            email:values.email,
            phone:values.phone,
            address:values.address,
            pagePath:slug,
            createdAt:new Date().getTime(),
            imageUrl:null,
        });

        const imageRef = ref(storage,`partners/${docRes.id}/image`);

        await uploadString(imageRef,selectedFile,'data_url')
        .then(async () => {
            const imgUrl = await getDownloadURL(imageRef);
            updateDoc(doc(db,'partners',docRes.id),{
                imageUrl:imgUrl,
            });

            setShowActivityIndicator(false);
            setOpenDialog(true);
        })
        .catch((e) => console.error(e))
    }

    const {handleBlur,handleSubmit,handleChange,errors,touched,values} = useFormik({
        initialValues:{compName:'',compDesc:'',email:'',address:'',phone:''},
        onSubmit: values => {
            handleCreatePartner();
        },
        validationSchema:validationRules
    });

    return (
        showActivityIndicator
        ?
        <ActivityIndicator/>
        :
        <>
        <Head>
            <link rel="icon" href="/facepal_icon_logo.png" />
            <meta name="description" content="The Coolest way to connect with friends and hold money" />
            <meta name="keywords" content="facepal" />
            <title>facepal | Become a Partner</title>
        </Head>
        <div className="min-h-screen w-full flex justify-center mobile-bg sm:tablet-bg lg:desktop-bg">
            <div className="w-full sm:w-[520px] flex flex-col justify-center items-center gap-4 px-4 sm:px-0 py-6">

                <h1 className='text-white text-3xl text-center'>Partner Account Application Form</h1>

                <form className="w-full flex flex-col gap-3" onSubmit={handleSubmit}>
                    <TextField 
                    variant='outlined'
                    id="compName"
                    value={values.compName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="company name"
                    className='bg-white/60 rounded-md'
                    />
                    {errors.compName && touched.compName 
                    ? <span className="text-red-500">{errors.compName}</span> 
                    : null}

                    <TextField 
                    variant='outlined'
                    multiline={true}
                    id="compDesc"
                    value={values.compDesc}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="company description"
                    className='bg-white/60 rounded-md'
                    />
                    {errors.compDesc && touched.compDesc 
                    ? <span className="text-red-500">{errors.compDesc}</span> 
                    : null}

                    <TextField 
                    variant='outlined'
                    type='email'
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="eg. admin@companyname.com"
                    className='bg-white/60 rounded-md'
                    />
                    {errors.email && touched.email 
                    ? <span className="text-red-500">{errors.email}</span> 
                    : null}

                    <TextField 
                    variant='outlined'
                    type='tel'
                    id="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="eg. 07031234567"
                    className='bg-white/60 rounded-md'
                    />
                    {errors.phone && touched.phone 
                    ? <span className="text-red-500">{errors.phone}</span> 
                    : null}

                    <TextField 
                    variant='outlined'
                    multiline={true}
                    id="address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="company address"
                    className='bg-white/60 rounded-md'
                    />
                    {errors.address && touched.address 
                    ? <span className="text-red-500">{errors.address}</span> 
                    : null}

                    <input 
                    type="file" 
                    accept='image/*'
                    onChange={imageToPost}/>

                    <button type="submit" className="max-w-[160px] h-12 bg-white rounded-lg text-black"
                    >Submit Application</button>
                </form>
            </div>
        </div>

        <CustomDialog 
        openProp={openDialog} 
        handleCloseProp={handleCloseDialog} 
        title='Confirmation'>
            <p>You have successfully created a facepal partner account</p>
        </CustomDialog>
        </>
    )
}