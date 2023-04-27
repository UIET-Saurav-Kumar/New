import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSpring, animated } from 'react-spring';
import { FiUpload } from 'react-icons/fi';
import Navbar from '@components/layout/navbar/navbar';
import Uploader from '@components/common/uploader';
import FileInput from '@components/ui/file-input-images';
import { useForm } from 'react-hook-form';
import { useUploadMutation } from '@data/upload/use-image-upload.mutation';
import  Button  from "@components/ui/button";
import { useImagesUploadMutation } from '@data/images-upload/use-image-upload.query';
import { useCustomerQuery } from '@data/customer/use-customer.query';
import { getImagesByUserId, useImagesByUserId } from '@data/images-upload/get-uploaded-images.query';
import { useDeleteImageMutation } from '@data/upload/use-image-delete.mutations';
 

const imagess = [
   { 
    id: 1,
    src: 'https://source.unsplash.com/featured/?female/2431'
   },
   { 
    id: 2,
    src: 'https://source.unsplash.com/featured/?female/1543'
   },
   { 
    id: 3,
    src: 'https://source.unsplash.com/featured/?female/145'
   },
   { 
    id: 4,
    src: 'https://source.unsplash.com/featured/?female/122'
   },
   { 
    id: 5,
    src: 'https://source.unsplash.com/featured/?female/112'
   },
   { 
    id: 6,
    src: 'https://source.unsplash.com/featured/?female/11'
   },
   { 
    id: 7,
    src: 'https://source.unsplash.com/featured/?female/53'
   },
   { 
    id: 8,
    src: 'https://source.unsplash.com/featured/?female/54'
   },
   { 
    id: 9,
    src: 'https://source.unsplash.com/featured/?female/5'
   }
]
      
type ImageUploadFormValues = {
    images: [];
}

function Images() {
  const [showUpload, setShowUpload] = useState(false);

  const { data: user } = useCustomerQuery();

  const { data: images, isLoading, isError, refetch } = getImagesByUserId(user?.me?.id);

  const uploadAnimation = useSpring({
    opacity: showUpload ? 1 : 0,
    transform: showUpload ? 'translateY(0px)' : 'translateY(-50px)',
  });

  console.log('images', images && images[0]?.image_data);

  const deleteImageMutation = useDeleteImageMutation();

  const handleUpload = () => {
    // Handle successful upload
    setShowUpload(false);
    refetch(); // Refetch images after successful upload
  };
  const { mutate: storeImages } = useImagesUploadMutation({
    onSuccess: handleUpload,
  });

  const handleDelete = async (imageId) => {
    try {
      await deleteImageMutation.mutateAsync(imageId);
      refetch();
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<ImageUploadFormValues>({
    defaultValues: {
      images: [],
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: { image_data: any }) => {
    try {
      storeImages({
        images: data.image_data,
        user_id: user?.me?.id,
      });
      setShowUpload(false);
    } catch (error) {
      // Handle any errors during the upload process
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between mb-4">
            <h1 className="text-2xl font-medium">My Images</h1>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setShowUpload(true)}
            >
              Upload
            </button>
          </div>
          {showUpload && (
            <animated.div style={uploadAnimation}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <FileInput name="image_data" multiple={true} control={control} />
                </div>
                <Button>Submit</Button>
              </form>
            </animated.div>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images &&
              images[0]?.image_data?.map((image) => (
                <div key={image.id} className="relative group">
                  <img src={image.thumbnail} className="w-full rounded-lg" />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity rounded-lg">
                    <div className="absolute inset-0 flex justify-center items-center">
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => handleDelete(image.id)}
                      >
                        Delete
                      </button>
                    </div>
                    </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}


  
  export default Images;
  
            
