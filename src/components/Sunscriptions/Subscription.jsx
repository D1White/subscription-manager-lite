import React from "react";
import "./subscription.scss";

function Subscription({ service, price, date, color }) {
  return (
    <div className="table__subscr">
      <div className="table__logo">
        <span style={{ color: color }}>
          {service[0]}
        </span>
        <div className="bg" style={{ backgroundColor: color }} />
      </div>
        <span className="table__text">{service}</span>
        <span className="table__text price">
          {`$ ${price}`}
        </span>
        <span className="table__text date">
          {date}
          <small>th</small>
        </span>
    </div>
  );
}

export default Subscription;
