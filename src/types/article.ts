export interface Article {
  index: number;
  link: string;
  content?: string;
  pub_date?: string;
  content_snippet?: string;
  img_url?: string;
  source?: string;
  guid?: string;
  title?: string;
  should_draft_article?: boolean;
}