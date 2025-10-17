import React, { useState } from "react";
import { ArrowLeft, Bookmark, Share2, ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ResultDetailProps {
  result?: {
    id: string;
    title: string;
    url: string;
    content: string;
    snippet: string;
    source: string;
    publishedDate?: string;
    author?: string;
    imageUrl?: string;
    tags?: string[];
    relatedContent?: Array<{
      id: string;
      title: string;
      url: string;
      snippet: string;
    }>;
  };
  onBack?: () => void;
  onSave?: (resultId: string) => void;
}

const ResultDetail = ({
  result = {
    id: "1",
    title: "Understanding Machine Learning Algorithms",
    url: "https://example.com/machine-learning",
    content:
      'Machine learning is a branch of artificial intelligence (AI) and computer science which focuses on the use of data and algorithms to imitate the way that humans learn, gradually improving its accuracy. Machine learning algorithms build a model based on sample data, known as "training data", in order to make predictions or decisions without being explicitly programmed to do so.',
    snippet:
      "An overview of machine learning algorithms and their applications in modern technology.",
    source: "AI Research Journal",
    publishedDate: "2023-05-15",
    author: "Dr. Jane Smith",
    imageUrl:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    tags: ["Machine Learning", "AI", "Data Science", "Algorithms"],
    relatedContent: [
      {
        id: "2",
        title: "Deep Learning Fundamentals",
        url: "https://example.com/deep-learning",
        snippet:
          "An introduction to neural networks and deep learning concepts.",
      },
      {
        id: "3",
        title: "Natural Language Processing Techniques",
        url: "https://example.com/nlp",
        snippet: "How computers understand and process human language.",
      },
      {
        id: "4",
        title: "Computer Vision Applications",
        url: "https://example.com/computer-vision",
        snippet: "How AI systems interpret and understand visual information.",
      },
    ],
  },
  onBack = () => {},
  onSave = () => {},
}: ResultDetailProps) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    onSave(result.id);
    setIsSaved(!isSaved);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-background p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to results
        </Button>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSave}
            className={isSaved ? "bg-primary/10" : ""}
          >
            <Bookmark
              className="h-4 w-4 mr-2"
              fill={isSaved ? "currentColor" : "none"}
            />
            {isSaved ? "Saved" : "Save"}
          </Button>

          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>

          <Button variant="outline" size="sm" asChild>
            <a href={result.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit
            </a>
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <h1 className="text-2xl font-bold">{result.title}</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            {result.tags?.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent>
          {result.imageUrl && (
            <div className="mb-4 overflow-hidden rounded-md">
              <img
                src={result.imageUrl}
                alt={result.title}
                className="w-full h-auto object-cover max-h-80"
              />
            </div>
          )}

          <div className="flex flex-col md:flex-row text-sm text-muted-foreground mb-4 gap-4">
            <div className="flex items-center">
              <span className="font-medium mr-2">Source:</span> {result.source}
            </div>
            {result.publishedDate && (
              <div className="flex items-center">
                <span className="font-medium mr-2">Published:</span>{" "}
                {result.publishedDate}
              </div>
            )}
            {result.author && (
              <div className="flex items-center">
                <span className="font-medium mr-2">Author:</span>{" "}
                {result.author}
              </div>
            )}
          </div>

          <Tabs defaultValue="content" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="content">Full Content</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="prose max-w-none">
              <p className="whitespace-pre-line">{result.content}</p>
            </TabsContent>

            <TabsContent value="summary">
              <p className="text-muted-foreground">{result.snippet}</p>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="flex justify-between pt-2">
          <div className="text-sm text-muted-foreground">
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-1"
            >
              {result.url.length > 50
                ? `${result.url.substring(0, 50)}...`
                : result.url}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </CardFooter>
      </Card>

      {result.relatedContent && result.relatedContent.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Related Content</h2>
          <Separator className="mb-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.relatedContent.map((item) => (
              <Card key={item.id} className="h-full">
                <CardHeader className="pb-2">
                  <h3 className="text-lg font-medium">{item.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {item.snippet}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="ml-auto" asChild>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultDetail;
