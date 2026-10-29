import Link from "next/link";
import { Logo } from "@/components/shared";

export default function NotFound() {
  return <main id="main-content" className="not-found"><Logo /><span>404 / PAGE NOT FOUND</span><h1>Let’s get you<br />back to comfort.</h1><p>The page you’re looking for isn’t here.</p><Link href="/">Back to the homepage ↗</Link></main>;
}
