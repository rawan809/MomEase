import React, { useState, useRef, useEffect } from "react";
import { FiSearch, FiX, FiClock } from "react-icons/fi";
import { Link } from "react-router-dom";
import LoadingState from "../ui/LoadingState";
import EmptyResponse from "../ui/EmptyResponse";
import ArticleSearchCard from "./ArticleSearchCard";

import {
  searchArticles,
  getSearchHistory,
  clearAllSearchHistory,
  deleteTerm,
} from "../../../services/articles";

interface HistoryItem {
  searchId: number;
  searchTerm: string;
  searchedAt: string;
}

interface ArticleResult {
  articleId: number;
  title: string;
  imageUrl: string;
  shortDescription: string;
  categoryName: string;
  categoryId: number;
  readingTimeMinutes: number;
  isSaved: boolean;
}

interface CategoryResult {
  categoryId: number;
  name: string;
  description: string;
  imageUrl: string;
  articlesCount: number;
}

interface SearchData {
  articles: ArticleResult[];
  categories: CategoryResult[];
  articlesCount: number;
  categoriesCount: number;
}

function Search() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [searchData, setSearchData] = useState<SearchData | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── Fetch history when dropdown opens (no query) ──
  useEffect(() => {
    if (isOpen && query.trim() === "") {
      fetchHistory();
    }
  }, [isOpen]);

  const fetchHistory = async () => {
    setHistoryLoading(true);
    try {
      const res = await getSearchHistory();
      setHistory(res.data ?? []);
    } catch {
      setHistory([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (value.trim() === "") {
      setSearchData(null);
      setHasSearched(false);
      fetchHistory();
      return;
    }

    debounceTimer.current = setTimeout(() => {
      runSearch(value.trim());
    }, 500);
  };

  const runSearch = async (term: string) => {
    setIsSearching(true);
    setHasSearched(true);
    try {
      const res = await searchArticles({ query: term });
      setSearchData(res.data ?? null);
    } catch {
      setSearchData(null);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      runSearch(query.trim());
    }
    if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleHistoryClick = (term: string) => {
    setQuery(term);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    runSearch(term);
  };

  const handleClearAll = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await clearAllSearchHistory();
      setHistory([]);
    } catch {
      // silent fail
    }
  };

  const handleDeleteTerm = async (e: React.MouseEvent, term: string) => {
    e.stopPropagation();
    try {
      await deleteTerm(term);
      setHistory((prev) => prev.filter((item) => item.searchTerm !== term));
    } catch {
      // silent fail
    }
  };

  const clearInput = () => {
    setQuery("");
    setSearchData(null);
    setHasSearched(false);
    fetchHistory();
    inputRef.current?.focus();
  };

  const showHistory = query.trim() === "" && !hasSearched;
  const showResults = query.trim() !== "" || hasSearched;

  return (
    <div ref={wrapperRef} className="relative w-full md:w-[55%]">
      {/* ── Input  */}
      <div
        className={`flex items-center gap-2 rounded-xl border-2 px-4 py-2.5 bg-white shadow-sm transition-all duration-200 ${
          isOpen ? "border-primary shadow-md" : "border-accent"
        }`}
      >
        <FiSearch
          className="text-muted shrink-0"
          style={{ fontSize: "1.1rem" }}
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder="Search articles..."
          className="flex-1 outline-none text-sm bg-transparent text-gray-800 placeholder:text-muted"
        />
        {query && (
          <button
            onClick={clearInput}
            className="text-muted hover:text-primary transition-colors cursor-pointer"
          >
            <FiX style={{ fontSize: "1rem" }} />
          </button>
        )}
      </div>

      {/* ── Dropdown Panel  */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-accent z-50 overflow-hidden">
          {/* ── History Panel  */}
          {showHistory && (
            <div className="p-3">
              {historyLoading ? (
                <div className="h-24">
                  <LoadingState />
                </div>
              ) : history.length === 0 ? (
                <div className="h-24">
                  <EmptyResponse title="No search history" />
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-2 px-1">
                    <p className="text-xs font-semibold text-muted uppercase tracking-wide">
                      Recent Searches
                    </p>
                    <button
                      onClick={handleClearAll}
                      className="text-xs text-primary hover:underline cursor-pointer"
                    >
                      Clear all
                    </button>
                  </div>

                  {/* Items */}
                  <ul className="flex flex-col gap-1 max-h-52 overflow-y-auto">
                    {history.map((item) => (
                      <li
                        key={item.searchId}
                        onClick={() => handleHistoryClick(item.searchTerm)}
                        className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg hover:bg-accent cursor-pointer group"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <FiClock className="text-muted shrink-0" />
                          <span className="text-sm text-gray-700 truncate">
                            {item.searchTerm}
                          </span>
                        </div>
                        <button
                          onClick={(e) => handleDeleteTerm(e, item.searchTerm)}
                          className="opacity-0 group-hover:opacity-100 text-muted hover:text-red-500 transition-all cursor-pointer shrink-0"
                        >
                          <FiX style={{ fontSize: "0.85rem" }} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}

          {/* ── Search Results Panel  */}
          {showResults && (
            <div className="p-3 max-h-[70vh] overflow-y-auto">
              {isSearching ? (
                <div className="h-32">
                  <LoadingState />
                </div>
              ) : !searchData ||
                (searchData.articles.length === 0 &&
                  searchData.categories.length === 0) ? (
                <div className="h-32">
                  <EmptyResponse title={`No results for "${query}"`} />
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {/* Categories */}
                  {searchData.categories.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2 px-1">
                        Categories ({searchData.categoriesCount})
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {searchData.categories.map((cat) => (
                          <Link
                            to={`/Articles/:${cat.categoryId}`}
                            key={cat.categoryId}
                            className="px-3 py-1 rounded-full bg-accent text-sm text-gray-700 border border-primary/20"
                          >
                            {cat.name}
                            <span className="ml-1 text-muted text-xs">
                              ({cat.articlesCount})
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Articles */}
                  {searchData.articles.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2 px-1">
                        Articles ({searchData.articlesCount})
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {searchData.articles.map((article) => (
                          <Link to={`/Article/:${article.articleId}`}>
                            {" "}
                            <ArticleSearchCard
                              articleId={article.articleId}
                              title={article.title}
                              imageUrl={article.imageUrl}
                              shortDescription={article.shortDescription}
                              readingTimeMinutes={article.readingTimeMinutes}
                              isSaved={article.isSaved}
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
