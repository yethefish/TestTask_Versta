import React, { useState } from 'react';
import apiClient from '../api';

const OrderForm = ({ onOrderCreated }) => {
    const [order, setOrder] = useState({
        senderCity: '',
        senderAddress: '',
        recipientCity: '',
        recipientAddress: '',
        weight: '',
        pickupDate: ''
    });

    const handleChange = (e) => {
        setOrder({ ...order, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const orderToSend = {
                ...order,
                weight: parseFloat(order.weight),
                pickupDate: new Date(order.pickupDate).toISOString()
            };
            await apiClient.post('/orders', orderToSend);
            alert('Заказ успешно создан!');
            setOrder({
                senderCity: '',
                senderAddress: '',
                recipientCity: '',
                recipientAddress: '',
                weight: '',
                pickupDate: ''
            });
            onOrderCreated();
        } catch (error) {
            console.error('Ошибка при создании заказа:', error.response ? error.response.data : error.message);
            alert('Ошибка при создании заказа. Проверьте введенные данные.');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Создать новый заказ</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Город отправителя:</label>
                    <input type="text" className="form-control" name="senderCity" value={order.senderCity} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Адрес отправителя:</label>
                    <input type="text" className="form-control" name="senderAddress" value={order.senderAddress} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Город получателя:</label>
                    <input type="text" className="form-control" name="recipientCity" value={order.recipientCity} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Адрес получателя:</label>
                    <input type="text" className="form-control" name="recipientAddress" value={order.recipientAddress} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Вес груза (кг):</label>
                    <input type="number" step="0.01" className="form-control" name="weight" value={order.weight} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Дата забора груза:</label>
                    <input type="date" className="form-control" name="pickupDate" value={order.pickupDate} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Создать заказ</button>
            </form>
        </div>
    );
};

export default OrderForm;