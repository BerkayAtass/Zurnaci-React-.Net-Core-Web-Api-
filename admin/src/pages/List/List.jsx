import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./List.css"
import { toast } from "react-toastify"
import { Button, Table } from 'react-bootstrap'

const List = ({ url }) => {

    const [foodList, setFoodList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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

        fetchFoodList();
    }, []);



    // Function to truncate description at 40 words
    const truncateDescription = (description) => {
        const words = description.split(' ');
        if (words.length > 5) {
            return words.slice(0, 5).join(' ') + '...';
        }
        return description;
    };

    return (

        <Table striped bordered hover className="list-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th >Product Name</th>
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
                            <Button className="btn btn-info" onClick={() => onEdit(item.id)} > Edit</Button>
                        </td>
                        <td>
                            <Button className="btn btn-danger" onClick={() => onDelete(item.id)} >Delete </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default List