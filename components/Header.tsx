// Updated Header Component
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";
import { CheckSquare, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddTodoForm from "./AddTodoForm";

type HeaderProps = {
  userId: string | null; // handle both cases
};

const Header = ({ userId }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-primary rounded-lg shadow-glow">
              <CheckSquare className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                TodoMaster
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Organize your tasks
              </p>
            </div>
          </div>
        </div>

        {/* Center Navigation (optional) */}
        <nav className="hidden md:flex items-center gap-6">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            Dashboard
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            Tasks
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            Analytics
          </Button>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Add Task Button */}

          <AddTodoForm userId={userId} />

          {/* Mobile Add Button */}
          <Button size="sm" variant="outline" className="sm:hidden">
            <PlusCircle className="h-4 w-4" />
          </Button>

          {/* Theme Toggle */}
          <ModeToggle />

          {/* User Authentication */}
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8",
                  userButtonPopoverCard: "bg-card border-border shadow-lg",
                  userButtonPopoverActionButton: "hover:bg-accent",
                },
              }}
            />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
