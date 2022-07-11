import "./App.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import Main from "./components/Main";
import Detail from "./components/Detail";
import Cart from "./components/Cart";
import { Suspense, useRef } from "react";

function App() {
  const navigate = useNavigate();
  const count = useRef(0);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand onClick={() => navigate("/")}>Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate("/detail")}>Detail</Nav.Link>
            <Nav.Link onClick={() => navigate("/cart")}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="side-bar">
        <Watched />
      </div>
      <Suspense fallback={<div>로딩중</div>}>
        <Routes>
          <Route path="/" element={<Main count={count} />}></Route>
          <Route path="/detail/:id" element={<Detail />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/event" element={<Event />}>
            <Route
              path="one"
              element={<p>첫 주문시 양배추즙 서비스</p>}
            ></Route>
            <Route path="two" element={<p>생일기념 쿠폰 받기</p>}></Route>
          </Route>
          <Route
            path="*"
            element={<div>존재하지 않는 페이지입니다.</div>}
          ></Route>
        </Routes>
      </Suspense>
    </div>
  );
}

function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  );
}

function Watched() {
  const navigate = useNavigate();
  let 최근본상품 = JSON.parse(localStorage.getItem("최근본상품"));

  return (
    <>
      {최근본상품 === null
        ? null
        : 최근본상품.map((a) => (
            <img
              src={`https://codingapple1.github.io/shop/shoes${a + 1}.jpg`}
              className="watched"
              onClick={() => navigate(`/detail/${a}`)}
              key={a}
            />
          ))}
    </>
  );
}

export default App;
