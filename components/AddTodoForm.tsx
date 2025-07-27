"use client";

import { addTodoAction } from "@/actions/todoActions";
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
import { PlusCircle, Loader2, Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";

const AddTodoForm = ({ userId }: { userId: string | null }) => {
  const defaultValues: Partial<TodoFormValues> = {
    title: "",
    body: "",
    completed: false,
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
      await addTodoAction({
        title: data.title,
        body: data.body,
        completed: data.completed,
        userId,
      });
      setOpen(false);
      // Reset form after successful submission
      form.reset(defaultValues);
    } catch (error) {
      console.error("Failed to add todo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form when canceling
    form.reset(defaultValues);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <div className="flex justify-end my-10 w-[90%] md:w-[85%] lg:w-[70%] mx-auto">
        <DialogTrigger asChild>
          <Button
            size="sm"
            className="bg-gradient-primary hover:opacity-90 text-white shadow-sm hover:shadow-md transition-all duration-200 hover-lift hidden sm:flex"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </DialogTrigger>

        {/* Mobile trigger button */}
        <DialogTrigger asChild>
          <Button
            size="sm"
            className="bg-gradient-primary hover:opacity-90 text-white shadow-sm hover:shadow-md transition-all duration-200 hover-lift sm:hidden"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-[500px] glass border-border/50 shadow-xl">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl font-semibold text-foreground flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <PlusCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            Add New Task
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-base">
            Create a new task to add to your todo list. Fill in the details
            below.
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
                      Task Title *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="What needs to be done?"
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
                        placeholder="Add more details about this task (optional)..."
                        className="glass border-border/50 focus:border-primary/50 focus:ring-primary/20 resize-none min-h-[100px] transition-all duration-200"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-muted-foreground">
                      Provide additional context, notes, or requirements for
                      this task.
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
                          name={field.name}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          disabled={field.disabled}
                        />
                      </FormControl>
                      <div className="space-y-1">
                        <FormLabel className="text-sm font-medium text-foreground cursor-pointer">
                          Mark as completed
                        </FormLabel>
                        <p className="text-xs text-muted-foreground">
                          Check this if the task is already finished
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
                  disabled={isLoading || !form.formState.isValid}
                  className="bg-gradient-primary hover:opacity-90 text-white shadow-sm hover:shadow-md transition-all duration-200 min-w-[120px]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Task
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

export default AddTodoForm;
