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
    <div className="h-full w-full flex items-center justify-center bg-purpleLight-100">
      <Card className="w-full max-w-4xl ">
        <CardHeader>
          <CardTitle className="font-bold text-darkpurple text-3xl">
            Account Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile">
            <TabsList className="flex gap-4 bg-purpleLight-100">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            {/* Profile Tab */}
            <TabsContent value="profile" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label
                    htmlFor="name"
                    className="text-purpleVariant-700 font-semibold"
                  >
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Your Name"
                    value={curretUserName ?? ""}
                    className="placeholder:text-purpleVariant-100 text-purpleVariant-700 focus-visible:ring-purpleVariant-700"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="email"
                    className="text-purpleVariant-700 font-semibold"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="Your Email"
                    value={curretUserEmail ?? ""}
                    disabled
                  />
                </div>
                <div className="col-span-2">
                  <Label
                    htmlFor="bio"
                    className="text-purpleVariant-700 font-semibold"
                  >
                    Bio
                  </Label>
                  <Input
                    id="bio"
                    placeholder="Short Bio"
                    className="placeholder:text-purpleVariant-100 text-purpleVariant-700 focus-visible:ring-purpleVariant-700"
                  />
                </div>
              </div>
            </TabsContent>
            {/* Security Tab */}
            <TabsContent value="security" className="mt-6">
              <div className="grid gap-4">
                <div>
                  <Label
                    htmlFor="current-password"
                    className="text-purpleVariant-700 font-semibold"
                  >
                    Current Password
                  </Label>
                  <Input
                    id="current-password"
                    type="password"
                    placeholder="••••••••"
                    className="placeholder:text-purpleVariant-100 text-purpleVariant-700 focus-visible:ring-purpleVariant-700"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="new-password"
                    className="text-purpleVariant-700 font-semibold"
                  >
                    New Password
                  </Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="••••••••"
                    className="placeholder:text-purpleVariant-100 text-purpleVariant-700 focus-visible:ring-purpleVariant-700"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="confirm-password"
                    className="text-purpleVariant-700 font-semibold"
                  >
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    className="placeholder:text-purpleVariant-100 text-purpleVariant-700 focus-visible:ring-purpleVariant-700"
                  />
                </div>
              </div>
            </TabsContent>
            {/* Notifications Tab */}
            <TabsContent value="notifications" className="mt-6">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <Label className="text-purpleVariant-700 font-semibold">
                    Receive Email Notifications
                  </Label>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <Label className="text-purpleVariant-700 font-semibold">
                    Receive SMS Notifications
                  </Label>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <Label className="text-purpleVariant-700 font-semibold">
                    Enable Push Notifications
                  </Label>
                  <Switch />
                  {/* <Button variant="outline">Toggle</Button> */}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
      

          <Button className="rounded-lg m-0 hover:bg-purpleVariant-500  hover:text-white bg-white font-semibold  text-purpleVariant-700" type="button">
          Cancel
          </Button>
          <Button className="rounded-lg m-0 bg-purpleVariant-700 font-semibold hover:bg-purpleVariant-500 " onClick={HandledSave}>
          Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
