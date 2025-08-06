import { Article } from "@/types/article";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon, ExternalLinkIcon } from "lucide-react";

interface ArticleCardProps {
  article: Article;
  isSelected?: boolean;
  onSelectionChange?: (selected: boolean) => void;
  showCheckbox?: boolean;
  condensed?: boolean;
}

export const ArticleCard = ({ 
  article, 
  isSelected = false, 
  onSelectionChange, 
  showCheckbox = true,
  condensed = false
}: ArticleCardProps) => {
  return (
    <Card className={`group p-6 transition-all duration-200 hover:shadow-md border ${
      isSelected ? 'border-selection bg-selection/5' : 'border-border'
    }`}>
      <div className="flex gap-4">
        {showCheckbox && (
          <Checkbox
            checked={isSelected}
            onCheckedChange={onSelectionChange}
            className="mt-1 data-[state=checked]:bg-curate data-[state=checked]:border-curate"
          />
        )}
        
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-semibold text-foreground leading-6 line-clamp-2">
              {article.title || "Untitled Article"}
            </h3>
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 p-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLinkIcon className="h-4 w-4" />
            </a>
          </div>

          {!condensed && article.content_snippet && (
            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
              {article.content_snippet}
            </p>
          )}

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {article.source && (
              <span className="font-medium">{article.source}</span>
            )}
            {article.pub_date && (
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-3 w-3" />
                {new Date(article.pub_date).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};