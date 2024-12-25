import React from 'react'
import './UsersList.css'
import axios from "axios"
import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import { toast } from 'react-toastify'



const UsersList = () => {

    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUserList();
    }, []);

    const fetchUserList = async () => {
        try {
            const response = await axios.get('https://localhost:7007/api/user');
            setUserList(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch user list');
            setLoading(false);
        }
    };



    const onDelete = async (id) => {
        try {
            await axios.delete(`https://localhost:7007/api/user/${id}`);
            fetchUserList();
            toast.success('User deleted successfully');
        } catch (err) {
            console.error('Error deleting user:', err.response?.data || err.message);
            toast.error('Failed to delete user');
        }
    }


    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const clearAllField = () => {
        setEditId('');
        setEditName('');
        setEditEmail('');
        setEditBalance('');
        setEditPassword('');
        setEditIsAdmin('');
    }


    const [editId, setEditId] = useState('');
    const [editName, setEditName] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editBalance, setEditBalance] = useState('');
    const [editPassword, setEditPassword] = useState('');
    const [editIsAdmin, setEditIsAdmin] = useState('');
    const [cartData, setCartData] = useState([]);



    const handleEdit = (id) => {
        handleShow();
        const url = `https://localhost:7007/api/user/${id}`;
        axios.get(url).then((res) => {
            setEditId(id);
            setEditName(res.data.name);
            setEditEmail(res.data.email);
            setEditBalance(res.data.balance);
            setEditPassword(res.data.password);
            setEditIsAdmin(res.data.isAdmin);
            setCartData(res.data.cartData);
        }).catch((err) => {
            toast.error(err)
        });
    }
    const handleUpdate = () => {

        var value = editIsAdmin === "true" ? true : false;

        const url = `https://localhost:7007/api/user/${editId}`;
        const data = {
            "id": editId,
            "name": editName,
            "email": editEmail,
            "balance": editBalance,
            "password": editPassword,
            "isAdmin": value,
            "cartData": cartData
        };

        axios.put(url, data)
            .then((res) => {
                handleClose();
                fetchUserList();
                clearAllField();
                toast.success('Data updated successfully');
            })
            .catch((err) => {

                console.error('Update error:', err.response?.data || err.message);
                toast.error('Failed to update data');
            });
    }


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <div className="modal-container">
                    <Modal.Header closeButton>
                        <Modal.Title>Modify / Update User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <input type="text" placeholder="Enter USer Name" className='form-control' value={editName} onChange={(e) => setEditName(e.target.value)} />
                            </Col>
                            <Col>
                                <input type="email" placeholder="Enter email" className='form-control' value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                            </Col>
                            <Col>
                                <input type="text" placeholder="Enter Password" className='form-control' value={editPassword} onChange={(e) => setEditPassword(e.target.value)} />
                            </Col>
                            <Col>
                                <input type="text" placeholder="Enter Balance" className='form-control' value={editBalance} onChange={(e) => setEditBalance(e.target.value)} />
                            </Col>
                            <Col>
                                {/* <input type="text" placeholder="Enter Category" className='form-control' value={editCategory} onChange={(e) => setEditCategory(e.target.value)} /> */}
                                <p>Is Admin?</p>
                                <select onChange={(e) => setEditIsAdmin(e.target.value)} name="isAdmin">
                                    <option defaultValue={editIsAdmin}>{editIsAdmin ? "admin" : "costumer"}</option>
                                    <option value="true">Admin</option>
                                    <option value="false">Costumer</option>

                                </select>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleUpdate}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>
            <Table striped bordered hover className="list-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Balance</th>
                        <th >isAdmin</th>
                        <th colSpan="2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td className="break-line">{item.email}</td>
                            <td>{item.password}</td>
                            <td>{item.balance}</td>
                            <td>{item.isAdmin ? "yes" : "no"}</td>
                            <td>
                                <Button className="btn btn-info" onClick={() => handleEdit(item.id)} >Edit</Button>
                            </td>
                            <td>
                                <Button className="btn btn-danger" onClick={() => onDelete(item.id)} >Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </>
    )
}

export default UsersList