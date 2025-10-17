import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { BookmarkIcon, ExternalLinkIcon, EyeIcon } from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  url: string;
  source: string;
  thumbnail?: string;
  publishedDate?: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  totalResults: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onViewDetail: (result: SearchResult) => void;
  onSaveResult: (result: SearchResult) => void;
}

const SearchResults = ({
  results = [],
  isLoading = false,
  totalResults = 0,
  currentPage = 1,
  onPageChange = () => {},
  onViewDetail = () => {},
  onSaveResult = () => {},
}: SearchResultsProps) => {
  const resultsPerPage = 10;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  if (isLoading) {
    return (
      <div className="w-full space-y-4 bg-background">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent className="pb-2">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6" />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Skeleton className="h-4 w-1/4" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-background">
        <h3 className="text-xl font-medium mb-2">No results found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search query or filters
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 bg-background">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * resultsPerPage + 1}-
          {Math.min(currentPage * resultsPerPage, totalResults)} of{" "}
          {totalResults} results
        </p>
      </div>

      <div className="space-y-4">
        {results.map((result) => (
          <Card
            key={result.id}
            className="overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="flex">
              {result.thumbnail && (
                <div className="hidden sm:block w-32 h-32 flex-shrink-0">
                  <img
                    src={
                      result.thumbnail ||
                      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&q=80"
                    }
                    alt={result.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium line-clamp-1">
                    {result.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {result.snippet}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between items-center pt-0">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{result.source}</Badge>
                    {result.publishedDate && (
                      <span className="text-xs text-muted-foreground">
                        {result.publishedDate}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onViewDetail(result)}
                      className="flex items-center gap-1"
                    >
                      <EyeIcon className="h-4 w-4" />
                      <span className="sr-only sm:not-sr-only sm:inline-block">
                        View
                      </span>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onSaveResult(result)}
                      className="flex items-center gap-1"
                    >
                      <BookmarkIcon className="h-4 w-4" />
                      <span className="sr-only sm:not-sr-only sm:inline-block">
                        Save
                      </span>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      asChild
                      className="flex items-center gap-1"
                    >
                      <a
                        href={result.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLinkIcon className="h-4 w-4" />
                        <span className="sr-only sm:not-sr-only sm:inline-block">
                          Source
                        </span>
                      </a>
                    </Button>
                  </div>
                </CardFooter>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                className={
                  currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              // Show pages around current page
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    isActive={pageNum === currentPage}
                    onClick={() => onPageChange(pageNum)}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  currentPage < totalPages && onPageChange(currentPage + 1)
                }
                className={
                  currentPage >= totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default SearchResults;
