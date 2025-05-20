import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchArticleById,
  createArticle,
  updateArticle,
} from "../utils/apiArticles";

const ArticleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
  });

  useEffect(() => {
    if (id) {
      fetchArticleById(id).then((article) =>
        setFormData({
          title: article.title,
          content: article.content,
          author: article.author,
        })
      );
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      await updateArticle(id, formData);
    } else {
      await createArticle(formData);
    }
    navigate("/articles");
  };

  return (
    <form onSubmit={handleSubmit} className="article-form">
      <label>
        Title:
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Content:
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Author:
        <input
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">{id ? "Update" : "Create"} Article</button>
    </form>
  );
};

export default ArticleForm;
