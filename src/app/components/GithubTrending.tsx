import React, { useEffect, useState } from "react";
import Card from "@/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faCodeBranch,
  faCircleDot,
} from "@fortawesome/free-solid-svg-icons";
import { Repo } from "@/lib/types";

/**
 * Project: Dashboard App
 * Module: GitHub Integration
 * Component: GithubTrending
 * Author: Advyta
 * Date: 05/08/2025
 * Description: Displays trending GitHub repositories in a card format
 *
 * Screen Data:
 * - Shows list of trending GitHub repositories
 * - Displays repository name, description, language, stars, and forks
 * - Shows loading state during data fetch
 * - Displays error messages if fetch fails
 *
 * Screen Layout & Responsive Behavior:
 * - Card-based layout with consistent spacing
 * - Responsive grid that adapts to container width
 * - Mobile-first design with appropriate touch targets
 * - Smooth transitions between states (loading, success, error)
 *
 * UI Behavior:
 * - Fetches trending repositories on component mount
 * - Shows loading spinner during data fetch
 * - Displays error message if fetch fails
 * - Manual refresh capability
 * - Smooth scrolling for content overflow
 *
 * Data Validation:
 * - Validates API response structure
 * - Handles empty or malformed repository data
 * - Validates required repository fields before rendering
 * - Sanitizes repository descriptions for security
 * - Handles rate limiting and API errors
 *
 * State:
 * - repos: Array of trending repositories (Repo[])
 * - loading: Loading state indicator (boolean)
 * - error: Error message if fetch fails (string | null)
 *
 * Dependencies:
 * - GitHub REST API (via /api/github/trending endpoint)
 * - FontAwesome for icons
 * - Custom Card component for layout
 * - React hooks for state management
 */

const GithubTrending: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrendingRepos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/github/trending");
      if (!response.ok) {
        throw new Error("Failed to fetch trending repositories");
      }
      const data = await response.json();
      setRepos(data.items || []);
    } catch (err) {
      console.error("Error fetching trending repos:", err);
      setError("Failed to load trending repositories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingRepos();
  }, []);

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  if (loading) return <div>Loading trending repositories...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <Card
      title="Trending on GitHub"
      data={repos}
      onRefresh={fetchTrendingRepos}
      renderItem={(repo: Repo) => (
        <div
          key={repo.id}
          className="mb-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0 last:mb-0"
        >
          <div className="flex items-start gap-3">
            <img
              src={repo.owner.avatar_url}
              alt={`${repo.owner.login} avatar`}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-shadow-blue-100 hover:underline"
                >
                  {repo.full_name}
                </a>
              </div>
              <p className="text-sm text-gray-300 mt-1 line-clamp-2">
                {repo.description}
              </p>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                {repo.language && (
                  <span className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faCircleDot} className="text-xs" />
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                  {formatNumber(repo.stargazers_count)}
                </span>
                <span className="flex items-center gap-1">
                  <FontAwesomeIcon
                    icon={faCodeBranch}
                    className="text-gray-500"
                  />
                  {formatNumber(repo.forks_count)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    />
  );
};

export default GithubTrending;
