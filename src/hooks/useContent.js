import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api/content';

let cachedContent = null;
const subscribers = new Set();
let promise = null;

const useContent = () => {
  const [content, setContent] = useState(cachedContent);
  const [loading, setLoading] = useState(!cachedContent);

  useEffect(() => {
    if (cachedContent) {
      setContent(cachedContent);
      setLoading(false);
      return;
    }
    subscribers.add(setContent);
    if (subscribers.size === 1) {
      promise = fetch(API_URL)
        .then(res => res.json())
        .then(data => {
          cachedContent = data;
          subscribers.forEach(callback => callback(data));
          return data;
        })
        .catch(err => {
          console.error("Failed to fetch site content:", err);
          promise = null;
        });
    }
    return () => { subscribers.delete(setContent); };
  }, []);

  return { content, loading: !content };
};

export default useContent;