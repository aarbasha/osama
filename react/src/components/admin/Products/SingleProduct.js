import React from "react";
import FadeOutAnimation from "../../../Animation/FadeOutAnimation";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const SingleProduct = () => {

    return <FadeOutAnimation>
        <div className="card">
            <div className="card-header py-3">
                <h2>Information from prodact : <span className="text-success"> prodacts </span></h2>
            </div>
            <div className="card-body">
                <div className={"row"}>
                    <div className="col-lg-5">
                        {/* <Carousel infiniteLoop autoPlay dynamicHeight height={400}>
                            {
                                images.map(image => (
                                    <div>
                                        <img src={''} />
                                    </div>
                                ))
                            }
                        </Carousel> */}
                    </div>

                    <div className="col-lg-7 text-center">
                        infoprodact :
                        <div className="h3">77</div>
                        {/* <div className="h3 text-info">{prodacts.categories.name}</div> */}
                        <div className="h1">prodact</div>
                        <div className="h3 text-danger">456$</div>
                        <div className="h6 text-warning">jkjkjk</div>
                    </div>

                </div>
            </div>
        </div>
    </FadeOutAnimation>;
};

export default SingleProduct;
