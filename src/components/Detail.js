import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStore, useStore2 } from "../Zustand";
import { Nav } from "react-bootstrap";

function Detail() {
  const navigate = useNavigate();
  const data = useStore((state) => state.data);
  const cartAdd = useStore2((state) => state.cartAdd);
  const cartList = useStore2((state) => state.cartList);
  let { id } = useParams();
  // eslint-disable-next-line
  let 해당상품 = data.find((a) => a.id == id);
  // eslint-disable-next-line
  let 재고상품 = cartList.find((a) => a.id == id);
  let [notice, setNotice] = useState(true);
  let [tabs, setTabs] = useState("info");
  let [rr, rr_] = useState(true);

  useEffect(() => {
    let timer = setTimeout(() => {
      setNotice(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    let 저장된상품 = JSON.parse(sessionStorage.getItem("최근본상품"));

    if (저장된상품 === null) {
      저장된상품 = [];
    } else {
      let 비교 = 저장된상품.findIndex((a) => a === 해당상품.id);
      비교 >= 0 && 저장된상품.splice(비교, 1);
    }

    저장된상품.unshift(해당상품.id);
    sessionStorage.setItem("최근본상품", JSON.stringify(저장된상품));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      {notice === true ? (
        <div className="alert alert-warning plus">다시 오지 않을 가격</div>
      ) : null}

      <div className="row mt-5 mb-5">
        <div className="col-md-6">
          <img
            src={`https://codingapple1.github.io/shop/shoes${
              해당상품.id + 1
            }.jpg`}
            width="100%"
            alt="shoes"
          />
        </div>
        <div className="col-md-6 detail-contens">
          <h4>{data[해당상품.id].title}</h4>
          <p>{data[해당상품.id].content}</p>
          <p>{data[해당상품.id].price}</p>
          <button
            className="btn btn-danger"
            onClick={() => {
              navigate("/shoes-store/cart");
              cartAdd({
                id: 해당상품.id,
                title: 해당상품.title,
                quant: 1,
                price: 해당상품.price,
                stock: 9,
              });
            }}
          >
            주문하기
          </button>
          &nbsp;
          <button
            className="btn btn-danger"
            onClick={() => {
              cartAdd({
                id: 해당상품.id,
                title: 해당상품.title,
                quant: 1,
                price: 해당상품.price,
                stock: 9,
              });
              rr_(!rr);
            }}
          >
            장바구니
          </button>
          <p>재고 : {재고상품 === undefined ? 10 : 재고상품.stock}</p>
        </div>
      </div>
      <Nav variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={() => setTabs("info")}>
            info
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={() => setTabs("shipping")}>
            shipping
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" onClick={() => setTabs("refund")}>
            refund
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tabs={tabs} />
    </div>
  );
}

function TabContent({ tabs }) {
  let [fade, setFade] = useState("");

  useEffect(() => {
    setFade("");
    setTimeout(() => {
      setFade("end");
    }, 100);
  }, [tabs]);

  return (
    <div className={`start ${fade}`}>
      {
        {
          info: <p>상품정보</p>,
          shipping: <p>배송관련</p>,
          refund: <p>환불약관</p>,
        }[tabs]
      }
    </div>
  );
}

export default Detail;
