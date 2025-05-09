import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserEntries } from "@/lib/actions";
import { HistoryList } from "@/components/history-list";
import { BackButton } from "@/components/back-button";

export const dynamic = "force-dynamic";

export default async function HistoryPage(): Promise<React.ReactElement> {
  const entries = await getUserEntries();

  return (
    <div className="container mx-auto py-6">
      <BackButton />

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
