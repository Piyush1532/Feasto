import React, { useEffect, useState } from "react";
import "./list.css";
import axios from "axios";
import { toast } from "react-toastify";
const Lists = () => {
  const [list, setList] = useState([]);
  const url = import.meta.env.VITE_API_URL;
  const fetchList = async (req, res) => {
    const { data } = await axios.get(`${url}/api/food/list`);
    // console.log(data);
    if (data.success) {
      setList(data.data);
    } else {
      toast.error();
    }
  };

const removeFood=async (foodId) => {
const response=await axios.post(`${url}/api/food/remove`,{id:foodId})

await fetchList()
if (response.data.success) {
  toast.success(response.data.message)
} else {
  toast.error("Error")
}
}

  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div className="list-table-format" key={index}>
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p onClick={()=>removeFood(item._id)} className="cursor">X</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Lists;
