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
      <Card className="bg-muted text-muted-foreground max-w-md mx-auto shadow-md">
        <CardHeader>
          <CardTitle className="text-primary">Premium Feature</CardTitle>
          <CardDescription>
            Unlock this feature with a premium subscription.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground">
            This feature is available to premium users. Upgrade your subscription
            now to access exclusive content and tools.
          </p>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Upgrade Now
          </Button>
        </CardFooter>
      </Card>
    );
  };
  
  export default PremiumFeatureUpgrade;