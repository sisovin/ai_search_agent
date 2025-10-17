import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import AuthForm from "./AuthForm";
import SearchInterface from "./SearchInterface";

interface HomeProps {
  isAuthenticated?: boolean;
  onSignOut?: () => void;
}

const Home = ({ isAuthenticated = false, onSignOut = () => {} }: HomeProps) => {
  const [authenticated, setAuthenticated] = useState(isAuthenticated);

  // Simulate authentication check
  useEffect(() => {
    // In a real app, you would check authentication status here
    setAuthenticated(isAuthenticated);
  }, [isAuthenticated]);

  const handleSignOut = () => {
    setAuthenticated(false);
    onSignOut();
  };

  const handleSuccessfulAuth = () => {
    setAuthenticated(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border p-4 flex justify-between items-center bg-card">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-primary"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <h1 className="text-xl font-bold">AI Search Agent</h1>
        </div>

        {authenticated && (
          <button
            onClick={handleSignOut}
            className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
          >
            Sign Out
          </button>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 flex items-center justify-center">
        <Card className="w-full max-w-6xl p-6 shadow-lg bg-card">
          {authenticated ? (
            <SearchInterface />
          ) : (
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-semibold mb-6">
                Welcome to AI Search Agent
              </h2>
              <p className="text-muted-foreground mb-8 text-center max-w-md">
                Sign in to access powerful AI-powered search capabilities using
                the Exa API.
              </p>
              <AuthForm onSuccessfulAuth={handleSuccessfulAuth} />
            </div>
          )}
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-border p-4 text-center text-sm text-muted-foreground bg-card">
        <p>
          © {new Date().getFullYear()} AI Search Agent. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
