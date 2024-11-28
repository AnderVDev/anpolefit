"use client";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function AccountSettingsPage() {
  const currentUser = useCurrentUser();
  const curretUserName = currentUser?.name;
  const curretUserEmail = currentUser?.email;
  const { toast } = useToast();

  const HandledSave = async () => {
    toast({
      description: "User data has been successfully updated!",
    });
  };
  return (
    <div className="container mx-auto py-6 px-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile">
            <TabsList className="flex gap-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            {/* Profile Tab */}
            <TabsContent value="profile" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your Name"
                    value={curretUserName ?? ""}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Your Email"
                    value={curretUserEmail ?? ""}
                    disabled
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" placeholder="Short Bio" />
                </div>
              </div>
            </TabsContent>
            {/* Security Tab */}
            <TabsContent value="security" className="mt-6">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </TabsContent>
            {/* Notifications Tab */}
            <TabsContent value="notifications" className="mt-6">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <Label>Receive Email Notifications</Label>
                  <Switch />
                </div>
                <Separator/>
                <div className="flex items-center justify-between">
                  <Label>Receive SMS Notifications</Label>
                  <Switch />
                </div>
                <Separator/>
                <div className="flex items-center justify-between">
                  <Label>Enable Push Notifications</Label>
                  <Switch />
                  {/* <Button variant="outline">Toggle</Button> */}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <Button variant="outline">Cancel</Button>
          <Button variant="default" onClick={HandledSave}>
            Save Changes
          </Button>
        </CardFooter>

      </Card>
    </div>
  );
}
