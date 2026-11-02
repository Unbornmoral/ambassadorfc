import { createFileRoute } from "@tanstack/react-router";
import { Megaphone, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useAdmin } from "@/lib/admin";

import {
  getAnnouncements,
  createAnnouncement,
  deleteAnnouncement,
} from "@/services/announcements";

export const Route = createFileRoute("/announcements")({
  component: AnnouncementsPage,
});

function AnnouncementsPage() {
  const { isAdmin } = useAdmin();

  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  async function loadAnnouncements() {
    const data = await getAnnouncements();
    setAnnouncements(data ?? []);
  }

  useEffect(() => {
    loadAnnouncements();
  }, []);

  async function handleCreate() {
    if (!isAdmin) {
      toast.error("Admin access required");
      return;
    }

    if (!title.trim() || !message.trim()) {
      toast.error("Enter a title and message");
      return;
    }

    await createAnnouncement(
      title.trim(),
      message.trim()
    );

    setTitle("");
    setMessage("");

    await loadAnnouncements();

    toast.success("Announcement posted");
  }

  async function handleDelete(id: string) {
    if (!isAdmin) {
      toast.error("Admin access required");
      return;
    }

    await deleteAnnouncement(id);

    await loadAnnouncements();

    toast.success("Announcement removed");
  }

  return (
    <AppShell
      title="Announcements"
      subtitle="Coach and club updates"
    >
      <div className="space-y-4">

        {isAdmin && (
          <Card>
            <CardContent className="space-y-4 p-4">
              <Input
                placeholder="Announcement title"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
              />

              <Textarea
                placeholder="Write announcement..."
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
              />

              <Button onClick={handleCreate}>
                <Plus className="size-4" />
                Post Announcement
              </Button>
            </CardContent>
          </Card>
        )}

        {announcements.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              No announcements yet.
            </CardContent>
          </Card>
        ) : (
          announcements.map((announcement) => (
            <Card key={announcement.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Megaphone className="size-4 text-primary" />
                      <h3 className="font-bold">
                        {announcement.title}
                      </h3>
                    </div>

                    <p className="mt-3 whitespace-pre-wrap text-sm">
                      {announcement.message}
                    </p>

                    <p className="mt-3 text-xs text-muted-foreground">
                      {new Date(
                        announcement.created_at
                      ).toLocaleString()}
                    </p>
                  </div>

                  {isAdmin && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        handleDelete(
                          announcement.id
                        )
                      }
                    >
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </AppShell>
  );
}