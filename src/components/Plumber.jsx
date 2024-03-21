import { Image } from "./image";
import React from "react";

export const Plumber = (props) => {
  return (
    <div id="portfolio" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>
          PLUMBING & FIRE PROTECTION</h2>
          
         
            <div >
    <ul className="text-left" >
        <li >• Water supply</li>
        <li>• Drainage & Sewerage system</li>
        <li>• Building Plumbing system</li>
        <li>• Water filtration and purification system</li>
        <li >• Waste water & Sewerage treatment plant.</li>
        <li>• RO Plant</li>
        <li>• Gas Distribution.</li>
        
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


