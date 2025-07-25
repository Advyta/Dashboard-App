"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Card from "@/ui/card";
import Link from "next/link";
import { newsArticle } from "@/lib/types";

// -------------------------------------------------
// Project: Dashboard APP
// Module: News
// Component: News
// Author: Advyta
// Date: 24/07/2025
// Logic:
// 1. Fetch news data from the server based on the country code
// 2. Display news data
// 3. Handle news data

const News = () => {
  const countryCode = useSelector((state: RootState) => state.user.countryCode);
  const [news, setNews] = useState<newsArticle[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      if (!countryCode) return;
      try {
        const newsResponse = await fetch(
          `/api/users/news?country=${countryCode}`
        );
        const newsData = await newsResponse.json();
        if (newsData.error) {
          setError(newsData.error);
          return;
        }
        setNews(newsData);
      } catch (err) {
        setError("Failed to fetch news");
      }
    };
    fetchNews();
  }, [countryCode]);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {countryCode && (
        <Card
          title="Latest News"
          data={news}
          renderItem={(article, idx) => (
            <details
              key={article.article_id || idx}
              className="collapse bg-base-500 border"
            >
              <summary className="collapse-title font-semibold  bg-gray-50/15 rounded-lg">
                {article.title}
              </summary>
              <div className="collapse-content text-sm pt-3">
                <div className="flex items-center gap-4">
                  {article.description}
                  <Link
                    href={article.link}
                    className="link link-info"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Link
                  </Link>
                </div>
              </div>
            </details>
          )}
        />
      )}
    </div>
  );
};

export default News;
