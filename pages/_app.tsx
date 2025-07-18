import { TaskProvider } from "@/components/context/TaskContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
 return (
    <TaskProvider>
      <Component {...pageProps} />
    </TaskProvider>
  );
}