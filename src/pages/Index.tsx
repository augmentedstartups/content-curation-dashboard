import { useState } from "react";
import { ArticleCard } from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useArticles } from "@/hooks/useArticles";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, RefreshCw, Trash2 } from "lucide-react";

const Index = () => {
  const { 
    articles, 
    curatedArticles, 
    loading, 
    selectedArticles,
    toggleArticleSelection,
    addToCuratedList,
    removeFromCuratedList,
    clearSelection,
    refetch
  } = useArticles();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCondensed, setIsCondensed] = useState(false);
  const { toast } = useToast();

  const handleCurateList = async () => {
    if (selectedArticles.size === 0) {
      toast({
        title: "No articles selected",
        description: "Please select articles to add to your curated list.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    const success = await addToCuratedList(Array.from(selectedArticles));
    
    if (success) {
      toast({
        title: "Articles curated!",
        description: `Added ${selectedArticles.size} article(s) to your curated list.`,
      });
      clearSelection();
    } else {
      toast({
        title: "Error",
        description: "Failed to add articles to curated list. Please try again.",
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
              <h1 className="text-3xl font-bold text-foreground">Article Curator</h1>
              <p className="text-muted-foreground mt-1">Select and curate articles for your newsletter</p>
            </div>
            <Button
              variant="outline"
              onClick={refetch}
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
          {/* Left Side - All Articles */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
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
              </div>
              {selectedArticles.size > 0 && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">
                    {selectedArticles.size} selected
                  </span>
                  <Button 
                    variant="curate" 
                    onClick={handleCurateList}
                    disabled={isProcessing}
                    className="gap-2"
                  >
                    {isProcessing ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : null}
                    Curate List
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-4 h-full overflow-y-auto pr-2">
              {articles.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No articles found</p>
                </div>
              ) : (
                articles.map((article) => (
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

          {/* Separator */}
          <Separator orientation="vertical" className="hidden lg:block" />

          {/* Right Side - Curated Articles */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-foreground">Curated List</h2>
              <Badge variant="default">{curatedArticles.length}</Badge>
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
                curatedArticles.map((article) => (
                  <div key={article.index} className="relative group">
                    <ArticleCard
                      article={article}
                      showCheckbox={false}
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveFromCurated(article.index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
