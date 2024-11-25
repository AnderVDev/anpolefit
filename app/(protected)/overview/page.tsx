import { Card } from "@/components/ui/card";
import React from "react";
import WelcomeCard from "./_components/welcome-card";
import CaloriesChart from "./_components/calories-chart";

function Overview() {
  return (
    <>
      <div className="h-full w-full flex flex-col items-center justify-center gap-2">
        <section className="w-full h-1/2 grid px-2 gap-2 md:grid-cols-2 lg:grid-cols-8">
          <div className="col-span-4">
            <WelcomeCard />
          </div>
          <Card className="col-span-4">Test</Card>
        </section>
        <section className="w-full h-1/2 grid px-2 gap-2 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CaloriesChart />
          </Card>
          <Card className="col-span-3">Bottom</Card>
        </section>
      </div>
    </>
  );
}

export default Overview;
