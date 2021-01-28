import React from "react";
import "./subscriptions.scss";

import ellipse_plus from "../../assets/icons/ellipse_plus.svg";
import Subscription from "./Subscription";
import subscriptions from "../../assets/subscriptions.json";

function index() {
  return (
    <div className="subscr">
      <div className="subscr__container">
        <div className="subscr__header">
          <span className="subscr__title">Subscriptions:</span>
          <button type="button" className="subscr__add-btn">
            <img src={ellipse_plus} alt="add" />
            <span>add</span>
          </button>
        </div>
        <div className="subscr__table">
          <div className="table__header">
            <span className='table__col'></span>
            <span className='table__col service'>service:</span>
            <span className='table__col price'>
              price
              <br />
              (USD/month):
            </span>
            <span className='table__col date'>
              payment every
              <br />
              month on the:
            </span>
            <span className='table__col'></span>
          </div>
          <hr/>
          <div className="table__scroll">
            {subscriptions.map((subscr, index) => (
              <Subscription
                service={subscr.service}
                price={subscr.price}
                date={subscr.date}
                color={subscr.color}
                key={`${subscr.service}_${index}`}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default index;
