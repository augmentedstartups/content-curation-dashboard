import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Article } from "@/types/article";

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [curatedArticles, setCuratedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticles, setSelectedArticles] = useState<Set<number>>(new Set());

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('n8nnewssummerizer')
        .select('*')
        .order('index', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const fetchCuratedArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('curated_list')
        .select('*')
        .order('index', { ascending: false });

      if (error) throw error;
      setCuratedArticles(data || []);
    } catch (error) {
      console.error('Error fetching curated articles:', error);
    }
  };

  const addToCuratedList = async (selectedIndices: number[]) => {
    try {
      const articlesToAdd = articles.filter(article => 
        selectedIndices.includes(article.index)
      );

      // Remove the index field since it will be auto-generated
      const articlesWithoutIndex = articlesToAdd.map(({ index, ...article }) => article);

      const { error } = await supabase
        .from('curated_list')
        .insert(articlesWithoutIndex);

      if (error) throw error;
      
      // Refresh curated articles
      await fetchCuratedArticles();
      return true;
    } catch (error) {
      console.error('Error adding to curated list:', error);
      return false;
    }
  };

  const removeFromCuratedList = async (index: number) => {
    try {
      const { error } = await supabase
        .from('curated_list')
        .delete()
        .eq('index', index);

      if (error) throw error;
      
      // Refresh curated articles
      await fetchCuratedArticles();
      return true;
    } catch (error) {
      console.error('Error removing from curated list:', error);
      return false;
    }
  };

  const toggleArticleSelection = (index: number) => {
    setSelectedArticles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const clearSelection = () => {
    setSelectedArticles(new Set());
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchArticles(), fetchCuratedArticles()]);
      setLoading(false);
    };

    loadData();
  }, []);

  return {
    articles,
    curatedArticles,
    loading,
    selectedArticles,
    toggleArticleSelection,
    addToCuratedList,
    removeFromCuratedList,
    clearSelection,
    refetch: async () => {
      await Promise.all([fetchArticles(), fetchCuratedArticles()]);
    }
  };
};