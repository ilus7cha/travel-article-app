import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../utils/apiArticles";
import { Article } from "../types/article";
import "../assets/styles/pages/ArticleDetail.css";

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (id) {
      fetchArticleById(id).then(setArticle).catch(console.error);
    }
  }, [id]);

  if (!article) return <p>Loading...</p>;

  return (
    <div className="article-detail">
      <h2>{article.title}</h2>
      <p>{article.content}</p>
      <small>
        By {article.author} |{" "}
        {article.createdAt
          ? new Date(article.createdAt).toLocaleDateString()
          : "Unknown date"}
      </small>
    </div>
  );
};

export default ArticleDetail;
