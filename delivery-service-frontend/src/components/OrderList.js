import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api';

const OrderList = ({ refreshList }) => { 
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const response = await apiClient.get('/orders');
                setOrders(response.data);
            } catch (err) {
                setError('Не удалось загрузить список заказов.');
                console.error('Ошибка при загрузке списка заказов:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [refreshList]);

    const handleRowClick = (id) => {
        navigate(`/orders/${id}`);
    };

    if (loading) {
        return <div className="container mt-4">Загрузка...</div>;
    }

    if (error) {
        return <div className="container mt-4 alert alert-danger">{error}</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Список заказов</h2>
            <div className="table-responsive">
                <table className="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th>Номер заказа</th>
                            <th>Город отправителя</th>
                            <th>Город получателя</th>
                            <th>Дата забора</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id} onClick={() => handleRowClick(order.id)} style={{ cursor: 'pointer' }}>
                                <td>{order.id}</td>
                                <td>{order.senderCity}</td>
                                <td>{order.recipientCity}</td>
                                <td>{new Date(order.pickupDate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderList;