import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({ category, setCategory }) => {
    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore our menu</h1>
            <p className='explore-menu-text'>Choose from a diverse menu featuring delectable array of dishes.</p>
            <div className="explore-menu-list">
                {menu_list.map((menu, index) => (
                    <div onClick={() => setCategory(prev => prev === menu.menu_name ? "All" : menu.menu_name)} key={index} className="explore-menu-list-item">
                        <img className={category === menu.menu_name ? "active" : ""} src={menu.menu_image} alt={menu.menu_name} />
                        <h3>{menu.menu_name}</h3>
                    </div>
                ))}
            </div>
            <hr />
        </div>
    )
}

export default ExploreMenu