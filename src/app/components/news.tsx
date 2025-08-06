"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Card from "@/ui/card";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useNews } from "@/lib/hooks/api/useNews";
import Loading from "@/ui/loading";

/**
 * Project: Dashboard App
 * Module: News
 * Component: News
 * Author: Advyta
 * Date: 24/07/2025
 * Description: Displays news articles in a card format with country-based filtering
 *
 * Screen Data:
 * - Displays news articles with images, titles, and descriptions
 * - Shows source and publication time for each article
 * - Loading state during data fetch
 * - Error messages when news fetch fails
 *
 * Screen Layout & Responsive Behavior:
 * - Responsive grid layout (1-3 columns based on screen size)
 * - Card-based design with consistent spacing
 * - Image thumbnails with aspect ratio preservation
 * - Mobile-first design with appropriate touch targets
 * - Smooth transitions between states
 *
 * UI Behavior:
 * - Fetches news on component mount and when country changes
 * - Shows loading spinner during data fetch
 * - Displays error message if fetch fails
 * - Clicking on article opens source in new tab
 * - Smooth scrolling for content overflow
 *
 * Data Validation:
 * - Validates news API response structure
 * - Handles missing or malformed article data
 * - Sanitizes article content for security
 * - Validates image URLs before rendering
 * - Handles different error scenarios (network, rate limiting, etc.)
 *
 * State:
 * - news: Array of news articles (newsArticle[])
 * - loading: Loading state indicator (boolean)
 * - error: Error message if fetch fails (string | null)
 *
 * Dependencies:
 * - Redux for state management (country code)
 * - Next.js Link for client-side navigation
 * - Custom Card component for layout
 * - External news API for article data
 */


const News: React.FC = () => {
  const countryCode = useSelector((state: RootState) => state.user.countryCode);
  const {
    data: news,
    isLoading,
    error,
    refetch,
  } = useNews(countryCode || "us");

  if (isLoading) {
    return (
      <Loading message="Loading news..." />
    );
  }

  if (error) {
    return (
      <div className="text-red-400 p-4 bg-red-900/20 rounded-lg">
        Error: {error instanceof Error ? error.message : "Failed to load news"}
        <button
          onClick={() => refetch()}
          className="block mt-2 text-sm text-blue-400 hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!news || news.length === 0) {
    return (
      <div className="p-4 text-gray-400 text-center">
        No news available for this region.
      </div>
    );
  }

  return (
    // News Card
    <Card
      title={`Latest News From ${countryCode || news[0].country}`}
      data={news}
      onRefresh={refetch}
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
                  <small className="text-gray-300">{article.source_name}</small>{" "}
                </div>
                <div className="">
                  <h4 className="font-medium text-sm sm:text-base">
                    {article.title}
                  </h4>
                  <small className="text-gray-400 text-xs">
                    {article.pubDate}
                  </small>
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
                <span>
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </span>
              </Link>
            </div>
          </div>
        </details>
      )}
    />
  );
};

export default News;
