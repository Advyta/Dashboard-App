import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Repo } from '@/lib/types';

interface GithubTrendingResponse {
  items: Repo[];
  total_count: number;
  incomplete_results: boolean;
}

/**
 * Custom hook to fetch trending GitHub repositories
 * @param options Optional query options
 * @returns Query result with trending repositories
 */
export function useGithubTrending(
  options?: Omit<UseQueryOptions<Repo[], Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<Repo[], Error>({
    queryKey: ['github', 'trending'],
    queryFn: async (): Promise<Repo[]> => {
      try {
        const response = await fetch('/api/github/trending');
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || 'Failed to fetch trending repositories'
          );
        }

        const data: GithubTrendingResponse = await response.json();
        return data.items || [];
      } catch (error) {
        console.error('Error fetching trending repositories:', error);
        throw error;
      }
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
    retry: 1,
    refetchOnWindowFocus: false,
    ...options,
  });
}
