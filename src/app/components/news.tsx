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

  useEffect(() => {
    fetchNews();
  }, [countryCode]);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {countryCode && (
        <Card
          title={`Latest News From ${countryCode || news[0].country}`}
          data={news}
          onRefresh={fetchNews}
          renderItem={(article, idx) => (
            <details
              key={article.article_id || idx}
              className="collapse bg-base-500 border border-gray-50/30 shadow-lg"
            >
              <summary className="collapse-title font-semibold p-4 bg-gray-50/15 rounded-lg hover:bg-gray-50/20 transition-all duration-300">
                {/* on mobile screens there should be row layout image on 1st row and other info on the second row */}
                <div className="flex flex-col [@media(min-width:400px)]:flex-row sm:grid sm:grid-cols-[120px_1fr] md:grid-cols-[100px_1fr] lg:grid-cols-[120px_1fr] gap-4 items-start">
                  <img
                    src={article.image_url}
                    className="w-full max-w-[200px] [@media(min-width:400px)]:w-24 [@media(min-width:400px)]:h-24 h-16 sm:h-16 md:h-16 lg:h-20 object-cover rounded mx-auto sm:mx-0"
                    alt="News Image"
                    loading="lazy"
                  />
                  <div className="flex flex-col justify-start w-full">
                    <div className="flex flex-row gap-1.5 items-center">
                      <img
                        src={article.source_icon}
                        alt={article.source_name}
                        className="w-6 h-auto"
                      />{" "}
                      <small className="text-gray-300">
                        {article.source_name}
                      </small>{" "}
                    </div>
                    <div className="">
                      <h4 className="font-medium text-sm sm:text-base">{article.title}</h4>
                      <small className="text-gray-400 text-xs">{article.pubDate}</small>
                    </div>
                  </div>
                </div>
                {/*  */}
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
                    Read-the-article
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
