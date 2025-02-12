import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { get, push, ref, set } from 'firebase/database';
import Swal from 'sweetalert2';
import { onAuthStateChanged } from 'firebase/auth';

const Wires = () => {
    const [tableData, setTableData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [stockAvailability, setStockAvailability] = useState({}); // New state variable
    const [loggedinuid, setLoggedinuid] = useState(null);

    useEffect(() => {
        // Fetching product data from Firebase and setting up stock availability
        const fetchData = async () => {
            try {
                const dataRef = ref(db, '/products');
                const snapshot = await get(dataRef);
                if (snapshot.exists()) {
                    const dataObject = snapshot.val();
                    const dataKeys = Object.keys(dataObject);
                    const dataEntries = dataKeys
                        .map((key) => ({
                            key,
                            ...dataObject[key],
                        }))
                        .filter((entry) => entry.type === "sound")
                        .sort((a, b) => a.rank - b.rank);

                    setTableData(dataEntries);
                    setFilteredData(dataEntries);
                    setTableData(dataEntries.slice(0, 4));
                    setFilteredData(dataEntries.slice(0, 4));

                    const stockData = {};
                    dataEntries.forEach((entry) => {
                        stockData[entry.key] = entry.stock;
                    });
                    setStockAvailability(stockData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Subscribing to authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setLoggedinuid(uid);

                const userRef = ref(db, 'users/' + uid);

                get(userRef)
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            setLoggedinuid(uid);
                            const userData = snapshot.val();
                        }
                    })
                    .catch((error) => {
                        console.error('Error fetching Realtime Database data:', error);
                    });
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const addtocart = (productID, quantity) => {
        if (loggedinuid) {
            const userCartRef = ref(db, 'users/' + loggedinuid + '/cart');
            get(userCartRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const cartItems = Object.values(snapshot.val());
                        const isProductInCart = cartItems.some(item => item.productID === productID);
                        if (isProductInCart) {
                            Swal.fire({
                                icon: 'warning',
                                title: 'Product already in cart',
                                showConfirmButton: true,
                                timer: 3000
                            });
                        } else if (stockAvailability[productID] >= quantity) {
                            push(ref(db, 'users/' + loggedinuid + '/cart'), {
                                productID,
                                quantity,
                            });
                            Swal.fire({
                                icon: 'success',
                                title: 'Successfully Added to the cart',
                                showConfirmButton: true,
                                timer: 3000
                            });
                        } else {
                            Swal.fire({
                                icon: 'warning',
                                title: 'Not enough stock',
                                showConfirmButton: true,
                                timer: 3000
                            });
                        }
                    } else {
                        if (stockAvailability[productID] >= quantity) {
                            push(ref(db, 'users/' + loggedinuid + '/cart'), {
                                productID,
                                quantity,
                            });
                            Swal.fire({
                                icon: 'success',
                                title: 'Successfully Added to the cart',
                                showConfirmButton: true,
                                timer: 3000
                            });
                        } else {
                            Swal.fire({
                                icon: 'warning',
                                title: 'Not enough stock',
                                showConfirmButton: true,
                                timer: 3000
                            });
                        }
                    }
                })
                .catch((error) => {
                    console.error('Error fetching user cart data:', error);
                });
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Log in to use cart',
                showConfirmButton: true,
                timer: 3000
            });
        }
    }

    const [bigmodal, setBigmodal] = useState(false);
    const [modalProduct, setModalProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const openBigmodal = (productID) => {
        const selectedProduct = tableData.find((product) => product.key === productID);
        setBigmodal(true);
        setModalProduct(selectedProduct);
        setQuantity(1); // Reset quantity to 1 when opening modal
    };

    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    return (
        <div>
            <section id="Featured" className="my-5 pb-5">
                <div className="row mx-auto container-fluid">
                {tableData.map((entry) => (
                        <div className="product text-center col-lg-3 col-md-6 col-12" key={entry.key} >
                            <img
                                className="mb-3"
                                src={entry.imageURL}
                                style={{ height: "200px", width: "auto" }}
                                alt={entry.name}
                                onClick={() => openBigmodal(entry.key)}
                            />
                            <h5 className="p-name">{entry.name}</h5>
                            <h4 className="p-price">{`₹${entry.price} `} {entry.type === "Pipes" ? "/Meter" : ""}</h4>
                            {entry.stock == 0 ? (
                                <p style={{ color: 'red' }}>Out of Stock</p>
                            ) : entry.stock <= 10 ? (
                                <p style={{ color: 'green' }}>Hurry Only {entry.stock} Stock Remaining</p>
                            ) : null}
                            <br />
                            <button className="buy-btn my-2 me-2" onClick={() => addtocart(entry.key, quantity)} >Add to Cart</button>
                            <button className="buy-btn my-2">Buy Now</button>
                        </div>
                    ))}
                </div>
            </section>
            {bigmodal && modalProduct && (
                <div>
                    <div className="modal d-block border-0" role="dialog" style={{ display: 'block', background: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(3px)' }}>
                        <div className="modal-dialog modal-fullscreen border-0 modal-dialog-centered ">
                            <div className="modal-content text-bg-green border-0 rounded-4">
                                <div className="modal-body" >
                                    <div className='d-flex flex-row justify-content-between pb-3'>
                                        <h5 className='animate__animated animate__fadeInDown text-center fw-bold display-6'>Product Info</h5>
                                        <h5 className='animate__animated animate__fadeInUp' onClick={() => setBigmodal(false)}>
                                            <i className="bi bi-x-circle-fill"></i>
                                        </h5>
                                    </div>
                                    <div>
                                        <div>
                                            <section className="sproduct container mb-3 ">
                                                <div className="row mt-5">
                                                    <div className="col-lg-5 col-md-12 col-12">
                                                        <img className="img-fluid w-50" src={modalProduct.imageURL} id="MainImg" alt="" />
                                                    </div>

                                                    <div className="col-lg-6 col-md-12 col-12">

                                                        <div className='d-flex flex-row justify-content-between mt-3'>
                                                            <h3> {modalProduct.name}</h3>
                                                        </div>

                                                        <div className='row my-2 pt-5'>
                                                            <div className='col'>
                                                                <h2>₹{modalProduct.price}</h2>
                                                            </div>
                                                            <div className='col d-flex flex-column justify-content-end align-items-end'>
                                                                <div className="quantity-selector">
                                                                    <button className="quantity-btn" onClick={decrementQuantity}>-</button>
                                                                    <input className="quantity-input" type="number" value={quantity} readOnly />
                                                                    <button className="quantity-btn" onClick={incrementQuantity}>+</button>
                                                                </div>
                                                                <div>
                                                                    <button className="buy-btn btn-lg m-3" onClick={() => addtocart(modalProduct.key, quantity)}>Add to cart</button>
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <h4 className="mt-5">Product Description</h4>
                                                        <span>{modalProduct.info}</span>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Wires;
