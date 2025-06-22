import React, { useEffect, useState } from 'react';
import apiClient from '../api';
import { useParams, Link } from 'react-router-dom';

const OrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await apiClient.get(`/orders/${id}`);
                setOrder(response.data);
            } catch (err) {
                setError('Заказ не найден или произошла ошибка при загрузке.');
                console.error('Ошибка при загрузке деталей заказа:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id]);

    if (loading) {
        return <div className="container mt-4">Загрузка...</div>;
    }

    if (error) {
        return <div className="container mt-4 alert alert-danger">{error}</div>;
    }

    if (!order) {
        return <div className="container mt-4">Заказ не найден.</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Детали заказа №{order.id}</h2>
            <div className="card">
                <div className="card-body">
                    <p className="card-text"><strong>Город отправителя:</strong> {order.senderCity}</p>
                    <p className="card-text"><strong>Адрес отправителя:</strong> {order.senderAddress}</p>
                    <p className="card-text"><strong>Город получателя:</strong> {order.recipientCity}</p>
                    <p className="card-text"><strong>Адрес получателя:</strong> {order.recipientAddress}</p>
                    <p className="card-text"><strong>Вес груза:</strong> {order.weight} кг</p>
                    <p className="card-text"><strong>Дата забора груза:</strong> {new Date(order.pickupDate).toLocaleDateString()}</p>
                </div>
            </div>
            <Link to="/orders" className="btn btn-secondary mt-3">Вернуться к списку заказов</Link>
        </div>
    );
};

export default OrderDetails;