"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type StatItem = {
  label: string;
  value: string | number;
  color?: string;
  icon?: React.ReactNode;
};

interface StatsCardProps {
  title: string;
  description?: string;
  items: StatItem[];
  isLoading?: boolean;
  emptyMessage?: string;
  isEmpty?: boolean;
}

export default function StatsCard({ 
  title, 
  description,
  items,
  isLoading = false,
  emptyMessage = "No data available",
  isEmpty = false
}: StatsCardProps) {
  return (
    <Card className="overflow-hidden border-border/40 h-full">
      <CardHeader className="pb-2 space-y-1">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        {description && <CardDescription className="text-muted-foreground/80">{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="py-6 text-center animate-pulse space-y-3">
            <div className="w-12 h-12 rounded-full border-2 border-t-primary bg-muted mx-auto border-muted animate-spin"></div>
            <p className="text-sm text-muted-foreground">Loading data...</p>
          </div>
        ) : isEmpty ? (
          <div className="py-8 text-center text-muted-foreground flex flex-col items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="mb-2 text-muted-foreground/60"
            >
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 16h5v5" />
            </svg>
            <p className="text-sm">{emptyMessage}</p>
          </div>
        ) : (
          <div className="space-y-3 pt-1">
            {items.map((item, index) => (
              <div key={index} className="flex justify-between items-center group hover:bg-muted/30 px-2 py-1.5 -mx-2 rounded-md transition-colors">
                <div className="flex items-center gap-2">
                  {item.icon && <span className="text-muted-foreground/70">{item.icon}</span>}
                  <span className="text-sm">{item.label}</span>
                </div>
                <span className={`font-medium text-sm px-2 py-0.5 rounded-full ${item.color || 'text-foreground'}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 
