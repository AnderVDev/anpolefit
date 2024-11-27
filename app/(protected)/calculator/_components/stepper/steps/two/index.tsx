import {
  useStepperCountStore,
  useStepTwoStore,
} from "@/lib/stores/calculator-store";
import { Card } from "@/components/ui/card";
import React, { useState } from "react";
import OptionsCard from "../../OptionsCards";
import buildImage from "@/public/assets/foto1.png";
import recompositionImage from "@/public/assets/foto1.png";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Expectations } from "@/types/calculator";
import { StepTwoSchema } from "@/lib/zod";

type FormSchema = z.infer<typeof StepTwoSchema>;

const expectations = [
  {
    id: Expectations.BUILD,
    name: "Build Muscle",
    description:
      "Focuses on increasing muscle mass through resistance training and adequate nutrition. Examples: Lifting weights, strength training exercises targeting specific muscle groups.",
    image: buildImage,
  },
  {
    id: Expectations.RECOMPOSITION,
    name: "Body Recomposition",
    description:
      "Aims to simultaneously reduce body fat and increase muscle mass to change body composition. Examples: Combining strength training with cardiovascular exercises and a balanced diet to achieve a leaner physique.",
    image: recompositionImage,
  },
];

function StepTwo() {
  const increment = useStepperCountStore((state) => state.increase);
  const decrement = useStepperCountStore((state) => state.decrease);
  const stepTwoData = useStepTwoStore((state) => state.expectations);
  const setStepTwoData = useStepTwoStore((state) => state.setExpectations);
  const [selectedExpectation, setSelectedExpectation] =
    useState<Expectations | null>(null);
  const form = useForm<FormSchema>({
    resolver: zodResolver(StepTwoSchema),
    defaultValues: {
      expectation: stepTwoData ?? undefined,
    },
  });
  const { watch, handleSubmit, control, setValue } = form;

  const watchAllFields = watch();

  const handleSelectExpectation = (expectationId: Expectations) => {
    setSelectedExpectation(expectationId);
    setValue("expectation", expectationId);
  };

  const onSubmit: SubmitHandler<FormSchema> = () => {
    const { expectation } = watchAllFields;
    setStepTwoData(expectation);
    increment();
  };

  return (
    <Form {...form}>
      <form
        // onSubmit={handleFormSubmit}
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center justify-center flex-col flex-grow p-4 gap-2"
      >
        <FormField
          control={control}
          name="expectation"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center justify-center max-w-xl h-auto">
              {/* <FormLabel className="text-base font-bold">Expectation</FormLabel> */}
              <FormControl>
                <Card className="cursor-pointer gap-0 border border-gray-200 rounded-lg">
                  <div className=" grid grid-col-1 justify-items-center md:grid-cols-2 overflow-hidden">
                    {expectations.map((expectation) => (
                      <OptionsCard
                        key={expectation.id}
                        name={expectation.name}
                        description={expectation.description}
                        image={expectation.image}
                        selected={expectation.id === selectedExpectation}
                        onSelect={() => {
                          field.onChange(expectation.id);
                          handleSelectExpectation(
                            expectation.id as Expectations
                          );
                        }}
                      />
                    ))}
                  </div>
                </Card>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <section className="flex gap-2">
          <Button className="rounded-lg m-0 " type="button" onClick={decrement}>
            Back
          </Button>
          <Button className="rounded-lg m-0 " type="submit">
            Next
          </Button>
        </section>
      </form>
    </Form>
  );
}

export default StepTwo;
