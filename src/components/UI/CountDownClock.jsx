import React, { useEffect, useState } from "react";

function CountDownClock({ data}) {
  const [expiryTime, setExpirayTime] = useState("");
  let requestID;
  useEffect(() => {
    requestID = requestAnimationFrame(countdown);
    return () => cancelAnimationFrame(countdown);
  }, []);

  function countdown() {
    let currentTime = Date.now();
    let timeLeft = data - currentTime;
    let secondsLeftText = Math.floor((timeLeft / 1000) % 60);
    let minutesLeftText = Math.floor((secondsLeftText / 60) % 60);
    let hoursLeftText = Math.floor(minutesLeftText / 60);

    if (timeLeft <= 0) {
      return setExpirayTime("Expired");
    }

    else if (secondsLeftText.toString().length === 1) {
      secondsLeftText = "0" + secondsLeftText;
    }
    if (minutesLeftText.toString().length === 1) {
      minutesLeftText = "0" + minutesLeftText;
    }
    if (hoursLeftText.toString().length < 3) {
      hoursLeftText = "0" + hoursLeftText;
    }

    setExpirayTime(`${hoursLeftText}h ${minutesLeftText}m ${secondsLeftText}s`);
    requestID = requestAnimationFrame(countdown);
   
  }


  return <div className="de_countdown">{expiryTime}</div>;
}

export default CountDownClock;
