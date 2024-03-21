import { Image } from "./image";
import React from "react";

export const Elv = (props) => {
  return (
    <div id="portfolio" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>
          ELECTRICAL & ELV SYSTEM</h2>
          
         
            
    <ul className="text-left">
        <li>• Lighting Distribution</li>
        <li >• Power Distribution</li>
        <li >• Power Generation Systems</li>
        <li >• Chilled Water Systems</li>
        <li >• Fire & Security Alarm System</li>
        <li >• Communication system</li>
        <li >• CCTV.</li>
      
    </ul>


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


