import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { ref, get, remove, set, push, runTransaction, onValue } from 'firebase/database';
import Swal from 'sweetalert2';
import { onAuthStateChanged } from 'firebase/auth';


const Cart = ({ componentrender }) => {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [data, setdata] = useState();
  const [loggedinuid, setloggedinuid] = useState(null);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setloggedinuid(uid);

        const userRef = ref(db, 'users/' + uid + '/profile');
        get(userRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              setloggedinuid(uid);
              const userData = snapshot.val();
              setdata(userData);
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

  useEffect(() => {
    const dataRef = ref(db, 'users/' + loggedinuid + '/cart');
    get(dataRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const dataObject = snapshot.val();
          const dataKeys = Object.keys(dataObject);
          const dataEntries = dataKeys.map((key) => ({
            key,
            ...dataObject[key],
          }));
          setTableData(dataEntries);
        }
      })
      .catch((error) => {
        console.error('Error fetching cart data:', error);
      });
  }, [loggedinuid]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const productDetails = [];

      for (const entry of tableData) {
        const productRef = ref(db, 'products/' + entry.productID);

        try {
          const productSnapshot = await get(productRef);

          if (productSnapshot.exists()) {
            const productData = productSnapshot.val();

            productDetails.push({
              key: entry.key,
              productID: entry.productID,
              productImage: productData.imageURL,
              productName: productData.name,
              productPrice: productData.price,
              quantity: entry.quantity,
            });
          }
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      }

      setFilteredData(productDetails);
    };

    fetchProductDetails();
  }, [tableData]);

  const fetchfromcart = () => {
    const dataRef = ref(db, 'users/' + loggedinuid + '/cart');
    get(dataRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const dataObject = snapshot.val();
          const dataKeys = Object.keys(dataObject);
          const dataEntries = dataKeys.map((key) => ({
            key,
            ...dataObject[key],
          }));
          setTableData(dataEntries);
        }
      })
      .catch((error) => {
        console.error('Error fetching cart data:', error);
      });
  };

  const handleQuantityChange = (key, newQuantity) => {
    // Update the quantity in the Realtime Database
    const cartItemRef = ref(db, `users/${loggedinuid}/cart/${key}`);

    // Use transaction to update the quantity without removing other properties
    runTransaction(cartItemRef, (currentData) => {
      return { ...currentData, quantity: parseInt(newQuantity, 10) || 1 };
    })
      .then(() => {
        console.log(`Quantity updated for key ${key}. New quantity: ${newQuantity}`);
      })
      .catch((error) => {
        console.error('Error updating quantity:', error);
      });
  };

  const decrease = (key) => {
    // Decrease the quantity in the Realtime Database
    const cartItemRef = ref(db, `users/${loggedinuid}/cart/${key}`);

    // Use transaction to update the quantity without removing other properties
    runTransaction(cartItemRef, (currentData) => {
      if (!currentData || currentData.quantity === null) {
        // If currentData is null or quantity is null, return currentData
        return currentData;
      }

      const currentQuantity = currentData.quantity;

      // Ensure quantity does not go below 1
      const newQuantity = Math.max(1, currentQuantity - 1);

      return { ...currentData, quantity: newQuantity };
    })
      .then(() => {
        console.log(`Quantity decreased for key ${key}.`);
        fetchfromcart(); // Fetch updated cart data after quantity update
        Swal.close();
      })
      .catch((error) => {
        console.error('Error updating quantity:', error);
      });
  };


  const increase = (key) => {
    // Increase the quantity in the Realtime Database
    const cartItemRef = ref(db, `users/${loggedinuid}/cart/${key}`);

    // Use transaction to update the quantity without removing other properties
    runTransaction(cartItemRef, (currentData) => {
      if (currentData) {
        const currentQuantity = currentData.quantity || 0;
        const newQuantity = currentQuantity + 1;
        return { ...currentData, quantity: newQuantity };
      } else {
        console.error('Error: currentData is null.');
        return null;
      }
    })
      .then(() => {
        fetchfromcart(); // Fetch updated cart data after quantity update
        Swal.close();
        console.log(`Quantity increased for key ${key}.`);
      })
      .catch((error) => {
        console.error('Error updating quantity:', error);
      });
  };

  useEffect(() => {
    calculateTotalCartPrice();
  }, [filteredData]);

  const calculateTotalCartPrice = () => {
    let total = 0;

    for (const productDetails of filteredData) {
      total += productDetails.productPrice * productDetails.quantity;
    }

    setTotalCartPrice(total);
  };

  const deletecartitem = (cartKey) => {
    Swal.fire({
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this item from the cart?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          html: `
                    <div class="p-5">
                        <div class="spinner-border text-dark" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                `,
          showConfirmButton: false,
          background: 'transparent',
          timer: 3000
        });

        setFilteredData((prevData) => prevData.filter((item) => item.key !== cartKey));

        const cartItemRef = ref(db, 'users/' + loggedinuid + '/cart/' + cartKey);

        remove(cartItemRef)
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Item removed from the cart',
              showConfirmButton: true,
              timer: 3000
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error removing item from the cart:',
              showConfirmButton: true,
              timer: 3000
            });
            console.error('Error removing item from the cart:', error);
          });
      }
    });
  };

  const [paytmentmodal, setpaymentmodal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cod");

  const clearCart = (loggedinuid) => {
    // Reference to the user's cart
    const cartRef = ref(db, `users/${loggedinuid}/cart/`);

    // Remove the entire cart
    remove(cartRef)
      .then(() => {
        console.log('Cart cleared successfully!');
      })
      .catch((error) => {
        console.error('Error clearing the cart:', error);
      });
  };

  const handleProceedToCheckout = () => {
    // Check if the cart is empty
    if (filteredData.length === 0) {
      // Display a warning to the user
      Swal.fire({
        icon: 'warning',
        title: 'Your cart is empty',
        text: 'Please add items to your cart before proceeding to checkout',
        showConfirmButton: true,
      });
      return; // Exit the function
    }
    setpaymentmodal(true);
    // Proceed with the checkout process...
  };

  const buytheproduct = async () => {

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const address = document.getElementById('address').value;
    const pincode = document.getElementById('pincode').value;
    const phone = document.getElementById('phone').value;

    if (!firstName || !lastName || !city || !state || !address || !pincode || !phone) {
      // Check if any of the fields are empty
      Swal.fire({
        icon: 'error',
        title: 'Please fill in all the fields',
        showConfirmButton: true,
      });
      return;
    }

    const stockPromises = filteredData.map(async (product) => {
      const productRef = ref(db, `products/${product.productID}`);
      const productSnapshot = await get(productRef);
      if (productSnapshot.exists()) {
        const productData = productSnapshot.val();
        if (productData.stock < product.quantity) {
          // If quantity exceeds stock, show error message and prevent order placement
          Swal.fire({
            icon: 'error',
            title: `Not enough stock available for ${product.productName}`,
            text: `Available stock: ${productData.stock}`,
            showConfirmButton: true,
          });
          return false;
        }
      }
      return true;
    });

    const stockResults = await Promise.all(stockPromises);

    // If any product quantity exceeds stock, return early and do not proceed with order placement
    if (stockResults.includes(false)) {
      return;
    }


    // Proceed with placing the order
    Swal.fire({
      html: `
        <div class="p-5">
            <div class="spinner-border text-dark" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    `,
      showConfirmButton: false,
      background: 'transparent',
      timer: 3000
    });

    const orderDate = new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

    const productDetails = filteredData;

    let totalWithGST = totalCartPrice + (totalCartPrice * 0.18);

    // Calculate shipping cost
    const shippingCost = totalCartPrice < 500 ? 50 : 0;
    totalWithGST += shippingCost;

    const orderDetails = {
      orderDate,
      items: productDetails,
      total: totalCartPrice,
      grandTotal: totalWithGST,
      paymentMethod: selectedPaymentMethod,
      uid: loggedinuid,
      orderstatus: "Processing",
      address: {
        firstName,
        lastName,
        city,
        state,
        address,
        pincode,
        phone,
      }
    };


    const ordersRef = ref(db, 'orders');
    push(ordersRef, orderDetails)
      .then(() => {
        // Successfully saved the order
        console.log('Order placed successfully!');
        clearCart(loggedinuid)
        setpaymentmodal(false)
        fetchfromcart()
        updateStock(productDetails); // Call function to update stock
        Swal.fire({
          icon: 'success',
          title: 'Order Placed Successfully',
          showConfirmButton: true,
        });
        componentrender("Cart")
        setTimeout(() => {
          window.location.reload();
        }, 3000);

      })
      .catch((error) => {
        console.error('Error placing the order:', error);
      });
  };

  const buyNow = async () => {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const address = document.getElementById('address').value;
    const pincode = document.getElementById('pincode').value;
    const phone = document.getElementById('phone').value;

    if (!firstName || !lastName || !city || !state || !address || !pincode || !phone) {
      // Check if any of the fields are empty
      Swal.fire({
        icon: 'error',
        title: 'Please fill in all the fields',
        showConfirmButton: true,
      });
      return;
    }

    const addressInfo = {
      firstName,
      lastName,
      city,
      state,
      address,
      pincode,
      phone,
    };

    // Calculate totalWithGST
    let totalWithGST = totalCartPrice + (totalCartPrice * 0.18);

    // Calculate shipping cost
    const shippingCost = totalCartPrice < 500 ? 50 : 0;
    totalWithGST += shippingCost;

    var options = {
      key: "rzp_test_9t45F6uqof6zxQ",
      key_secret: "juz4o22naJGLuiaCt8z5SlEG",
      amount: parseInt(totalWithGST * 100), // Using totalWithGST instead of totalCartPrice
      currency: "INR",
      order_receipt: 'order_rcptid_' + loggedinuid,
      name: firstName + ' ' + lastName,
      description: "for testing purpose",
      handler: function (response) {
        console.log(response)
        Swal.fire({
          icon: 'success',
          title: 'Payment Successful',
          showConfirmButton: false,
          timer: 2000
        });

        const paymentId = response.razorpay_payment_id;

        const orderDetails = {
          orderDate: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          }),
          items: filteredData,
          total: totalCartPrice,
          grandTotal: totalWithGST,
          paymentId,
          paymentMethod: "online",
          uid: loggedinuid,
          orderstatus: "Processing",
          address: addressInfo
        }

        try {
          const ordersRef = ref(db, 'orders');
          push(ordersRef, orderDetails);
          clearCart(loggedinuid); // Clear cart after successful order placement
          setpaymentmodal(false); // Close payment modal
          fetchfromcart(); // Fetch updated cart data
          updateStock(filteredData); // Update stock
          componentrender("Cart");
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } catch (error) {
          console.log(error)
        }
      },
      theme: {
        color: "#3399cc"
      }
    };

    var pay = new window.Razorpay(options);
    pay.open();
  }

  const updateStock = (productDetails) => {
    productDetails.forEach((product) => {
      const productRef = ref(db, `products/${product.productID}`);
      get(productRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const currentStock = snapshot.val().stock;
            const updatedStock = currentStock - product.quantity;
            if (updatedStock >= 0) {
              set(ref(db, `products/${product.productID}/stock`), updatedStock)
                .then(() => {
                  console.log(`Stock updated for product ${product.productID}. New stock: ${updatedStock}`);
                })
                .catch((error) => {
                  console.error('Error updating stock:', error);
                });
            } else {
              console.error(`Error: Insufficient stock for product ${product.productID}`);
            }
          } else {
            console.error(`Error: Product ${product.productID} not found`);
          }
        })
        .catch((error) => {
          console.error('Error fetching product details:', error);
        });
    });
  };

  const [shippingCost, setShippingCost] = useState(0);

  useEffect(() => {
    if (totalCartPrice < 500) {
      setShippingCost(50);
    } else {
      setShippingCost(0);
    }
  }, [totalCartPrice]);

  return (
    <div className='d-flex flex-column '>
      <section id="cart-container" class="container my-5">
        <table width="100%">
          <thead>
            <tr>
              <td>Remove</td>
              <td>Product Image</td>
              <td>Product Name</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Total</td>
            </tr>
          </thead>

          {filteredData.length > 0 ? (
            <tbody>
              {filteredData.map((productDetails) => (
                <tr key={productDetails.key}>
                  <td>
                    <i
                      onClick={() => deletecartitem(productDetails.key)}
                      className="fas fa-trash-alt"
                    ></i>
                  </td>
                  <td>
                    <img
                      src={productDetails?.productImage}
                      alt={productDetails?.productName}
                      className='img-fluid'
                    />
                  </td>
                  <td>{productDetails?.productName}</td>
                  <td>₹ {productDetails?.productPrice}</td>
                  <td>
                    <i
                      onClick={() => decrease(productDetails.key)}
                      className='bi bi-dash pe-3'
                      style={{ fontSize: "20px", cursor: "pointer" }}></i>
                    <input
                      className="rounded border w-25 pl-1"
                      value={productDetails?.quantity || 1}
                      type="number"
                      onChange={(e) => handleQuantityChange(productDetails.key, e.target.value)}
                      style={{ cursor: "pointer" }}
                    />
                    <i
                      onClick={() => increase(productDetails.key)}
                      style={{ fontSize: "20px", cursor: "pointer" }}
                      className='bi bi-plus ps-3'
                    ></i>
                  </td>
                  <td>₹ {(productDetails?.productPrice || 0) * (productDetails?.quantity || 1)}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="5" className="text-end py-3 pe-2">Total Cart Price:</td>
                <td>₹ {totalCartPrice}</td>
              </tr>
            </tbody>
          ) : (
            <p className='text-center mt-3'>No items found in the cart.</p>
          )}
        </table>
      </section>
      <section id="cart-bottom" class="container mb-5">
        <div class="row">
          <div class="total col-lg-12 col-md-12 col-12">
            <div>
              <h5>Cart Total</h5>
              <div class="d-flex justify-content-between">
                <h6>Subtotal</h6>
                <p>₹ {totalCartPrice}</p>
              </div>
              <div class="d-flex justify-content-between">
                <h6>GST (18%)</h6>
                <p>₹ {totalCartPrice * 0.18}</p>
              </div>
              {filteredData.length > 0 && ( // Check if there are products in the cart
                <div class="d-flex justify-content-between">
                  <h6>Shipping Cost</h6>
                  {totalCartPrice < 500 ? (
                    <p>₹ 50</p>
                  ) : (
                    <p>Free</p>
                  )}
                </div>
              )}
              <div class="d-flex justify-content-between">
                <h6>Total</h6>
                <p>₹ {(totalCartPrice + (totalCartPrice * 0.18) + (totalCartPrice < 500 && filteredData.length > 0 ? 50 : 0)).toFixed(2)}</p>
              </div>
              <hr class="second-hr" />
              <div className='d-flex justify-content-between'>
                <h6>Grand Total</h6>
                <p>₹ {(totalCartPrice + (totalCartPrice * 0.18) + (totalCartPrice < 500 && filteredData.length > 0 ? 50 : 0)).toFixed(2)}</p>
              </div>
              <div className=''>
                <button class="mx-auto" onClick={handleProceedToCheckout} >Proceed to checkout</button>
              </div>
            </div>
          </div>

        </div>
      </section>


      {paytmentmodal && (
        <div>
          <div>
            <div
              className="modal d-block border-0"
              role="dialog"
              style={{
                display: 'block',
                background: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(3px)',
              }}
            >
              <div className="modal-dialog modal-fullscreen border-0 modal-dialog-centered">
                <div className="modal-content text-bg-green border-0 rounded-4">
                  <div className="modal-body">
                    <div className='d-flex flex-row justify-content-between pb-3'>
                      <h5 className='animate__animated animate__fadeInDown text-center fw-bold'>
                        Order Confirmation
                      </h5>
                      <h5 className='animate__animated animate__fadeInUp' onClick={() => setpaymentmodal(false)}>
                        <i className="bi bi-x-circle-fill"></i>
                      </h5>
                    </div>

                    <div className='d-flex flex-column justify-content-between ' style={{ height: "80vh" }}>
                      <div>
                        <div className='container pb-5' >
                          <div className="row">
                            <div className=" col-lg-6 col-12">
                              <form>
                                <div className='mb-3'>
                                  <label htmlFor="firstName" className="form-label">First Name</label>
                                  <input type="text" className="form-control" id="firstName" required />
                                </div>
                                <div className='mb-3'>
                                  <label htmlFor="lastName" className="form-label">Last Name</label>
                                  <input type="text" className="form-control" id="lastName" required />
                                </div>
                                <div className='mb-3'>
                                  <label htmlFor="city" className="form-label">City</label>
                                  <input type="text" className="form-control" id="city" required />
                                </div>
                                <div className='mb-3'>
                                  <label htmlFor="state" className="form-label">State</label>
                                  <input type="text" className="form-control" id="state" required />
                                </div>
                                <div className='mb-3'>
                                  <label htmlFor="address" className="form-label">Address</label>
                                  <textarea className="form-control" id="address" required></textarea>
                                </div>
                                <div className='mb-3'>
                                  <label htmlFor="pincode" className="form-label">Pincode</label>
                                  <input type="text" className="form-control" id="pincode" required />
                                </div>
                                <div className='mb-3'>
                                  <label htmlFor="phone" className="form-label">Phone</label>
                                  <input type="text" className="form-control" id="phone" required />
                                </div>
                                {/* <button type="submit" className="btn btn-primary">Confirm Order</button> */}
                              </form>
                            </div>



                            <div className="col-lg-6 col-12 py-5 border rounded">
                              <div>
                                <h4>Your Order</h4>
                                <h5 className='text-coral pt-2 pb-3'>Cart Items</h5>
                                {filteredData.map((product) => (
                                  <div className="d-flex align-items-center mb-3" key={product.key}>
                                    <img src={product.productImage} alt={product.productName} style={{ width: "80px", height: "auto" }} />
                                    <div className="ms-3">
                                      <h5>{product.productName}</h5>
                                      <p>Quantity: {product.quantity}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div>
                                <div>
                                  {/* <h5 className='text-coral'>Cart Total</h5> */}
                                  <div className="d-flex justify-content-between">
                                    <h6 className='text-coral'>Subtotal</h6>
                                    <p>₹ {totalCartPrice}</p>
                                  </div>
                                  <div className="d-flex justify-content-between">
                                    <h6 className='text-dark'>GST (18%)</h6>
                                    <p>₹ {totalCartPrice * 0.18}</p>
                                  </div>
                                  <div className="d-flex justify-content-between">
                                    <h6 className='text-dark'>Shipping Cost</h6>
                                    <p>{shippingCost === 0 ? "Free" : `₹ ${shippingCost}`}</p>
                                  </div>
                                  <div className="d-flex justify-content-between">
                                    <h6 className='text-dark fw-bold'>Total</h6>
                                    <p className='fw-bold'>₹ {(totalCartPrice + (totalCartPrice * 0.18 + shippingCost)).toFixed(2)}</p>
                                  </div>
                                  <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h6 className='text-coral fw-bold'>Payment Method:</h6>
                                    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                      <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" onChange={() => setSelectedPaymentMethod("cod")} checked={selectedPaymentMethod === "cod"} />
                                      <label className="btn btn-outline-success fw-bold" htmlFor="btnradio1">COD</label>
                                      <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" onChange={() => setSelectedPaymentMethod("online")} checked={selectedPaymentMethod === "online"} />
                                      <label className="btn btn-outline-success fw-bold" htmlFor="btnradio2">Online Payment</label>
                                    </div>
                                  </div>
                                  <div>
                                    {selectedPaymentMethod === "cod" ? (
                                      <button onClick={() => buytheproduct()} className="btn w-100 btn-success fw-bold text-white animate__animated animate__fadeInUp">Place Order</button>
                                    ) : (
                                      <button onClick={() => buyNow()} className="btn w-100 btn-success fw-bold text-white animate__animated animate__fadeInUp">Proceed to Payment</button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>


                          </div>
                        </div>
                      </div>
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

export default Cart;
