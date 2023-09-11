import React from 'react'
import styles from './ViewProducts.module.css';

import { Link } from 'react-router-dom';
import {FaEdit, FaTrashAlt} from "react-icons/fa";



const ViewProducts = () => {
  return (
    <>
    <div className={styles.table}>
    <h2>All Products</h2>
      <table>
      <thead>
        <tr>
          <th>s/n</th>
          <th>Image</th>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
            
            <tr>
            <td>
              1
            </td>
            <td>
              <img src="" alt="" style={{width: "100px"}} />
            </td>
            <td>
              Shoes
            </td>
            <td>
              shoes
            </td>
            <td>
             2000
            </td>
            <td className={styles.icons}>
            <Link to="">
            <FaEdit 
            size={20} 
            color="green"

            />
            </Link>
            &nbsp;
            <FaTrashAlt size={18} color="red" 
            />
            </td>
            </tr>
        </tbody>
      </table>
    </div>
    </>
  )
}

export default ViewProducts;