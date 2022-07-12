import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

export function Event() {
  const navigate = useNavigate();

  return (
    <>
      <div className="event-title container">
        <h1>오늘의 이벤트</h1>
      </div>
      <div className="event-boxs container row">
        <div
          className="event-box col-md-3"
          onClick={() => {
            navigate("/event/1");
          }}
        >
          1
        </div>
        <div
          className="event-box col-md-3"
          onClick={() => {
            navigate("/event/2");
          }}
        >
          2
        </div>
        <div
          className="event-box col-md-3"
          onClick={() => {
            navigate("/event/3");
          }}
        >
          3
        </div>
      </div>
      <Outlet></Outlet>
    </>
  );
}
export function Event1() {
  const navigate = useNavigate();
  const [fade, setFade] = useState("");

  useEffect(() => {
    setFade("");
    setTimeout(() => {
      setFade("end2");
    }, 100);
  }, []);

  return (
    <div className="event-back">
      <div className={`event-popup start ${fade}`}>꽝</div>
      <button
        className="event-btn"
        onClick={() => {
          navigate(-1);
        }}
      >
        X
      </button>
    </div>
  );
}

export function Event2() {
  const navigate = useNavigate();
  const [fade, setFade] = useState("");

  useEffect(() => {
    setFade("");
    setTimeout(() => {
      setFade("end2");
    }, 100);
  }, []);

  return (
    <div className="event-back">
      <div className={`event-popup start ${fade}`}>꽝</div>
      <button
        className="event-btn"
        onClick={() => {
          navigate(-1);
        }}
      >
        X
      </button>
    </div>
  );
}

export function Event3() {
  const navigate = useNavigate();
  const [fade, setFade] = useState("");

  useEffect(() => {
    setFade("");
    setTimeout(() => {
      setFade("end2");
    }, 100);
  }, []);

  return (
    <div className="event-back">
      <div className={`event-popup start ${fade}`}>꽝</div>
      <button
        className="event-btn"
        onClick={() => {
          navigate(-1);
        }}
      >
        X
      </button>
    </div>
  );
}
