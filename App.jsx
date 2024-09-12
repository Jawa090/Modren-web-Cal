import React, { useState } from 'react';
import { Navbar } from './components/Navbar'; 
import { Sidebar } from './components/Sidebar';
import BoxLayout from './components/BoxLayout';
import ItemList from './components/ItemList';
import './App.css'; 

const App = () => {
    const [items, setItems] = useState([]);
    const [customerId, setCustomerId] = useState('');
    const [date, setDate] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);

    const handleItemsChange = (newItems) => {
        setItems(newItems);
        
        const total = newItems.reduce((total, item) => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity, 10) || 0;
            return total + (price * quantity);
        }, 0);
        setTotalAmount(total);
    };

    const handleCustomerIdChange = (id) => {
        setCustomerId(id);
    };

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    const handleSubmit = () => {
        
        const itemSummary = items.map((item, index) => (
            `\n${index + 1}. Product: ${item.product}, Price: $${item.price}, Quantity: ${item.quantity}`
        )).join('');
        
        const alertMessage = `
            Customer ID: ${customerId}
            Date: ${date}
            Items: ${itemSummary}
            Total Bill: $${totalAmount.toFixed(2)}
        `;

        alert(alertMessage);
    };

    return (
        <div>
            <Navbar /> 
            <Sidebar />
            <main>
                <BoxLayout onCustomerIdChange={handleCustomerIdChange} onDateChange={handleDateChange} />
                <ItemList onItemsChange={handleItemsChange} />
                <button onClick={handleSubmit}
                className="btn btn-primary btn-lg  btn-custom "
                >Submit</button>
            </main>
        </div>
    );
};

export default App;
