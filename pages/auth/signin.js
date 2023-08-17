import Link from "next/link";
import { useFormik } from "formik";
import * as yup from 'yup';

//validation rules
const validationRules = yup.object().shape({
    email:yup.string().required('this field is compulsory'),
    password:yup.string().required()
})

export default function Signin() {
    const {handleBlur,handleSubmit,handleChange,errors,touched,values} = useFormik({
        initialValues:{email:'',password:''},
        onSubmit: values => {
            //get data from
            console.log(values)
        },
        validationSchema:validationRules //here too
    });

    return (
        <>
        <main className="h-screen flex justify-center items-center">
            <div className="w-[480px] sm:min-h-[480px] flex flex-col gap-5">
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <input 
                    id="email"
                    type="email" 
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Email address"
                    className="py-3 sm:py-5 px-2 border border-indigo-400 rounded-lg bg-white/60"
                    />
                    {errors.email && touched.email 
                    ? <span className="text-red-500">{errors.email}</span> 
                    : null}

                    <input 
                    id="password"
                    type="password" 
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Password"
                    className="py-3 sm:py-5 px-2 border border-indigo-400 rounded-lg bg-white/60"
                    />
                    {errors.password && touched.password 
                    ? <span className="text-red-500">{errors.password}</span> 
                    : null}

                    <button type="submit" className="max-w-[160px] h-12 bg-indigo-800 rounded-lg text-white font-bold"
                    >Log in to facepal</button>
                </form>
        
                <div className="w-full grid grid-cols-2 gap-3">
                    <button className="w-full h-12 bg-green-600 rounded-lg text-white font-bold">Google</button>
                    <button className="w-full h-12 bg-sky-600 rounded-lg text-white font-bold">Twitter</button>
                </div>
        
                <p className="text-2xl text-gray-800">New to facepal? <Link href="#" className="underline">create account</Link></p>
            </div>
        </main>
        </>
    )
}