
import styles from "./index.module.scss";
import { useProductForm } from "../../hooks/useProductForm";
import { FaClosedCaptioning, FaPlus } from "react-icons/fa";
import { useCategories } from "../../hooks/useCategories";

function AddEditModal({product, closeModal }) {
  const categories=useCategories();

  const {
    formData,
    handleChange,
    handleVariantChange,
    handleSizeChange,
    addVariant,
    addSize,
    handleSubmit,
  } = useProductForm(product,closeModal);

  const colorMap = {
    Black: "#000000",
    White: "#FFFFFF",
    Red: "#FF0000",
    Blue: "#0000FF",
    Green: "#008000",
    Brown: "#8B4513",
    Gray: "#808080",
    Yellow: "#FFFF00",
    Orange: "#FFA500",
    Pink: "#FFC0CB",
    Purple: "#800080",
    Navy: "#000080",
    Beige: "#F5F5DC",
  };



  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
         <h2>{product ? "Edit Product" : "Add Product"}</h2>
          <button type="button" onClick={closeModal}><FaClosedCaptioning/></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.section}>
            <h3>Product Information</h3>
            <input type="text"  placeholder="Product Name" value={formData.title} onChange={(e) => handleChange("title", e.target.value)} />
            <input type="text" placeholder="Brand" value={formData.company} onChange={(e) => handleChange("company", e.target.value)}/>
            <select value={formData.category} onChange={(e) => handleChange("category", e.target.value)} >
              <option value="">Select Category</option>
              {categories.map((category) => (<option key={category._id} value={category._id}>{category.name}</option>))}
            </select>
            <textarea rows={5} placeholder="Description" value={formData.description} onChange={(e) =>  handleChange("description", e.target.value)} />
          </div>
          <div className={styles.section}>
            <h3>Pricing</h3>
            <input type="number"  placeholder="Price" value={formData.price} onChange={(e) => handleChange("price", e.target.value)} />
            <input type="number"  placeholder="Old Price" value={formData.oldPrice} onChange={(e) =>  handleChange("oldPrice", e.target.value)}/>
          </div>
          <div className={styles.section}>
            <h3>Status</h3>
            <label>
              <input type="checkbox" checked={formData.isFeatured} onChange={(e) => handleChange("isFeatured", e.target.checked) }/>
                Featured
            </label>
            <label>
              <input type="checkbox" checked={formData.isBestSeller} onChange={(e) =>  handleChange("isBestSeller", e.target.checked) } />
               Best Seller
            </label>
            <label>
              <input type="checkbox" checked={formData.isNewArrival} onChange={(e) => handleChange("isNewArrival", e.target.checked) } />
               New Arrival
            </label>
          </div>
          <div className={styles.section}>
            <h3>Variants</h3>
            {formData.variants.map((variant, variantIndex) => (
              <div key={variantIndex} className={styles.variant}>
                <select value={variant.color}
                onChange={(e) =>  handleVariantChange( variantIndex,"color", e.target.value ) }>
                  <option value="">Select Color</option>
                  {Object.keys(colorMap).map((color) => (<option key={color} value={color}>{color}</option>))}
                </select>
                <input type="text" placeholder="Image URL" value={variant.image} onChange={(e) => handleVariantChange( variantIndex, "image", e.target.value)}/>
                <h4>Sizes</h4>
                {variant.sizes.map((size, sizeIndex) => (
                  <div key={sizeIndex}>
                    <input type="text" placeholder="Size" value={size.size} onChange={(e) => handleSizeChange( variantIndex, sizeIndex, "size", e.target.value ) }/>
                    <input type="number" min="0" placeholder="Stock" value={size.stock} onChange={(e) => handleSizeChange( variantIndex, sizeIndex,"stock", e.target.value) } />
                  </div>
                ))}
                <button type="button" onClick={() => addSize(variantIndex)} > <FaPlus/> Add Size </button>
              </div>
            ))}
            <button type="button" onClick={addVariant}><FaPlus/> Add Variant</button>
          </div>
          <button className={styles.submit} type="submit">{product ? "Update Product" : "Save Product"}</button>
        </form>
      </div>
    </div>
  );
}

export default AddEditModal;