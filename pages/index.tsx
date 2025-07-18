import TaskList from "@/components/TaskList";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Lista de tareas</title>
        <meta name="description" content="Lista de tareas" />
        <link rel="icon" href="task.png" />
      </Head>
      <section className="min-w-full">
        <div className="w-full flex justify-center">
          <TaskList />
        </div>
      </section>
    </>
  );
}