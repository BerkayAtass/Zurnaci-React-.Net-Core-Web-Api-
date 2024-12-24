import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./List.css"
import { toast } from "react-toastify"
import { Button, Table } from 'react-bootstrap'
import { Modal, Row, Col } from 'react-bootstrap'


const List = ({ url }) => {

    const [foodList, setFoodList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFoodList();
    }, []);

    const fetchFoodList = async () => {
        try {
            const response = await axios.get('https://localhost:7007/api/food');
            setFoodList(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch food list');
            setLoading(false);
        }
    };

    const onDelete = async (id) => {
        try {
            await axios.delete(`https://localhost:7007/api/food/${id}`);
            fetchFoodList();
            toast.success('Product deleted successfully');
        } catch (err) {
            console.error('Error deleting product:', err.response?.data || err.message);
            toast.error('Failed to delete product');
        }
    }


    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const clearAllField = () => {
        setEditId('');
        setEditPrice('');
        setEditCategory('');
        setEditDescription('');
        setEditImage('');
    }

    // const [name, setName] = useState('');
    // const [price, setPrice] = useState('');
    // const [category, setCategory] = useState('');
    // const [description, setDescription] = useState('');


    const [editId, setEditId] = useState('');
    const [editName, setEditName] = useState('');
    const [editCategory, setEditCategory] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editPrice, setEditPrice] = useState('');
    const [editImage, setEditImage] = useState('');



    const handleEdit = (id) => {
        handleShow();
        const url = `https://localhost:7007/api/food/${id}`;
        axios.get(url).then((res) => {
            setEditId(id);
            setEditName(res.data.name);
            setEditCategory(res.data.category);
            setEditDescription(res.data.description);
            setEditPrice(res.data.price);
            setEditImage(res.data.image);
        }).catch((err) => {
            toast.error(err)
        });
    }
    const handleUpdate = () => {
        // console.log("Updating data: ", {
        //     id: editId,
        //     name: editName,
        //     description: editDescription,
        //     category: editCategory,
        //     price: editPrice
        // });

        const url = `https://localhost:7007/api/food/${editId}`;
        const data = {
            "id": editId,
            "name": editName,
            "description": editDescription,
            "category": editCategory,
            "price": editPrice,
            "image": editImage
        };

        axios.put(url, data)
            .then((res) => {
                handleClose();
                fetchFoodList();
                clearAllField();
                toast.success('Data updated successfully');
            })
            .catch((err) => {

                console.error('Update error:', err.response?.data || err.message);
                toast.error('Failed to update data');
            });
    }


    // Function to truncate description at 40 words
    const truncateDescription = (description) => {
        const words = description.split(' ');
        if (words.length > 5) {
            return words.slice(0, 5).join(' ') + '...';
        }
        return description;
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <div className="modal-container">
                    <Modal.Header closeButton>
                        <Modal.Title>Modify / Update Foods</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <input type="text" placeholder="Enter Product Name" className='form-control' value={editName} onChange={(e) => setEditName(e.target.value)} />
                            </Col>
                            <Col>
                                <input type="text" placeholder="Enter Description" className='form-control' value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                            </Col>
                            <Col>
                                {/* <input type="text" placeholder="Enter Category" className='form-control' value={editCategory} onChange={(e) => setEditCategory(e.target.value)} /> */}
                                <p>Product category</p>
                                <select onChange={(e) => setEditCategory(e.target.value)} name="category">
                                    <option value={editCategory} selected>{editCategory}</option>
                                    <option value="Zurna">Salad</option>
                                    <option value="Salad">Rolls</option>
                                    <option value="Deserts">Deserts</option>
                                    <option value="Sandwich">Sandwich</option>
                                    <option value="Cake">Cake</option>
                                    <option value="Pure Veg">Pure Veg</option>
                                    <option value="Pasta">Pasta</option>
                                    <option value="Noodles">Noodles</option>
                                </select>
                            </Col>
                            <Col>
                                <input type="text" placeholder="Enter Price" className='form-control' value={editPrice} onChange={(e) => setEditPrice(e.target.value)} />
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
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th >Price</th>
                        <th colSpan="2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {foodList.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td className="break-line">{truncateDescription(item.description)}</td>
                            <td>{item.category}</td>
                            <td>${item.price}</td>
                            <td>
                                <Button className="btn btn-info" onClick={() => handleEdit(item.id)} > Edit</Button>
                            </td>
                            <td>
                                <Button className="btn btn-danger" onClick={() => onDelete(item.id)} >Delete </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </>
    )
}

export default List