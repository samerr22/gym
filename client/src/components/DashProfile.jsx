import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateFailure,updateSart, updateSuccess, signoutSuccess } from "../redux/user/userSilce";
import { useDispatch } from 'react-redux';
// Update the path if necessary



import Cat from "../img/fff.jpg";

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);

  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  console.log(formData)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          'Could not upload image (File must be less than 2MB)'
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made');
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError('Please wait for image to upload');
      return;
    }
    try {
      dispatch(updateSart());
      const res = await fetch(`http://localhost:3000/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };
 

  const handleSignout = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
   

    <div>

<div className="h-[600px] relative"> {/* Added relative class */}
        <img src={Cat} alt="" className="w-full h-full object-cover" /> 
        <div className="absolute top-0 left-0">   {/* Positioned Dash component here */}
              
            </div> {/* Added object-cover class */}
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center gap-14 mt-5">
        <div className="w-[700px]  mt-[-50px]  h-[500px] bg-white rounded-3xl">
        <div className='max-w-lg mx-auto p-3 w-full'>





 



<form onSubmit={handleSubmit} className='flex flex-col mt-4 gap-4'>

 
  <input
    type='file'
    accept='image/*'
    onChange={handleImageChange}
    ref={filePickerRef}
    hidden
  />
  <div
    className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
    onClick={() => filePickerRef.current.click()}
  >
    {imageFileUploadProgress && (
      <CircularProgressbar
        value={imageFileUploadProgress || 0}
        text={`${imageFileUploadProgress}%`}
        strokeWidth={5}
        styles={{
          root: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          },
          path: {
            stroke: `rgba(62, 152, 199, ${
              imageFileUploadProgress / 100
            })`,
          },
        }}
      />
    )}
    <img
      src={imageFileUrl || currentUser.profilePicture}
      alt='user'
      className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
        imageFileUploadProgress &&
        imageFileUploadProgress < 100 &&
        'opacity-60'
      }`}
    />
  </div>
  {imageFileUploadError && (
    <p className="mt-5 text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center ">{imageFileUploadError}</p>
  )}

<div className='flex ml-[-70px] gap-6'>
    <div>
    <div className='flex gap-2'>
    
    <input
  className=" bg-slate-100 mt-2 p-3 rounded-lg w-[300px] h-11"
    type='text'
    id='username'
    placeholder='username'
    defaultValue={currentUser.username}
    onChange={handleChange}
  />

  </div>

  <div className='flex gap-2'>

  
    <input
  className=" bg-slate-100 p-3 mt-2 rounded-lg w-[300px] h-11"
    type='email'
    id='email'
    placeholder='email'
    defaultValue={currentUser.email}
    onChange={handleChange}
  />



  </div>
 
<div className='flex gap-2'>

  <input
  className=" bg-slate-100 p-3 mt-2 rounded-lg w-[300px] h-11"
    type='password'
    id='password'
    placeholder='password'
    onChange={handleChange}
  />

</div>

<div className='flex gap-2'>

  <input
  className=" bg-slate-100 p-3 mt-2 rounded-lg w-[300px] h-11"
    type='text'
    id='Name'
    placeholder='Name'
    defaultValue={currentUser.Name}
    onChange={handleChange}
  />
 </div>

    </div>

    <div>
    
  
  <div className='flex gap-2'>
   
    <input
  className=" bg-slate-100 p-3 mt-2 rounded-lg w-[300px] h-11"
    type='text'
    id='PhoneNumber'
    placeholder='PhoneNumber'
    defaultValue={currentUser.PhoneNumber}
    onChange={handleChange}
  />


  </div>

  <div className='flex gap-2'>
   
    <input
  className=" bg-slate-100 p-3 mt-2 rounded-lg w-[300px] h-11"
    type='text'
    id='Address'
    placeholder='Address'
    defaultValue={currentUser.Address}
    onChange={handleChange}
  />


  </div>
  
  
  <div className='flex gap-2'> 
    
    <input
  className=" bg-slate-100 p-3 mt-2 rounded-lg w-[300px] h-11"
    type='text'
    id='Height'
    placeholder='Height'
    defaultValue={currentUser.Height}
    onChange={handleChange}
  />


  </div>
  
  <div className='flex gap-2'>

   
    <input
  className=" bg-slate-100 p-3 mt-2 rounded-lg w-[300px] h-11"
    type='text'
    id='weight'
    placeholder='Weight'
    defaultValue={currentUser.weight}
    onChange={handleChange}
  />

  </div>

    </div>


  </div>
 
 
  
 
  <button
  className=" bg-yellow-300 shadow-md shadow-black  text-black p-3 rounded-lg w-[460px] h-11 hover:opacity-90"
    type='submit'
    gradientDuoTone='purpleToBlue'
    outline
    disabled={loading || imageFileUploading}
  >
    {loading ? 'Loading...' : 'Update'}
  </button>
  
</form>
<div className='text-red-500 flex justify-between mt-5'>
 
  <span onClick={handleSignout} className='cursor-pointer ml-96'>
    Sign Out
  </span>
</div>
{updateUserSuccess && (
  <p className="mt-5 text-green-600 bg-green-300 w-300 h-7 rounded-lg text-center " >
    {updateUserSuccess}
  </p>
)}
{updateUserError && (
  <p className="mt-5 text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center ">
    {updateUserError}
  </p>
)}
{error && (
  <p className="mt-5 text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center ">
    {error}
  </p>
)}

</div>
</div>
        </div>
      </div>







   
    </div>
  );
}