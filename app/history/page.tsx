import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { getAllEntries } from "@/lib/actions";
import { HistoryList } from "@/components/history-list";

export default async function HistoryPage() {
  const entries = await getAllEntries();

  return (
    <div className="container mx-auto py-6">
      <Button
        variant="ghost"
        className="mb-4 gap-1"
        onClick={() => window.history.back()}
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Entry History</CardTitle>
          <CardDescription>All your recorded hayfever entries</CardDescription>
        </CardHeader>
        <CardContent>
          <HistoryList initialEntries={entries} />
        </CardContent>
      </Card>
    </div>
  );
}
