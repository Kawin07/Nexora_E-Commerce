import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ReceiptModal.css';

const ReceiptModal = ({ receipt, onClose }) => {
  const navigate = useNavigate();
  
  const handleContinueShopping = () => {
    onClose();
    navigate('/');
  };
  
  if (!receipt) return null;

  return (
    <div className="receipt-overlay">
      <div className="receipt-modal">
        <div className="receipt-header">
          <div className="success-icon">✓</div>
          <h2>Order Successful!</h2>
          <p className="receipt-subtitle">Thank you for your purchase</p>
        </div>

        <div className="receipt-body">
          <div className="receipt-info">
            <div className="info-row">
              <span className="info-label">Order Number:</span>
              <span className="info-value">{receipt.orderNumber}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Customer:</span>
              <span className="info-value">{receipt.customerName}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{receipt.customerEmail}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Date:</span>
              <span className="info-value">
                {new Date(receipt.timestamp).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="receipt-items">
            <h3>Items</h3>
            {receipt.items.map((item, index) => (
              <div key={index} className="receipt-item">
                <span>{item.name} (x{item.quantity})</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="receipt-total">
            <span className="total-label">Total Amount:</span>
            <span className="total-value">${receipt.total.toFixed(2)}</span>
          </div>

          <div className="receipt-message">
            <p>A confirmation email has been sent to {receipt.customerEmail}</p>
          </div>
        </div>

        <div className="receipt-footer">
          <button className="close-btn" onClick={handleContinueShopping}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
