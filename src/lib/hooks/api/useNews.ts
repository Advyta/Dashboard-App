import { useQuery } from '@tanstack/react-query';
import { newsArticle } from '@/lib/types';

export function useNews(countryCode?: string) {
  return useQuery<newsArticle[]>({
    queryKey: ['news', countryCode],
    queryFn: async () => {
      const response = await fetch(`/api/users/news?country=${countryCode}`);
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      return response.json();
    },
    enabled: !!countryCode, // Only run the query if countryCode is available
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}
