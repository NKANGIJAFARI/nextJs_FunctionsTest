import { PageTitle } from 'components/shared';
import { useState } from 'react';
import axios from 'axios';
import { useMutate } from 'restful-react';

const Upload = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [images, setImages] = useState([]);
  const {
    mutate: uploadImage,
    loading,
    error,
  } = useMutate({
    verb: 'POST',
    path: 'image-upload',
  });

  const handleChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      return;
    }

    let formData = new FormData();
    formData.append('image', selectedImage);

    // const formData = { image: selectedImage };

    // console.log('Form data', formData);

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };

    uploadImage(formData)
      .then((uploadedImage) => {
        console.log('Passed the upload');
        setImages([...images, uploadedImage]);
        console.log(uploadedImage);
      })
      .catch(() => {
        console.log('Error in uploading');
      });
  };

  return (
    <>
      <PageTitle text='Image Upload' />
      <input
        onChange={handleChange}
        accept='.jpg, .png, .jpeg'
        className='fileInput mb-2'
        type='file'
      />
      <div>
        <button
          onClick={handleImageUpload}
          disabled={!selectedImage}
          className='btn btn-primary mb-2'>
          Upload
        </button>
      </div>
      <div className='row text-center text-lg-left'>
        {images.map((image) => (
          <div className='col-lg-3 col-md-4 col-6' key={image.cloudinaryId}>
            <a href={image.url} target='_blank' className='d-block mb-4 h-100'>
              <img className='img-fluid img-thumbnail' src={image.url} alt='' />
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default Upload;
