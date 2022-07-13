import "./App.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Routes, Route, useNavigate } from "react-router-dom";
import Main from "./components/Main";
import Detail from "./components/Detail";
import Cart from "./components/Cart";
import { Event, Event1, Event2, Event3 } from "./components/Event";
import { Suspense, useRef } from "react";

function App() {
  const navigate = useNavigate();
  const count = useRef(0);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand onClick={() => navigate("/shoes-store")}>
            Shoes Store
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/shoes-store")}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate("/shoes-store/event")}>
              Event
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/shoes-store/cart")}>
              Cart
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="side-bar">
        <Watched />
      </div>
      <Suspense fallback={<div>로딩중</div>}>
        <Routes>
          <Route path="/shoes-store/" element={<Main count={count} />}></Route>
          <Route path="/shoes-store/detail/:id" element={<Detail />}></Route>
          <Route path="/shoes-store/cart" element={<Cart />}></Route>
          <Route path="/shoes-store/event" element={<Event />}>
            <Route path="1" element={<Event1 />}></Route>
            <Route path="2" element={<Event2 />}></Route>
            <Route path="3" element={<Event3 />}></Route>
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

function Watched() {
  const navigate = useNavigate();
  let 최근본상품 = JSON.parse(sessionStorage.getItem("최근본상품"));

  return (
    <>
      {최근본상품 === null
        ? null
        : 최근본상품.map((a) => (
            <img
              src={`https://codingapple1.github.io/shop/shoes${a + 1}.jpg`}
              className="watched"
              onClick={() => navigate(`/shoes-store/detail/${a}`)}
              key={a}
              alt="shoes"
            />
          ))}
    </>
  );
}

export default App;
