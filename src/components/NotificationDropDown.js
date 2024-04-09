import React, { useState, useEffect } from 'react';

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Simulated function to fetch notifications
  const fetchNotifications = async () => {
    try {

        const accessToken = localStorage.getItem('JWTBOOKINGTOKEN');
            // Perform API call to add the review
            const response = await fetch('http://localhost:5000/bookingapp/api/notification/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                }
            });
      
      
      const data = await response.json();
      setNotifications(data); // Update notifications state with fetched data
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // useEffect hook to fetch notifications when component mounts
  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="notification-dropdown">
      <button onClick={toggleDropdown} className="btn btn-link nav-link">
        Notifications
      </button>
      {isOpen && (
        <div className="dropdown-overlay">
        <div className="dropdown-content">
          {notifications.length > 0 ? (
            <ul>
              {notifications.map((notification) => (
                <li key={notification.id}>{notification.message}</li>
              ))}
            </ul>
          ) : (
            <p>No notifications</p>
          )}
        </div></div>
      )}
    </div>
  );
};

export default NotificationDropdown;
