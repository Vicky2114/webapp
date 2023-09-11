import { useState } from "react";
import styles from "./AddProduct.module.css";
import Card from "../../card/Card";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Loader from "../../loader/Loader";
import axios from "axios";
import CreatableSelect from "react-select/creatable";
const categories = [
  { id: 1, value: "shoes", label: "shoes" },
  { id: 2, value: "oil", label: "oil" },
  { id: 3, value: "serum", label: "serum" },
  { id: 4, value: "facewash", label: "facewash" },
];

// const initialState = {
//   name: "",
//   imageURL: "",
//   price: 0,
//   category: "",
//   brand: "",
//   desc: "",
// };
const AddProduct = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [title, setTitle] = useState("");
  const [img, setImg] = useState([]);
  const [price, setPrice] = useState();
  const [categroy, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [videos, setVideos] = useState([]);
  const [disable, setDisable] = useState(false);
  const [id, setId] = useState();
  const [loader, setLoader] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  function detectForm(id, f1, f2) {
    if (id === "ADD") {
      return f1;
    }
    return f2;
  }

  const handleInputChange = (e) => {};
  const videoUploadHandler = async (e) => {
    setLoader(true);
    console.log(videos);
    const formdata = new FormData();
    formdata.append("videos", videos[0]);
    formdata.append("id", id);
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/uploadVideo",
        formdata
      );
      if (res.data.status === true) {
        toast.success(res.data.message);
        setDisable(false);
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("error in upload");
    }
  };
  const addProduct = async (e) => {
    setLoader(true);
    e.preventDefault();
    try {
      const formdata = new FormData();

      for (let i = 0; i < img.length; i++) {
        formdata.append("images", img[i]);
      }
      formdata.append("title", title);

      formdata.append("price", price);
      formdata.append("categroy", categroy);
      formdata.append("description", description);
      //console.log(formdata);
      const res = await axios.post(
        `http://localhost:8000/createProduct`,
        formdata
      );

      if (res.data.status === true) {
        setId(res.data.id);
        toast.success(res.data.message);
        setDisable(true);
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("error in upload ");
    }
  };

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);

    // Extract the values from the selected options and update the category list.
    const selectedValues = selectedOptions.map((option) => option.value);

    
    setCategory(selectedValues);
   
  };
  const editProduct = (e) => {};

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className={styles.product}>
          <Card cardClass={styles.card}>
            <form onSubmit={addProduct}>
              <label>Product name:</label>
              <input
                type="text"
                placeholder="Product name"
                required
                name="name"
                value="hemp"
                onChange={(e) => setTitle(e.target.value)}
              />

              <label>Product image:</label>
              <Card cardClass={styles.group1}>
                <input
                  type="file"
                  accept="image/*"
                  placeholder="Product Image"
                  name="images"
                  onChange={(e) => {
                    setImg(() => {
                      return e.target.files;
                    });
                  }}
                  multiple
                />
              </Card>
              <label>Product Price:</label>
              <input
                type="number"
                placeholder="Product price"
                required
                name="price"
                onChange={(e) => setPrice(e.target.value)}
              />
              <label>Product Category:</label>

              <CreatableSelect
                isMulti
                options={categories}
                autoFocus
                name="category"
                placeholder="Select Categories"
                onChange={handleCategoryChange}
                className={styles.createCategory}              />

              <label>Product Company/Brand:</label>
              <input
                type="text"
                placeholder="Product brand"
                required
                name="brand"
                onChange={(e) => handleInputChange(e.target.value)}
              />
              <label>Product Description:</label>
              <textarea
                name="desc"
                required
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="10"
              ></textarea>
              {disable ? null : (
                <button className={styles.Adminbtn}>upload data </button>
              )}
            </form>
            <form onSubmit={videoUploadHandler}>
              <Card cardClass={styles.group1}>
                <label>Product video:</label>
                <input
                  type="file"
                  placeholder="Video upload"
                  name="videos"
                  onChange={(e) => {
                    setVideos(() => {
                      return e.target.files;
                    });
                  }}
                  multiple
                />
              </Card>
              {disable ? (
                <button className={styles.Adminbtn}>upload video</button>
              ) : null}
            </form>
          </Card>
        </div>
      )}
    </>
  );
};

export default AddProduct;
