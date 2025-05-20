import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchArticles } from "@/store/articlesSlice";

const ArticlesList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.articles
  );

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <div className="articles-list">
      <h2>Articles</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {items.map((article) => (
        <div key={article.id} className="article-card">
          <h3>{article.title}</h3>
          <p>{article.content}</p>
          <small>By {article.author}</small>
        </div>
      ))}
    </div>
  );
};

export default ArticlesList;
