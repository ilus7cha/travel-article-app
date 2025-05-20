import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState, AppDispatch } from "../store/store";
import {
  clearCategoryDetail,
  fetchCategoryById,
} from "@/store/categoryDetailSlice";

const CategoryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { item, loading, error } = useSelector(
    (state: RootState) => state.categoryDetail
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchCategoryById(Number(id)));
    }
    return () => {
      dispatch(clearCategoryDetail());
    };
  }, [dispatch, id]);

  if (loading) return <div>Loading category detail...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!item) return <div>No category found.</div>;

  return (
    <div className="category-detail">
      <h2>{item.name}</h2>
      <p>{item.description}</p>
    </div>
  );
};

export default CategoryDetail;
