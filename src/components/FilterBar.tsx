import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, X } from 'lucide-react';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterConfig {
  type: 'text' | 'select' | 'date' | 'daterange';
  label: string;
  placeholder?: string;
  options?: FilterOption[];
  value?: any;
  onChange?: (value: any) => void;
}

interface FilterBarProps {
  filters: Record<string, FilterConfig>;
  onSearch?: () => void;
  onReset?: () => void;
}

export function FilterBar({ filters, onSearch, onReset }: FilterBarProps) {
  return (
    <div className="bg-white p-4 rounded-lg border border-border mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(filters).map(([key, config]) => (
          <div key={key} className="space-y-2">
            <label className="text-[14px] text-foreground">{config.label}</label>
            {config.type === 'text' && (
              <Input
                placeholder={config.placeholder}
                value={config.value || ''}
                onChange={(e) => config.onChange?.(e.target.value)}
                className="bg-input-background"
              />
            )}
            {config.type === 'select' && (
              <Select value={config.value} onValueChange={config.onChange}>
                <SelectTrigger className="bg-input-background">
                  <SelectValue placeholder={config.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {config.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {config.type === 'date' && (
              <Input
                type="date"
                placeholder={config.placeholder}
                value={config.value || ''}
                onChange={(e) => config.onChange?.(e.target.value)}
                className="bg-input-background"
              />
            )}
          </div>
        ))}
      </div>
      
      <div className="flex gap-2 mt-4">
        <Button onClick={onSearch} className="bg-[#0046FF] hover:bg-[#003ACC] text-white">
          <Search className="mr-2 h-4 w-4" />
          Tìm kiếm
        </Button>
        <Button onClick={onReset} variant="outline">
          <X className="mr-2 h-4 w-4" />
          Xóa bộ lọc
        </Button>
      </div>
    </div>
  );
}
