import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container py-24 text-center">
      <div className="text-7xl font-serif text-navy-800">404</div>
      <h1 className="mt-4 text-3xl font-serif font-semibold text-navy-800">Page not found</h1>
      <p className="mt-2 text-ink-secondary">The page you were looking for doesn't exist or has moved.</p>
      <div className="mt-6">
        <Link href="/"><Button variant="primary">Back to home</Button></Link>
      </div>
    </div>
  );
}
