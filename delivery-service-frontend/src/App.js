import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';
import OrderDetails from './components/OrderDetails';
import 'bootstrap/dist/css/bootstrap.min.css'; 

function App() {
    const [refreshOrderList, setRefreshOrderList] = useState(false);

    const handleOrderCreated = () => {
        setRefreshOrderList(!refreshOrderList);
    };

    return (
        <Router>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Delivery App</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/create">Создать заказ</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/orders">Список заказов</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <Routes>
                <Route path="/" element={<OrderForm onOrderCreated={handleOrderCreated} />} />
                <Route path="/create" element={<OrderForm onOrderCreated={handleOrderCreated} />} />
                <Route path="/orders" element={<OrderList refreshList={refreshOrderList} />} />
                <Route path="/orders/:id" element={<OrderDetails />} />
            </Routes>
        </Router>
    );
}

export default App;