import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

const UserListComponent = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${config.url}/user/get-all`);
                setUsers(response.data);
            } catch (err) {
                setError('Error fetching users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const deleteUser = async (email) => {
        try {
            await axios.delete(`${config.url}/user/delete`, {
                params: { email }  // Send email as a query parameter
            });
            setUsers(users.filter(user => user.email !== email));  // Remove the deleted user from state
        } catch (err) {
            setError('Error deleting user');
        }
    };

    const containerStyle = {
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto'
    };

    const statusMessageStyle = {
        textAlign: 'center',
        fontSize: '18px',
        color: '#666'
    };

    const userListStyle = {
        listStyleType: 'none',
        padding: '0'
    };

    const userItemStyle = {
        marginBottom: '20px'
    };

    const userCardStyle = {
        padding: '15px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        transition: 'transform 0.2s'
    };

    const userCardHoverStyle = {
        transform: 'scale(1.02)'
    };

    const userNameStyle = {
        margin: '0',
        fontSize: '24px',
        color: '#333'
    };

    const userInfoStyle = {
        margin: '5px 0',
        color: '#555'
    };

    const deleteButtonStyle = {
        marginTop: '10px',
        padding: '8px 12px',
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    };

    if (loading) return <p style={statusMessageStyle}>Loading...</p>;
    if (error) return <p style={statusMessageStyle}>{error}</p>;

    return (
        <div style={containerStyle}>
            {users.length > 0 ? (
                <ul style={userListStyle}>
                    {users.map(user => (
                        <li key={user.email} style={userItemStyle}>
                            <div style={userCardStyle} className="user-card">
                                <h2 style={userNameStyle}>{user.firstName} {user.lastName}</h2>
                                <p style={userInfoStyle}>Email: {user.email}</p>
                                <p style={userInfoStyle}>Phone Number: {user.phoneNumber}</p>
                                <button
                                    style={deleteButtonStyle}
                                    onClick={() => deleteUser(user.email)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p style={statusMessageStyle}>No users found</p>
            )}
        </div>
    );
};

export default UserListComponent;
