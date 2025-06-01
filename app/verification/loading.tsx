import { CardFooter } from "@/components/ui/card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Mail } from "lucide-react"

export default function VerificationLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f5f5] py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-[#FF69B4]/10 p-3 rounded-full">
              <Mail className="h-10 w-10 text-[#FF69B4]" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-[#B22222]">Check Your Email</CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-64 mx-auto" />
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mx-auto mb-6" />

          <div className="bg-[#F5F5F5] p-4 rounded-lg mb-6">
            <Skeleton className="h-5 w-48 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full" />
          </div>

          <Skeleton className="h-4 w-5/6 mx-auto mb-4" />
          <Skeleton className="h-10 w-full rounded-md" />
        </CardContent>
        <CardFooter className="flex justify-center">
          <Skeleton className="h-4 w-48" />
        </CardFooter>
      </Card>
    </div>
  )
}
