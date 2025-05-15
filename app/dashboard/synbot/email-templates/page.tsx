import { Suspense } from "react";
import { EmailTemplateUI } from "@/components/synbot/EmailTemplateUI";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = {
  title: "SynBot - E-mail Şablonları | Turkcell",
  description: "Turkcell Kurumsal E-mail Şablonları oluşturma aracı"
};

export default function EmailTemplatesPage() {
  return (
    <div className="container mx-auto py-4 space-y-4">
      <div className="grid grid-cols-1 h-[calc(100vh-130px)]">
        <Suspense fallback={<EmailTemplateSkeleton />}>
          <EmailTemplateUI />
        </Suspense>
      </div>
    </div>
  );
}

function EmailTemplateSkeleton() {
  return (
    <Card className="w-full h-full flex flex-col p-4">
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-6 w-[250px]" />
      </div>
      <Skeleton className="h-[50px] w-full mb-4" />
      <div className="space-y-3 mb-4">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <Skeleton className="h-5 w-[120px]" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-[120px]" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      <div className="flex-1">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
            <Skeleton className="h-24 w-3/4 rounded-lg" />
          </div>
          <div className="flex items-start gap-3 justify-end">
            <Skeleton className="h-16 w-2/3 rounded-lg" />
            <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
          </div>
          <div className="flex items-start gap-3">
            <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
            <Skeleton className="h-32 w-3/4 rounded-lg" />
          </div>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t">
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>
    </Card>
  );
} 