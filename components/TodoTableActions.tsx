import { deleteTodoAction } from "@/actions/todoActions";
import { Trash2, Loader2 } from "lucide-react";
import React, { useState } from "react";
import EditTodoForm from "./EditTodoForm";
import { ITodo } from "@/interfaces";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const TodoTableActions = ({ todo }: { todo: ITodo }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      if (todo.id) {
        await deleteTodoAction({ id: todo.id });
      }
    } catch (error) {
      //
      throw new Error(`Failed to delete todo: ${error}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Edit Todo */}
      <div className="flex-shrink-0">
        <EditTodoForm todo={todo} />
      </div>

      {/* Delete Todo with Confirmation */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 hover:text-red-700 dark:border-red-800/50 dark:text-red-400 dark:hover:bg-red-950/50 dark:hover:border-red-700 dark:hover:text-red-300 transition-all duration-200 hover-lift"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
            <span className="sr-only">Delete todo</span>
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent className="glass border-border/50 shadow-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground flex items-center gap-2">
              <div className="p-2 bg-red-500/10 rounded-full">
                <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>
              Delete Task
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Are you sure you want to delete &quot;{todo.title}&quot;? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="bg-secondary hover:bg-secondary/80 text-secondary-foreground border-border/50">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white border-0 shadow-sm hover:shadow-md transition-all duration-200"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TodoTableActions;
