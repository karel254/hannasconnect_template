export default function Footer() {
  return (
    <footer className="border-t bg-muted/40 py-6 text-sm">
      <div className="container mx-auto flex flex-col items-center gap-2 px-4 text-center sm:flex-row sm:justify-between">
        <p className="font-medium">© {new Date().getFullYear()} Hanna&apos;s&nbsp;Connect. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="/privacy" className="hover:underline">
            Privacy&nbsp;Policy
          </a>
          <a href="/terms" className="hover:underline">
            Terms&nbsp;of&nbsp;Service
          </a>
        </div>
      </div>
    </footer>
  )
}
