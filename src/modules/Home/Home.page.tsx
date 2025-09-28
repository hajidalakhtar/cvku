'use client';
import { sampleResume } from '@/libs/schema';
import { useArtboardStore } from '@/store/artboard';
import { Azurill } from '@/libs/templates/azurill';
import { AppSidebar } from '@/packages/components/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/packages/components/ui/sidebar';
import { Separator } from '@radix-ui/react-separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/packages/components/ui/breadcrumb';
import { PrintButton } from '@/packages/components/print-button';

export default function HomePage() {
  const setResume = useArtboardStore((state) => state.setResume);
  setResume(sampleResume);

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '350px'
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
          <SidebarTrigger className="-ml-1" />
          <div className="ml-auto">
            <PrintButton />
          </div>
        </header>
        <div className="flex flex-1 flex-col">

        </div>

      </SidebarInset>
    </SidebarProvider>
  );
}
