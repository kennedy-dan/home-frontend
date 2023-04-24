import React, {useState} from 'react'
import axios from 'axios'
const Try = () => {
  const [images, setImages] = useState([]);

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    // setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((oldArray) => [...oldArray, reader.result]);
        //   setImagesPreview((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };


  const name ='lola'
  const description = 'ubbbkj nkghg'
  const price = '2000'
  const onSaveHandler = async () => {

    const product = {
      images, name, description, price
    }
    console.log(product)
    axios.post('http://localhost:2000/api/product/create', product)
    
  };
  return (
    <div>
        <input type='file' onChange={onChange}  />
        <button size="small" onClick={() => onSaveHandler()} color='secondary' variant='contained'>
            Create Course
          </button>
    </div>
  )
}

export default Try