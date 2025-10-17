import React, { useState } from "react";
import { Search, Filter, X, SlidersHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SearchResults from "./SearchResults";

interface SearchInterfaceProps {
  onSearch?: (query: string, filters: SearchFilters) => void;
  isLoading?: boolean;
  results?: SearchResult[];
}

interface SearchFilters {
  sources: string[];
  dateRange: string;
  contentType: string[];
  relevance: number;
  exactMatch: boolean;
}

interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  url: string;
  source: string;
  date: string;
  thumbnail?: string;
}

const SearchInterface: React.FC<SearchInterfaceProps> = ({
  onSearch = () => {},
  isLoading = false,
  results = [
    {
      id: "1",
      title: "Understanding Machine Learning Algorithms",
      snippet:
        "A comprehensive guide to the most popular machine learning algorithms and their applications in various industries.",
      url: "https://example.com/ml-algorithms",
      source: "AI Research Journal",
      date: "2023-05-15",
      thumbnail:
        "https://images.unsplash.com/photo-1677442135136-760c813dce95?w=400&q=80",
    },
    {
      id: "2",
      title: "The Future of Natural Language Processing",
      snippet:
        "Exploring the latest advancements in NLP and how they are transforming human-computer interaction.",
      url: "https://example.com/nlp-future",
      source: "Tech Insights",
      date: "2023-06-22",
      thumbnail:
        "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=400&q=80",
    },
    {
      id: "3",
      title: "Deep Learning Frameworks Comparison",
      snippet:
        "An in-depth analysis of popular deep learning frameworks including TensorFlow, PyTorch, and JAX.",
      url: "https://example.com/dl-frameworks",
      source: "Developer Weekly",
      date: "2023-04-10",
    },
  ],
}) => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    sources: [],
    dateRange: "anytime",
    contentType: [],
    relevance: 75,
    exactMatch: false,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, filters);
  };

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleSource = (source: string) => {
    setFilters((prev) => {
      const sources = prev.sources.includes(source)
        ? prev.sources.filter((s) => s !== source)
        : [...prev.sources, source];
      return { ...prev, sources };
    });
  };

  const toggleContentType = (type: string) => {
    setFilters((prev) => {
      const contentType = prev.contentType.includes(type)
        ? prev.contentType.filter((t) => t !== type)
        : [...prev.contentType, type];
      return { ...prev, contentType };
    });
  };

  const clearFilters = () => {
    setFilters({
      sources: [],
      dateRange: "anytime",
      contentType: [],
      relevance: 75,
      exactMatch: false,
    });
  };

  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-background">
      {/* Search Header */}
      <div className="sticky top-0 z-10 w-full bg-background border-b p-4">
        <form
          onSubmit={handleSearch}
          className="flex items-center gap-2 max-w-4xl mx-auto"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search for anything..."
              className="pl-10 pr-4 h-12"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Sheet open={showFilters} onOpenChange={setShowFilters}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                type="button"
                className="h-12 w-12 md:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="py-6">
                <h3 className="text-lg font-medium mb-5">Filters</h3>
                <MobileFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onToggleSource={toggleSource}
                  onToggleContentType={toggleContentType}
                  onClearFilters={clearFilters}
                />
              </div>
            </SheetContent>
          </Sheet>
          <Button type="submit" className="h-12 px-6">
            Search
          </Button>
        </form>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Filters Sidebar (Desktop) */}
        <div className="hidden md:block w-64 lg:w-72 border-r p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Filters</h3>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear all
            </Button>
          </div>
          <DesktopFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onToggleSource={toggleSource}
            onToggleContentType={toggleContentType}
          />
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-4">
            <div className="mb-4">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="flex items-center justify-between">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="articles">Articles</TabsTrigger>
                    <TabsTrigger value="research">Research</TabsTrigger>
                    <TabsTrigger value="news">News</TabsTrigger>
                  </TabsList>
                  <div className="text-sm text-muted-foreground">
                    {results.length} results
                  </div>
                </div>
              </Tabs>
            </div>

            {/* Applied Filters */}
            {(filters.sources.length > 0 ||
              filters.contentType.length > 0 ||
              filters.dateRange !== "anytime" ||
              filters.exactMatch) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {filters.sources.map((source) => (
                  <Badge
                    key={source}
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    {source}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => toggleSource(source)}
                    />
                  </Badge>
                ))}
                {filters.contentType.map((type) => (
                  <Badge
                    key={type}
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    {type}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => toggleContentType(type)}
                    />
                  </Badge>
                ))}
                {filters.dateRange !== "anytime" && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    {filters.dateRange}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleFilterChange("dateRange", "anytime")}
                    />
                  </Badge>
                )}
                {filters.exactMatch && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    Exact match
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleFilterChange("exactMatch", false)}
                    />
                  </Badge>
                )}
              </div>
            )}

            {/* Search Results */}
            <SearchResults results={results} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

interface FiltersProps {
  filters: SearchFilters;
  onFilterChange: (key: keyof SearchFilters, value: any) => void;
  onToggleSource: (source: string) => void;
  onToggleContentType: (type: string) => void;
  onClearFilters?: () => void;
}

const DesktopFilters: React.FC<FiltersProps> = ({
  filters,
  onFilterChange,
  onToggleSource,
  onToggleContentType,
}) => {
  const sources = [
    "Academic Journals",
    "News Sites",
    "Research Papers",
    "Blogs",
    "Books",
  ];
  const contentTypes = [
    "Articles",
    "PDFs",
    "Videos",
    "Presentations",
    "Datasets",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Sources</h4>
        <div className="space-y-2">
          {sources.map((source) => (
            <div key={source} className="flex items-center space-x-2">
              <Checkbox
                id={`source-${source}`}
                checked={filters.sources.includes(source)}
                onCheckedChange={() => onToggleSource(source)}
              />
              <Label htmlFor={`source-${source}`} className="text-sm">
                {source}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="text-sm font-medium mb-3">Date Range</h4>
        <Select
          value={filters.dateRange}
          onValueChange={(value) => onFilterChange("dateRange", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="anytime">Anytime</SelectItem>
            <SelectItem value="past-24h">Past 24 hours</SelectItem>
            <SelectItem value="past-week">Past week</SelectItem>
            <SelectItem value="past-month">Past month</SelectItem>
            <SelectItem value="past-year">Past year</SelectItem>
            <SelectItem value="custom">Custom range</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div>
        <h4 className="text-sm font-medium mb-3">Content Type</h4>
        <div className="space-y-2">
          {contentTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${type}`}
                checked={filters.contentType.includes(type)}
                onCheckedChange={() => onToggleContentType(type)}
              />
              <Label htmlFor={`type-${type}`} className="text-sm">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium">Relevance</h4>
          <span className="text-xs text-muted-foreground">
            {filters.relevance}%
          </span>
        </div>
        <Slider
          value={[filters.relevance]}
          min={0}
          max={100}
          step={5}
          onValueChange={(value) => onFilterChange("relevance", value[0])}
          className="mb-6"
        />
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <Label htmlFor="exact-match" className="text-sm font-medium">
          Exact Match
        </Label>
        <Switch
          id="exact-match"
          checked={filters.exactMatch}
          onCheckedChange={(checked) => onFilterChange("exactMatch", checked)}
        />
      </div>
    </div>
  );
};

const MobileFilters: React.FC<FiltersProps> = ({
  filters,
  onFilterChange,
  onToggleSource,
  onToggleContentType,
  onClearFilters,
}) => {
  return (
    <div className="space-y-6">
      <DesktopFilters
        filters={filters}
        onFilterChange={onFilterChange}
        onToggleSource={onToggleSource}
        onToggleContentType={onToggleContentType}
      />

      <div className="pt-4">
        <Button className="w-full" onClick={onClearFilters}>
          Clear All Filters
        </Button>
      </div>
    </div>
  );
};

export default SearchInterface;
