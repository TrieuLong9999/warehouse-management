import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Edit, Trash2, Eye, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export interface Column {
  key: string;
  label: string;
  width?: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  onView?: (row: any) => void;
  showActions?: boolean;
  customActions?: (row: any) => React.ReactNode;
}

export function DataTable({ 
  columns, 
  data, 
  onEdit, 
  onDelete, 
  onView,
  showActions = true,
  customActions
}: DataTableProps) {
  return (
    <div className="border border-border rounded-lg overflow-hidden bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#0046FF] hover:bg-[#0046FF]">
            {columns.map((column) => (
              <TableHead 
                key={column.key} 
                className="text-white"
                style={{ width: column.width }}
              >
                {column.label}
              </TableHead>
            ))}
            {showActions && (
              <TableHead className="text-white text-center" style={{ width: customActions ? '180px' : '100px' }}>
                Thao tác
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell 
                colSpan={columns.length + (showActions ? 1 : 0)} 
                className="text-center py-8 text-muted-foreground"
              >
                Không có dữ liệu
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => (
              <TableRow key={index} className="hover:bg-muted/50">
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </TableCell>
                ))}
                {showActions && (
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      {customActions && customActions(row)}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {onView && (
                            <DropdownMenuItem onClick={() => onView(row)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Xem chi tiết
                            </DropdownMenuItem>
                          )}
                          {onEdit && (
                            <DropdownMenuItem onClick={() => onEdit(row)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Chỉnh sửa
                            </DropdownMenuItem>
                          )}
                          {onDelete && (
                            <DropdownMenuItem 
                              onClick={() => onDelete(row)}
                              className="text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Xóa
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export function StatusBadge({ status, type = 'default' }: { status: string; type?: string }) {
  const variants: Record<string, { bg: string; text: string }> = {
    active: { bg: '#10b981', text: '#ffffff' },
    inactive: { bg: '#6b7280', text: '#ffffff' },
    pending: { bg: '#f59e0b', text: '#ffffff' },
    completed: { bg: '#10b981', text: '#ffffff' },
    cancelled: { bg: '#ef4444', text: '#ffffff' },
    draft: { bg: '#6b7280', text: '#ffffff' },
    confirmed: { bg: '#0046FF', text: '#ffffff' },
    processing: { bg: '#008CFF', text: '#ffffff' },
    overdue: { bg: '#ef4444', text: '#ffffff' },
  };

  const variant = variants[type] || { bg: '#6b7280', text: '#ffffff' };

  return (
    <Badge 
      style={{ 
        backgroundColor: variant.bg, 
        color: variant.text 
      }}
      className="text-[12px] px-2 py-1"
    >
      {status}
    </Badge>
  );
}
