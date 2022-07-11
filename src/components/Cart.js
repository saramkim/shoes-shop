import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useStore2 } from "./Zustand";

function Cart() {
  const cartList = useStore2((state) => state.cartList);
  const 상품수 = cartList.reduce((a, b) => {
    return a + b.quant;
  }, 0);
  const 상품금액 = cartList.reduce((a, b) => {
    return a + b.price * b.quant;
  }, 0);
  const 배송비 = 상품수 > 3 ? 0 : 3000;
  let [rr, rr_] = useState(true);

  useEffect(() => {
    return;
  });

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>가격</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          <CartIn rr={rr} rr_={rr_} />
        </tbody>
      </Table>

      <div className="orderBar">
        <div className="orderBar__left">
          <div className="orderbar__left-content">
            <span>상품수</span>
            <span>{상품수}</span>
          </div>
          <div className="orderbar__left-content">
            <span>상품금액</span>
            <span>{상품금액}원</span>
          </div>
          <div className="orderbar__left-content">
            <span>배송비</span>
            <span>{배송비}원</span>
          </div>
        </div>
        <div className="orderBar__right">
          <div className="orederBar__right-content">
            <span>총 결제금액</span>
            <span>{상품금액 + 배송비}원</span>
          </div>
          <div className="orederBar__right-content">
            <button
              className="order-btn"
              onClick={() => {
                alert("뻥이야");
              }}
            >
              구매하기
            </button>
            <button
              className="order-btn"
              onClick={() => {
                alert("다시 생각해보자");
              }}
            >
              퇴각하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function CartIn({ rr, rr_ }) {
  const cartList = useStore2((state) => state.cartList);
  const quantPlus = useStore2((state) => state.quantPlus);
  const quantMinus = useStore2((state) => state.quantMinus);
  const delist = useStore2((state) => state.delist);

  return (
    <>
      {cartList.map((a) => (
        <tr key={a.id}>
          <td>{a.id}</td>
          <td>{a.title}</td>
          <td>{a.quant}</td>
          <td>{a.price}</td>
          <td>
            <button
              onClick={() => {
                quantPlus(a.id);
                rr_(!rr);
              }}
            >
              +
            </button>
            &nbsp;
            <button
              onClick={() => {
                quantMinus(a.id);
                rr_(!rr);
              }}
            >
              -
            </button>
            &nbsp;
            <button
              onClick={() => {
                delist(a.id);
                rr_(!rr);
              }}
            >
              x
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}

export default Cart;
