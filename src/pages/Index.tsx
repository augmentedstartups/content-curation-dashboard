import { useState } from "react";
import { ArticleCard } from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useArticles } from "@/hooks/useArticles";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, RefreshCw, Trash2, ArrowUpDown, ArrowUp, ArrowDown, ExternalLinkIcon } from "lucide-react";
import { extractSourceFromUrl } from "@/lib/utils";

const Index = () => {
  const { 
    articles, 
    curatedArticles, 
    loading, 
    selectedArticles,
    toggleArticleSelection,
    setCuratedList,
    removeFromCuratedList,
    clearSelection,
    refetch
  } = useArticles();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isCondensed, setIsCondensed] = useState(false);
  const [sortBy, setSortBy] = useState<'index' | 'source'>('index');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const { toast } = useToast();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
      toast({
        title: "Articles refreshed",
        description: "Successfully refreshed articles and curated list.",
      });
    } catch (error) {
      toast({
        title: "Refresh failed",
        description: "Failed to refresh articles. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSort = (field: 'index' | 'source') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getSortIcon = (field: 'index' | 'source') => {
    if (sortBy !== field) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
    return sortOrder === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
  };

  const sortedArticles = [...articles].sort((a, b) => {
    if (sortBy === 'index') {
      const comparison = a.index - b.index;
      return sortOrder === 'asc' ? comparison : -comparison;
    } else {
      const sourceA = extractSourceFromUrl(a.link).toLowerCase();
      const sourceB = extractSourceFromUrl(b.link).toLowerCase();
      const comparison = sourceA.localeCompare(sourceB);
      return sortOrder === 'asc' ? comparison : -comparison;
    }
  });

  const sortedCuratedArticles = [...curatedArticles].sort((a, b) => {
    if (sortBy === 'index') {
      const comparison = a.index - b.index;
      return sortOrder === 'asc' ? comparison : -comparison;
    } else {
      const sourceA = extractSourceFromUrl(a.link).toLowerCase();
      const sourceB = extractSourceFromUrl(b.link).toLowerCase();
      const comparison = sourceA.localeCompare(sourceB);
      return sortOrder === 'asc' ? comparison : -comparison;
    }
  });

  const handleCurateList = async () => {
    setIsProcessing(true);
    const success = await setCuratedList(Array.from(selectedArticles));
    
    if (success) {
      if (selectedArticles.size === 0) {
        toast({
          title: "Curated list cleared!",
          description: "All articles have been removed from your curated list.",
        });
      } else {
        toast({
          title: "Articles curated!",
          description: `Curated list updated with ${selectedArticles.size} article(s).`,
        });
      }
      // Keep articles selected for additional curation
    } else {
      toast({
        title: "Error",
        description: "Failed to update curated list. Please try again.",
        variant: "destructive",
      });
    }
    setIsProcessing(false);
  };

  const handleRemoveFromCurated = async (index: number) => {
    const success = await removeFromCuratedList(index);
    if (success) {
      toast({
        title: "Article removed",
        description: "Article has been removed from your curated list.",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to remove article. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex items-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          <span className="text-muted-foreground">Loading articles...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="h-6 w-auto mb-3"
              />
              <h1 className="text-3xl font-bold text-foreground">Article Curator</h1>
              <p className="text-muted-foreground mt-1">Select and curate articles for your newsletter</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="h-8 w-8 p-0"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Center Curate Button Row */}
        <div className="flex flex-col items-center py-6 border-b border-border mb-8">
          <div className="flex items-center gap-3">
            <Button 
              variant="curate" 
              onClick={handleCurateList}
              disabled={isProcessing}
              className="gap-2"
              size="lg"
            >
              {isProcessing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : null}
              {selectedArticles.size === 0 ? 'Clear Curated List' : 'Update Curated List'}
            </Button>
            {selectedArticles.size > 0 && (
              <Button 
                variant="outline" 
                onClick={clearSelection}
                size="sm"
              >
                Clear Selection
              </Button>
            )}
          </div>
          <span className="text-sm text-muted-foreground mt-2">
            {selectedArticles.size > 0 
              ? `${selectedArticles.size} article${selectedArticles.size !== 1 ? 's' : ''} selected`
              : 'No articles selected - will clear curated list'
            }
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-300px)]">
          {/* Left Side - All Articles */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-foreground">All Articles</h2>
              <Badge variant="secondary">{articles.length}</Badge>
              <div className="flex items-center gap-2">
                <Label htmlFor="condensed-toggle" className="text-sm text-muted-foreground">
                  Condensed
                </Label>
                <Switch
                  id="condensed-toggle"
                  checked={isCondensed}
                  onCheckedChange={setIsCondensed}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('index')}
                  className="gap-2 text-xs"
                >
                  Index {getSortIcon('index')}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('source')}
                  className="gap-2 text-xs"
                >
                  Source {getSortIcon('source')}
                </Button>
              </div>
            </div>

            <div className="space-y-4 h-full overflow-y-auto pr-2">
              {articles.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No articles found</p>
                </div>
              ) : (
                sortedArticles.map((article) => (
                  <ArticleCard
                    key={article.index}
                    article={article}
                    isSelected={selectedArticles.has(article.index)}
                    onSelectionChange={(selected) => toggleArticleSelection(article.index)}
                    condensed={isCondensed}
                  />
                ))
              )}
            </div>
          </div>

          {/* Right Side - Curated Articles */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-foreground">Curated List</h2>
              <Badge variant="default">{curatedArticles.length}</Badge>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('index')}
                  className="gap-2 text-xs"
                >
                  Index {getSortIcon('index')}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('source')}
                  className="gap-2 text-xs"
                >
                  Source {getSortIcon('source')}
                </Button>
              </div>
            </div>

            <div className="space-y-4 h-full overflow-y-auto pr-2">
              {curatedArticles.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
                  <p className="text-muted-foreground">No curated articles yet</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Select articles from the left to add them here
                  </p>
                </div>
              ) : (
                sortedCuratedArticles.map((article) => (
                  <div key={article.index} className="relative group">
                    <ArticleCard
                      article={article}
                      showCheckbox={false}
                      condensed={isCondensed}
                      showExternalLink={false}
                    />
                    <div className="absolute top-4 right-4 flex flex-col gap-1">
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-muted-foreground hover:text-foreground transition-colors bg-background/80 rounded"
                      >
                        <ExternalLinkIcon className="h-4 w-4" />
                      </a>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleRemoveFromCurated(article.index)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
