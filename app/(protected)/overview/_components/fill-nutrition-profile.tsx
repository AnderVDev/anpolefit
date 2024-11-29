import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const NutritionalDataMsg: React.FC = () => {
  const router = useRouter();
  const HandledCalculation = () => {
    router.push("/calculator");
  };
  return (
    <Card className="col-span-4 flex flex-col items-center justify-center bg-purpleVariant-200 shadow-xl p-2">
      <Card className="bg-muted text-muted-foreground max-w-md mx-auto shadow-md">
        <CardHeader>
          <CardTitle className="text-darkpurple font-bold text-xl">
            Nutritional Profile
          </CardTitle>
          <CardDescription>
            Discover personalized nutritional insights tailored to your needs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-darkpurple">
            Take the first step toward better health by calculating your
            nutritional profile. It&apos;s quick, easy, and provides valuable
            insights into your dietary needs.
          </p>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="bg-darkpurple font-bold hover:bg-purpleVariant-200 text-primary-foreground hover:text-darkpurple" onClick={HandledCalculation}>
            Calculate Now
          </Button>
        </CardFooter>
      </Card>
    </Card>
  );
};

export default NutritionalDataMsg;
