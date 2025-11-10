import React from 'react';
import { Card, CardContent } from './ui/card';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: string;
}

export function KPICard({ title, value, icon: Icon, trend, color = '#0046FF' }: KPICardProps) {
  return (
    <Card className="border-border">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-[14px] text-muted-foreground mb-2">{title}</p>
            <h3 className="text-[32px] font-bold" style={{ color }}>{value}</h3>
            {trend && (
              <p className={`text-[14px] mt-2 ${trend.isPositive ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                {trend.isPositive ? '↑' : '↓'} {trend.value}
              </p>
            )}
          </div>
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon className="w-6 h-6" style={{ color }} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
