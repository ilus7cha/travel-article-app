import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchCategories } from "../store/categoriesSlice";
import "@/assets/styles/pages/CategoriesList.css";

const CategoriesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="categories-list">
      <h2>Categories</h2>
      {items.length === 0 ? (
        <p>No categories available.</p>
      ) : (
        items.map((category) => (
          <div key={category.id} className="category-card">
            <h3>{category.name}</h3>
            <p>{category.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default CategoriesList;
