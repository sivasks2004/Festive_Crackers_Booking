import React from 'react';
import { Carousel } from 'react-bootstrap';
import WiresFrontPage from './Frontpage/WiresFrontPage';
import PipesFrontPage from './Frontpage/PipesFrontPage';
import FittingsFrontPage from './Frontpage/FittingsFrontPage';
import HitachiFrontPage from './Frontpage/HitachiDrillFrontPage';
import BoschDrillFrontPage from './Frontpage/BoschDrillFrontPage';
import BeltsFrontPage from './Frontpage/BeltsFrontPage';
import ChainsFrontPage from './Frontpage/ChainsFrontPage';


const Home = ({ fitcomponent }) => {

  const GoToWires = () => {
    fitcomponent("Products", "Wires");
  };

  return (
    <div>
      <section id="home">
        <div class="container">
          <h2> <span>Welcome to FCB</span> <br /> Your Festive Crackers Booking Store</h2>
          <p>Get your product delivered to your doorstep.</p>
          <button onClick={GoToWires}>Explore Now</button>
        </div>
      </section>


      <section id="Featured" className="my-5 pb-2">

        <div className="container text-center pt-5">
          <h3>Featured DayTime crackers</h3>
          <hr className="mx-auto" />
          <h4 className='pb-2'>Best Selling Confetti Crackers</h4>
          <WiresFrontPage />

          <h4>Best Selling Colorful Smoke Bombs</h4>
          <hr className="mx-auto" />
          <PipesFrontPage />

          <h4>Best Selling Parachute Rockets</h4>
          <hr className="mx-auto" />
          <FittingsFrontPage />
        </div>

        <div className="container text-center py-2">
          <h3>Featured Combination Boxes</h3>
          <hr className="mx-auto" />
          <p>Best Selling Family Packs</p>
          <HitachiFrontPage />
        </div>

        <div className="container text-center py-3">
          <h3>Featured Fancy Showpieces </h3>
          <hr className="mx-auto" />
          <p>Best Selling Sky Show Packs</p>
          <BoschDrillFrontPage />
        </div>

        <div className="container text-center py-3">
          <h3>Featured Kids’s Special Crackers </h3>
          <hr className="mx-auto" />
          <p>Best Selling Pop-pops</p>
          <BeltsFrontPage />
        </div>

        <div className="container text-center py-3">
          <h3>Featured Sound Crackers</h3>
          <hr className="mx-auto" />
          <p>Best Selling Double/Triple Sound Bomb</p>
          <ChainsFrontPage />
        </div>

      </section>

      <section id="about" className="my-5 py-5" >
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100 rounded same-height "
                    src="https://firebasestorage.googleapis.com/v0/b/sivaraj-stores.appspot.com/o/productimages%2FslideBar1.webp?alt=media&token=44113b85-b6ab-447d-8c10-066d20513f1c"
                    alt="First slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100 rounded same-height"
                    src="https://firebasestorage.googleapis.com/v0/b/sivaraj-stores.appspot.com/o/productimages%2Fslidebar4.jpg?alt=media&token=8182532b-fee4-4034-bf06-20034ef40a73"
                    alt="Second slide"
                  />
                </Carousel.Item>
              </Carousel>
            </div>
            <div className="col-lg-6 d-flex align-items-center">
              <div>
                <h2 className="mb-4">About Us</h2>
                <p className="text-muted">
                  FCB is your one-stop destination for all cracker needs. With a wide range of products and top-notch customer service, we strive to make your shopping experience seamless and convenient.
                </p>
                <p className="text-muted">
                  Our mission is to provide high-quality products at competitive prices, delivered right to your doorstep. Whether you're a professional contractor or a DIY enthusiast, we have everything you need to get the job done.
                </p>
                <p className="text-muted">
                  Shop with confidence at FCB and join our growing community of satisfied customers.
                </p>
                {/* <h3 className="mt-4">Why Choose Us?</h3>
                <ul className="text-muted">
                  <li>Wide selection of products</li>
                  <li>Competitive prices</li>
                  <li>Top-notch customer service</li>
                  <li>Convenient online shopping experience</li>
                  <li>Fast and reliable delivery</li>
                  <li>Customer satisfaction guarantee</li>
                </ul> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div>
        {/* <section id="Category" className="my-5 pb-5">
        <div className="container text-center mt-5">
          <h3>Shop By Categories</h3>
          <hr className="mx-auto" />

          <div className="row mt-5">
            <div className="one col-lg-3 col-md-6 col-12">
              <div className="image-container position-relative">
                <img className="img-fluid same-height" src="Images/wires1.png" alt="" onClick={GoToWires} />
                <div className="bottom mt-2">
                  <h2>Wires & Cables</h2>
                </div>
              </div>
            </div>

            <div className="one col-lg-3 col-md-6 col-12">
              <div className="image-container position-relative">
                <img className="img-fluid same-height" src="Images/pipes2.png" alt="" onClick={GoToPipes} />
                <div className="bottom mt-2">
                  <h2>Pipes</h2>
                </div>
              </div>
            </div>

            <div className="one col-lg-3 col-md-6 col-12">
              <div className="image-container position-relative">
                <img className="img-fluid same-height" src="Images/pvc-fittings.jpg" alt="" onClick={GoToFittings} />
                <div className="bottom mt-2">
                  <h2>PVC Fittings</h2>
                </div>
              </div>
            </div>

            <div className="one col-lg-3 col-md-6 col-12">
              <div className="image-container position-relative">
                <img className="img-fluid same-height" src="Images/bulbs.jpg" alt="" onClick={GoToBulbs} />
                <div className="bottom mt-2">
                  <h2>Lightings</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div className="one col-lg-3 col-md-6 col-12">
              <div className="image-container position-relative">
                <img className="img-fluid same-height" src="Images/drill.jpg" alt="" onClick={GoToDrillMachine} />
                <div className="bottom mt-2">
                  <h2>Drill Machine</h2>
                </div>
              </div>
            </div>

            <div className="one col-lg-3 col-md-6 col-12">
              <div className="image-container position-relative">
                <img className="img-fluid same-height w-150" src="Images/bosch2.webp" alt="" onClick={GoToBoschDrillMachine} />
                <div className="bottom mt-2">
                  <h2>Drill Machine</h2>
                </div>
              </div>
            </div>

            <div className="one col-lg-3 col-md-6 col-12">
              <div className="image-container position-relative">
                <img className="img-fluid same-height w-80" src="Images/heatgun.jpg" alt="" onClick={GoToHeat} />
                <div className="bottom mt-2">
                  <h2>Heat Gun And Air Bowlers</h2>
                </div>
              </div>
            </div>

            <div className="one col-lg-3 col-md-6 col-12">
              <div className="image-container position-relative">
                <img className="img-fluid same-height" src="Images/belts.webp" alt="" onClick={GoToBelts} />
                <div className="bottom mt-2">
                  <h2>Belts</h2>
                </div>
              </div>
            </div>

            <div className="one col-lg-3 col-md-6 col-12">
              <div className="image-container position-relative">
                <img className="img-fluid same-height" src="Images/chains.jpg" alt="" onClick={GoToChains} />
                <div className="bottom mt-2">
                  <h2>Chains</h2>
                </div>
              </div>
            </div>

            <div className="one col-lg-3 col-md-6 col-12">
              <div className="image-container position-relative">
                <img className="img-fluid same-height" src="Images/bearing.webp" alt="" onClick={GoToBearing} />
                <div className="bottom mt-2">
                  <h2>Bearings</h2>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section> */}
      </div>

    </div>
  )
}

export default Home