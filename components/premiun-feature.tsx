import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PremiumFeatureUpgrade: React.FC = () => {
  return (
    <Card className="col-span-3 flex flex-col items-center justify-center bg-purpleVariant-200 shadow-xl p-2">
      <Card className="bg-muted text-muted-foreground max-w-md mx-auto shadow-md">
        <CardHeader>
          <CardTitle className="text-darkpurple font-bold text-xl">Premium Feature</CardTitle>
          <CardDescription>
            Unlock this feature with a premium subscription.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-darkpurple">
            This feature is available to premium users. Upgrade your
            subscription now to access exclusive content and tools.
          </p>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="bg-darkpurple font-bold hover:bg-purpleVariant-200 text-primary-foreground hover:text-darkpurple">
            Upgrade Now
          </Button>
        </CardFooter>
      </Card>
    </Card>
  );
};

export default PremiumFeatureUpgrade;
