import styles from "./index.module.scss";

function FilterBar({ value, onChange }) {
    
  return (
    <select className={styles.select} value={value} onChange={(e) => onChange(e.target.value)} >
      <option value="">Sort By</option>
      <option value="az">Name (A-Z)</option>
      <option value="za">Name (Z-A)</option>
      <option value="low-high">Price (Low → High)</option>
      <option value="high-low">Price (High → Low)</option>
      <option value="newest">Newest</option>
      <option value="oldest">Oldest</option>
    </select>
  );
}

export default FilterBar;