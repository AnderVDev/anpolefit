import { Card } from "@/components/ui/card";
import React, { useState } from "react";
import OptionsCard from "../../OptionsCards";
import ectomorphBody from "@/public/assets/Logo Anpolefit_13.png";
import mesomorphBody from "@/public/assets/Logo Anpolefit_13.png";
import endomorphBody from "@/public/assets/Logo Anpolefit_13.png";
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
import { StepThreeSchema } from "@/lib/zod";
import { BodyTypes } from "@/types/calculator";
import {
  useStepperCountStore,
  useStepThreeStore,
} from "@/lib/stores/calculator-store";

type FormSchema = z.infer<typeof StepThreeSchema>;
const bodyTypes = [
  {
    id: BodyTypes.ECTOMORPH,
    name: "Ectomorph",
    description:
      "Characterized by a slim, lean build with a fast metabolism. Ectomorphs often find it difficult to gain weight and muscle. Examples: Narrow shoulders and hips, low body fat, and long limbs",
    image: ectomorphBody,
  },
  {
    id: BodyTypes.MESOMORPH,
    name: "Mesomorph",
    description:
      "Typically has a muscular, well-defined build with a natural ability to gain muscle and strength easily. Examples: Broad shoulders, narrow waist, and a generally athletic appearance.",
    image: mesomorphBody,
  },
  {
    id: BodyTypes.ENDOMORPH,
    name: "Endomorph",
    description:
      "Tends to have a higher body fat percentage with a rounder physique. Endomorphs may find it easier to gain weight but struggle to lose fat. Examples: Wider waist, larger bone structure, and more fat accumulation in the lower body.",
    image: endomorphBody,
  },
];

function StepThree() {
  const currentStep = useStepperCountStore((state) => state.step);
  const increment = useStepperCountStore((state) => state.increase);
  const decrement = useStepperCountStore((state) => state.decrease);
  const stepThreeData = useStepThreeStore((state) => state.bodyType);
  const setStepThreeData = useStepThreeStore((state) => state.setBodyType);
  const [selectedBodyType, setSelectedBodyType] = useState<BodyTypes | null>(
    null
  );
  const form = useForm<FormSchema>({
    resolver: zodResolver(StepThreeSchema),
    defaultValues: {
      bodyType: stepThreeData ?? undefined,
    },
  });
  const { watch, handleSubmit, control, setValue } = form;

  const watchAllFields = watch();

  const handleSelectBodyType = (bodyTypeId: BodyTypes) => {
    setSelectedBodyType(bodyTypeId);
    setValue("bodyType", bodyTypeId);
  };

  const onSubmit: SubmitHandler<FormSchema> = (
    values: z.infer<typeof StepThreeSchema>
  ) => {
    const { bodyType } = watchAllFields;

    setStepThreeData(bodyType);

    console.log("Form values", values);
    console.log("Current Step value", currentStep);
    console.log("Step Three Store", stepThreeData);
    increment();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center justify-center flex-col flex-grow p-4 gap-2"
      >
        <FormField
          control={control}
          name="bodyType"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center justify-center my-2">
              {/* <FormLabel className="text-base font-bold">Expectation</FormLabel> */}
              <FormControl>
                <Card className="cursor-pointer gap-0 border border-gray-200 rounded-lg">
                  <div className=" grid grid-col-1 justify-items-center md:grid-cols-3 overflow-hidden">
                    {bodyTypes.map((type) => (
                      <OptionsCard
                        key={type.id}
                        name={type.name}
                        description={type.description}
                        image={type.image}
                        selected={type.id === selectedBodyType}
                        onSelect={() => {
                          field.onChange(type.id);
                          handleSelectBodyType(type.id as BodyTypes);
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
          <Button
            className="bg-slate-600 hover:bg-gray-500 rounded-lg m-0 "
            type="button"
            onClick={decrement}
          >
            Back
          </Button>
          <Button className="bg-gray-500 rounded-lg m-0 " type="submit">
            Next
          </Button>
        </section>
      </form>
    </Form>
  );
}

export default StepThree;
