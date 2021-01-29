import { useEffect, useRef, useState } from "react";
import "./diagram.scss";

function Diagram({ profit, subscr }) {
  const ellipse1 = useRef();
  const ellipse2 = useRef();

  const [procent, setProcent] = useState(0);

  useEffect(() => {
    if (ellipse2.current) {
      const ctx2 = ellipse2.current.getContext("2d");
      ctx2.beginPath();
      ctx2.arc(187, 76, 60, 0, 2*Math.PI, false);
      ctx2.strokeStyle = "#F4F2F5";
      ctx2.lineWidth = 15;
      ctx2.stroke();
    }
  }, []);

  useEffect(() => {
    setProcent(Math.round((subscr / profit) * 100));
  }, [profit, subscr]);

  useEffect(() => {
    if (ellipse1.current) {
      const ctx1 = ellipse1.current.getContext("2d");
      ctx1.beginPath();
      ctx1.arc(187, 76, 60, Math.PI, getPosition(90), false);
      ctx1.lineCap = "round";
      let gradient = ctx1.createLinearGradient(0,0, 340,170);
      gradient.addColorStop(0, '#FFD873');
      gradient.addColorStop(1, '#FF953B');
      ctx1.strokeStyle = gradient;
      ctx1.lineWidth = 16;
      ctx1.stroke();
    }
  }, [procent]);

  const getPosition = (procent) => {
    if (procent > 0 && procent <= 25) {
      return ((0.5*procent) / 25 + 1) * Math.PI;
    }
    if (procent > 25 && procent <= 50) {
      return ((1*procent) / 50 + 1) * Math.PI;
    }
    if (procent > 50 && procent <= 75) {
      return ((1.5*procent) / 75 + 1) * Math.PI;
    }
    if (procent > 75 && procent <= 100) {
      return ((2*procent) / 100 + 1) * Math.PI;
    }
  }

  return (
    <div className='diagram'>
      <span className='diagram__text'>on subscriptions, you spend:</span>
      <div className='diagram__ellipses'>
        <canvas className='diagram__ellipse main' ref={ellipse1} />
        <canvas className='diagram__ellipse' ref={ellipse2} />
        <div className='diagram__ellipses__info'>
          <span className='diagram__text-procent'>{`${procent}%`}</span>
          <span className='diagram__text'>of income</span>
        </div>
      </div>
    </div>
  );
}

export default Diagram;
