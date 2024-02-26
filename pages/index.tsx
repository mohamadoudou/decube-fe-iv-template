import { Inter } from "next/font/google";
import Image from "next/image";
import Movies from "./Movies";

const inter = Inter({ subsets: ["latin"] });
const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

export default function Home() {
  return (
    <main
      className={cn(
        "min-h-screen flex flex-col items-center justify-center p-24 gap-4",
        inter.className,
      )}
    >
      <Movies />
    </main>
  );
}
