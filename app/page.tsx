import { getTodoActions } from "@/actions/todoActions";
import TodoTable from "@/components/TodoTable";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  // todo Fetch todos from the server
  const {userId,redirectToSignIn} =await auth()
  const todos = await getTodoActions({userId});

    if (!userId) return redirectToSignIn()

  return (
    // <main className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
    <main className="container mx-auto ">
      <TodoTable todos={todos} />
    </main>
  );
}
