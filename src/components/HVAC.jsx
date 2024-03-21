import { Image } from "./image";
import React from "react";

export const HVAC = (props) => {
  return (
    <div id="portfolio" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>HVAC System</h2>
          <p className="text-left">
          Having an own experience of over 23 years, for diversified customer needs, we follow the guidelines of ASHRAE for the HVAC system designs. The system design includes but not limited to:
            </p>
            <div>
    <ul className="text-left" >
        <li >• Specialized Air-Conditioning for Clean Rooms, Operation Theaters, etc.</li>
        <li >• VRV Air-Conditioning Systems</li>
        <li >• Central Air-Conditioning Systems</li>
        <li >• Chilled Water Systems</li>
    </ul>
</div>

        </div>
        <div className="row">
          <div className="portfolio-items">
            {props.data
              ? props.data.map((d, i) => (
                  <div
                    key={`${d.title}-${i}`}
                    className="col-sm-6 col-md-4 col-lg-4"
                  >
                    <Image
                      title={d.title}
                      largeImage={d.largeImage}
                      smallImage={d.smallImage}
                    />
                  </div>
                ))
              : "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
};
