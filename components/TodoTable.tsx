"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ITodo } from "@/interfaces";
import { Badge } from "./ui/badge";
import TodoTableActions from "./TodoTableActions";
import { CheckCircle2, Clock, ListTodo } from "lucide-react";

export default function TodoTable({ todos }: { todos: ITodo[] }) {
  const completedCount = todos.filter((todo) => todo.completed).length;
  const pendingCount = todos.length - completedCount;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-card border border-border/50 rounded-xl p-6 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <ListTodo className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Tasks</p>
              <p className="text-2xl font-semibold text-foreground">
                {todos.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-card border border-border/50 rounded-xl p-6 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-semibold text-foreground">
                {completedCount}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-card border border-border/50 rounded-xl p-6 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-semibold text-foreground">
                {pendingCount}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-gradient-card border border-border/50 rounded-xl shadow-soft overflow-hidden backdrop-blur-sm">
        <div className="px-6 py-4 border-b border-border/50">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <ListTodo className="h-5 w-5 text-primary" />
            Your Tasks
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and track your daily tasks
          </p>
        </div>

        <Table className="text-center">
          <TableCaption className="py-4 text-muted-foreground">
            {todos.length === 0
              ? "No tasks yet. Add your first task to get started!"
              : `A list of your ${todos.length} tasks.`}
          </TableCaption>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-muted/30">
              <TableHead className="text-center font-medium text-foreground">
                #
              </TableHead>
              <TableHead className="text-center font-medium text-foreground">
                Title
              </TableHead>
              <TableHead className="text-center font-medium text-foreground">
                Description
              </TableHead>
              <TableHead className="text-center font-medium text-foreground">
                Status
              </TableHead>
              <TableHead className="text-center font-medium text-foreground">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-12 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-4 bg-muted/50 rounded-full">
                      <ListTodo className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">No tasks found</p>
                    <p className="text-sm text-muted-foreground">
                      Add your first task to get started
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              todos.map((todo, idx) => (
                <TableRow
                  key={todo.id}
                  className="border-border/50 hover:bg-muted/30 transition-colors"
                >
                  <TableCell className="font-medium text-muted-foreground">
                    {idx + 1}
                  </TableCell>
                  <TableCell className="font-medium text-foreground max-w-[200px] truncate">
                    {todo.title}
                  </TableCell>
                  <TableCell className="text-muted-foreground max-w-[300px] truncate">
                    {todo.body}
                  </TableCell>
                  <TableCell className="text-center">
                    {todo.completed ? (
                      <Badge
                        variant="default"
                        className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800 hover:bg-green-500/20"
                      >
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800 hover:bg-amber-500/20"
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <TodoTableActions todo={todo} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          {todos.length > 0 && (
            <TableFooter className="bg-muted/20 border-border/50">
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-left font-medium text-foreground"
                >
                  Total Tasks
                </TableCell>
                <TableCell className="font-semibold text-primary">
                  {todos.length}
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </div>
    </div>
  );
}
