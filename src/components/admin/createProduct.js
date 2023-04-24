import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import productReducer, { addProducts } from '../../actions/product.actions'

import React from 'react'

const createProduct = () => {
    const onChange = (e) => {
        const files = Array.from(e.target.files);
    
        setImages([]);
    
        files.forEach((file) => {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setImages((oldArray) => [...oldArray, reader.result]);
            }
          };
    
          reader.readAsDataURL(file);
        });
      };
    
      const submitHandler = (e) => {
        e.preventDefault();
    
        const userData = {
          name,
          images,
        };
    
        dispatch(addProducts(userData));
      };
    return (
        <div>
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <input
                type="file"
                name="avatar"
                className="custom-file-input"
                id="customFile"
                accept="images/*"
                onChange={onChange}
                multiple
            />
            <button onClick={submitHandler}>bjkbjk</button>
        </div>

    )
}

export default createProduct