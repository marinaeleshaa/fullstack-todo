import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { todoFormSchema, TodoFormValues } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {  Loader2, Save, X, Edit3 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { ITodo } from "@/interfaces";
import { updateTodoAction } from "@/actions/todoActions";

const EditTodoForm = ({ todo }: { todo: ITodo }) => {
  const defaultValues: Partial<TodoFormValues> = {
    title: todo.title,
    body: todo.body as string,
    completed: todo.completed,
  };

  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onSubmit = async (data: TodoFormValues) => {
    setIsLoading(true);
    try {
      await updateTodoAction({
        id: todo?.id,
        title: data.title,
        body: data.body as string,
        completed: data.completed,
      });
      setOpen(false);
      // Reset form to new values after successful update
      form.reset(data);
    } catch (error) {
      console.error("Failed to update todo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form to original values when canceling
    form.reset(defaultValues);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 dark:border-blue-800/50 dark:text-blue-400 dark:hover:bg-blue-950/50 dark:hover:border-blue-700 dark:hover:text-blue-300 transition-all duration-200 hover-lift"
        >
          <Edit3 className="h-4 w-4" />
          <span className="sr-only">Edit todo</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] glass border-border/50 shadow-xl">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl font-semibold text-foreground flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Edit3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            Edit Task
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-base">
            Update your task details below. Changes will be saved automatically.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Title Field */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      Task Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your task title..."
                        className="glass border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-600 dark:text-red-400" />
                  </FormItem>
                )}
              />

              {/* Description Field */}
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add a detailed description of your task..."
                        className="glass border-border/50 focus:border-primary/50 focus:ring-primary/20 resize-none min-h-[100px] transition-all duration-200"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-muted-foreground">
                      Provide additional context or notes for this task.
                    </FormDescription>
                    <FormMessage className="text-red-600 dark:text-red-400" />
                  </FormItem>
                )}
              />

              {/* Completed Checkbox */}
              <FormField
                control={form.control}
                name="completed"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-3 p-4 bg-accent/30 rounded-lg border border-border/30">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                      </FormControl>
                      <div className="space-y-1">
                        <FormLabel className="text-sm font-medium text-foreground cursor-pointer">
                          Mark as completed
                        </FormLabel>
                        <p className="text-xs text-muted-foreground">
                          Check this box if the task has been finished
                        </p>
                      </div>
                    </div>
                    <FormMessage className="text-red-600 dark:text-red-400" />
                  </FormItem>
                )}
              />

              {/* Form Actions */}
              <DialogFooter className="gap-3 pt-6 border-t border-border/30">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    className="bg-secondary hover:bg-secondary/80 text-secondary-foreground border-border/50"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </DialogClose>

                <Button
                  type="submit"
                  disabled={isLoading || !form.formState.isDirty}
                  className="bg-gradient-primary hover:opacity-90 text-white shadow-sm hover:shadow-md transition-all duration-200 min-w-[120px]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Update Task
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTodoForm;
