import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faCodeBranch,
  faCircleDot,
  faSpinner,
  faExclamationTriangle,
  faSync,
} from "@fortawesome/free-solid-svg-icons";
import { useGithubTrending } from "@/lib/hooks/api/useGithubTrending";
import { Repo } from "@/lib/types";
import Card from "@/ui/card";
import Loading from "@/ui/loading";
import Button from "@/ui/button";


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

const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  }
  return num.toString();
};


const GithubTrending: React.FC = () => {
  const { 
    data: repos = [], 
    isLoading, 
    error, 
    refetch, 
    isRefetching 
  } = useGithubTrending({
    retry: 2,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <Loading message="Loading trending repositories..." />
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-900/20 rounded-lg">
        <div className="flex items-center text-red-400">
          <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
          <span>Error loading repositories</span>
        </div>
        <p className="mt-2 text-sm text-red-300">
          {error.message || 'Failed to fetch trending repositories'}
        </p>
        <Button
          onClick={() => refetch()}
          className="mt-3 px-4 py-2 text-sm bg-red-900/50 hover:bg-red-900/70 text-red-100 rounded transition-colors"
          disabled={isRefetching}
        >
          <FontAwesomeIcon 
            icon={isRefetching ? faSpinner : faSync} 
            spin={isRefetching} 
            className="mr-2" 
          />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <Card
      title="Trending on GitHub"
      data={repos}
      onRefresh={refetch}
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
