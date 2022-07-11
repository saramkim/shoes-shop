import { useNavigate } from "react-router-dom";
import { useStore } from "./Zustand";
import axios from "axios";

function Main({ count }) {
  const data = useStore((state) => state.data);
  const setData = useStore((state) => state.setData);
  const navigate = useNavigate();

  return (
    <>
      <div className="main-bg"></div>

      <div className="container">
        <div className="row">
          {data.map((a) => (
            <div className="col-md-4" key={a.id}>
              <img
                src={`https://codingapple1.github.io/shop/shoes${a.id + 1}.jpg`}
                width="100%"
                onClick={() => navigate(`detail/${a.id}`)}
                alt="shoes"
              />
              <h4>{a.title}</h4>
              <p>
                {a.content} & {a.price}
              </p>
            </div>
          ))}
        </div>

        {count.current === 2 ? null : (
          <button
            onClick={() => {
              if (count.current === 0) {
                axios
                  .get("https://codingapple1.github.io/shop/data2.json")
                  .then((a) => {
                    setData(a.data);
                    count.current++;
                  })
                  .catch(() => {});
              } else if (count.current === 1) {
                axios
                  .get("https://codingapple1.github.io/shop/data3.json")
                  .then((a) => {
                    setData(a.data);
                    count.current++;
                  })
                  .catch(() => {});
              }
            }}
          >
            더보기
          </button>
        )}
      </div>
    </>
  );
}

export default Main;
