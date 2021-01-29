import { useState, useEffect, useRef } from "react";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import { HexColorPicker } from "react-colorful";

import "./inputs.scss";
import "react-colorful/dist/index.css";
import color_picker from "../../assets/icons/color_lens.svg";
import warning_ico from "../../assets/icons/warning.svg";

function Inputs() {
  const colorPicker = useRef();

  const [color, setColor] = useState("#eeeeee");
  const [isOpen, toggleOpen] = useState(false);
  const [service, setService] = useState(null);
  const [price, setPrice] = useState(null);
  const [date, setDate] = useState(null);
  const [warning, setWarning] = useState({
    service: false,
    price: false,
    date: false,
  });

  useEffect(() => {
    document.body.addEventListener("click", handleOutsideClick);

    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (service) {
      if (service.length < 1 || service.length > 25) {
        setWarning({
          ...warning,
          service: true,
        });
      } else {
        setWarning({
          ...warning,
          service: false,
        });
      }
    }
  }, [service]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (price) {
      // if (!/^\d+$/gm.test(price) || parseFloat(price) < 1 || parseFloat(price) > 10000) {
      if (
        !/^\d+\.?\d*$/gm.test(price) ||
        parseFloat(price) < 1 ||
        parseFloat(price) > 10000
      ) {
        setWarning({
          ...warning,
          price: true,
        });
      } else {
        setWarning({
          ...warning,
          price: false,
        });
      }
    }
  }, [price]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (date) {
      if (!/^\d+$/gm.test(date) || parseInt(date) < 1 || parseInt(date) > 31) {
        setWarning({
          ...warning,
          date: true,
        });
      } else {
        setWarning({
          ...warning,
          date: false,
        });
      }
    }
  }, [date]); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   console.log(service, price, date, color, isOpen);
  //   console.log(warning);
  // }, [service, price, date, color, isOpen, warning]);
  useEffect(() => {
    console.log(warning);
  }, [warning]);

  const debounced = useDebouncedCallback(
    (value, type) => {
      switch (type) {
        case "service":
          setService(value);
          break;
        case "price":
          setPrice(value);
          break;
        case "date":
          setDate(value);
          break;
        case "color":
          setColor(value);
          break;
        default:
          break;
      }
    },
    500,
    { maxWait: 2000 }
  );

  const pickerSwitcher = () => {
    toggleOpen(!isOpen);
  };

  const handleOutsideClick = (event) => {
    const path = event.path || (event.composedPath && event.composedPath());
    if (!path.includes(colorPicker.current)) {
      toggleOpen(false);
    }
  };

  return (
    <div className='table__form'>
      <div className='table__picker' ref={colorPicker}>
        <div
          className='table__picker-block'
          onClick={pickerSwitcher}
          style={{ backgroundColor: color }}
        >
          {!isOpen && <img src={color_picker} alt='color picker' />}
        </div>
        {isOpen && (
          <div className='popover'>
            <HexColorPicker
              color={color}
              onChange={(e) => debounced.callback(e, "color")}
            />
          </div>
        )}
      </div>

      <div className='table__inputs-block'>
        <div className='table__inputs-form'>
          <input
            type='text'
            className={`table__input service ${warning.service && "error"}`}
            autoComplete='off'
            onChange={(e) => debounced.callback(e.target.value, "service")}
          />
          {warning.service && (
            <div className='table__error'>
              <img src={warning_ico} alt='error' />
              Error
            </div>
          )}
        </div>
      </div>
      <div className='table__inputs-block'>
        <div className='table__inputs-form'>
          <input
            type='text'
            className={`table__input price ${warning.price && "error"}`}
            autoComplete='off'
            onChange={(e) => debounced.callback(e.target.value, "price")}
          />
          {warning.price && (
            <div className='table__error'>
              <img src={warning_ico} alt='error' />
              Error
            </div>
          )}
        </div>
      </div>
      <div className='table__inputs-block'>
        <div className='table__inputs-form'>
          <input
            type='text'
            className={`table__input date ${warning.date && "error"}`}
            autoComplete='off'
            onChange={(e) => debounced.callback(e.target.value, "date")}
          />
          {warning.date && (
            <div className='table__error'>
              <img src={warning_ico} alt='error' />
              Error
            </div>
          )}
        </div>
      </div>

      <div className='table__form__actions'>
        <button type='submit' className='table__form__btn submit' />
        <button type='reset' className='table__form__btn reset' />
      </div>
    </div>
  );
}

export default Inputs;
