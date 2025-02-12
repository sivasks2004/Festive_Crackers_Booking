import React, { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { db, storage } from '../../firebase';
import { ref as reference, uploadBytes, getDownloadURL } from 'firebase/storage';
import { push, ref } from 'firebase/database';

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

const AddProducts = ({ setaddproduct, getproducts }) => {
    const productname = useRef();
    const productprice = useRef();
    const productstock = useRef();
    const producttype = useRef();
    const productrank = useRef();
    const productinfo = useRef();
    const [file, setFiles] = useState([]);
    const [additem, setitem] = useState(false);

    const handleFileChange = (e) => {
        const selectedFiles = e.target.files[0];
        setFiles(selectedFiles);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        Swal.fire({
            html: `
                <div className="">
                    <div className="spinner-border text-dark" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            `,
            showConfirmButton: false,
            background: 'transparent',
        });

        try {
            if (!file) {
                throw new Error("Please select a product image.");
            }

            const filename = generateRandomString(15);
            const imageRef = reference(storage, 'productimages/' + filename);
            await uploadBytes(imageRef, file);
            const downloadURL = await getDownloadURL(imageRef);

            const productpath = ref(db, 'products');
            const product = {
                name: productname.current.value,
                price: productprice.current.value,
                rank: productrank.current.value,
                type: producttype.current.value,
                stock: parseInt(productstock.current.value), // Convert to integer
                info: productinfo.current.value,
                imageURL: downloadURL,
            };
            push(productpath, product);

            Swal.fire({
                icon: 'success',
                title: 'Product Upload Successful',
                showConfirmButton: true,
                confirmButtonColor: 'black',
            });

            // Reset form fields and hide loading spinner
            productname.current.value = "";
            productrank.current.value = "";
            producttype.current.value = "";
            productprice.current.value = "";
            productinfo.current.value = "";
            productstock.current.value = ""; // Reset stock input
            setFiles([]);
            setaddproduct();
            getproducts();
        } catch (error) {
            console.error("Error uploading file:", error);
            Swal.fire({
                icon: 'error',
                title: 'Product Upload Unsuccessful',
                text: error.message,
                showConfirmButton: true,
                confirmButtonColor: 'black',
            });
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className=''>
                <div className='row mt-4'>
                    <div className='col-md-6 mb-3'>
                        <label className='mb-2 fw-bold'>Product Image</label>
                        <input
                            accept="image/*"
                            type="file"
                            onChange={handleFileChange}
                            className="input-field"
                            style={{ paddingTop: "12px" }}
                            required
                            id="image"
                        />
                    </div>
                    <div className='col-md-6 mb-3'>
                        <label className='mb-2 fw-bold'>Product Name</label>
                        <input className='input-field' placeholder='Product Name' ref={productname} required />
                    </div>
                    <div className='col-md-6 mb-3'>
                        <label className='mb-2 fw-bold'>Product Stock</label>
                        <input className='input-field' placeholder='Product Stock' ref={productstock} type="number" min="0" required />
                    </div>
                    <div className='col-md-6 mb-3'>
                        <label className='mb-2 fw-bold'>Product Price</label>
                        <input className='input-field' placeholder='Product Price' ref={productprice} type="number" min="0" required />
                    </div>
                    <div className='col-md-6 mb-3'>
                        <label className='mb-2 fw-bold'>Product Type</label>
                        <input className='input-field' placeholder='Product Type' ref={producttype} required />
                    </div>
                    <div className='col-md-6 mb-4 fw-bold'>
                        <label className='mb-2'>Product Rank</label>
                        <input className='input-field' placeholder='Product Rank' ref={productrank} required />
                    </div>
                    <div className='col-md-6 mb-4 fw-bold'>
                        <label className='mb-2'>Product Description</label>
                        <textarea className='input-field pt-2' ref={productinfo} required rows={5}></textarea>
                    </div>

                </div>
                <div className='col-md-12 mb-4 px-5 text-center'>
                    <button className='submit' type='submit'>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddProducts;
