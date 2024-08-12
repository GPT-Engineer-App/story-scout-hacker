import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ExternalLink } from "lucide-react";

const fetchStories = async () => {
  const response = await axios.get(
    "https://hn.algolia.com/api/v1/search_by_date?tags=story&hitsPerPage=50"
  );
  return response.data.hits;
};

const Index = () => {
  const { data: stories, isLoading, isError } = useQuery({
    queryKey: ["stories"],
    queryFn: fetchStories,
  });

  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  if (isError) return <div className="text-center mt-8">Error fetching stories</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Hacker News - Latest 50 Stories</h1>
      <div className="max-w-4xl mx-auto">
        {stories.map((story) => (
          <div key={story.objectID} className="bg-white rounded-lg shadow-md p-6 mb-4">
            <h2 className="text-xl font-semibold mb-2">
              <a
                href={story.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {story.title}
              </a>
            </h2>
            <div className="flex items-center text-sm text-gray-600">
              <span>{story.points} points</span>
              <span className="mx-2">•</span>
              <span>by {story.author}</span>
              <span className="mx-2">•</span>
              <span>{new Date(story.created_at).toLocaleString()}</span>
            </div>
            <div className="mt-2">
              <a
                href={`https://news.ycombinator.com/item?id=${story.objectID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                View on Hacker News
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
