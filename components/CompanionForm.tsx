"use client";

import { Category, Companion } from "@prisma/client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  companionRequest,
  companionValidator,
} from "@/lib/validators/companion";
import { Separator } from "./ui/separator";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./Input";
import { ImageUpload } from "./ImageUpload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Wand2 } from "lucide-react";
import { characters } from "@/data/characters.js";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

type CompanionFormProps = {
  initialData: Companion | null;
  categories: Category[];
};

const CompanionForm = ({ initialData, categories }: CompanionFormProps) => {
  const router = useRouter();
  const form = useForm<companionRequest>({
    resolver: zodResolver(companionValidator),
    defaultValues: initialData || {
      name: "",
      description: "",
      seed: "",
      instructions: "",
      src: "",
      categoryId: undefined,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: companionRequest) => {
    if (initialData) {
      axios
        .patch(`/api/companion/${initialData.id}`, values)
        .then((respose) => {
          if (respose.status === 200) {
            toast.success("Companion Updated Successfull");
            router.push("/");
          }
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            if (error.response?.status === 409) {
              toast.error("Companion Updated unSuccessfull");
            }
            if (error.response?.status === 422) {
              toast.error("Companion Updated unSuccessfull");
            }
            if (error.response?.status === 401) {
              router.push("/");
            }
          }
        });
    } else {
      axios
        .post(`/api/companion`, values)
        .then((respose) => {
          if (respose.status === 200) {
            toast.success("Companion Created Successfull");
            router.push("/");
          }
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            if (error.response?.status === 403) {
              toast.error("Companion Exist");
            }
            if (error.response?.status === 422) {
              toast.error("Companion Created unSuccessfull");
            }
            if (error.response?.status === 401) {
              router.push("/");
            }
          }
        });
    }
  };

  return (
    <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pb-10"
        >
          <div className="space-y-2 w-full col-span-2">
            <div>
              <h3 className="text-lg font-medium">General Information</h3>
              <p className="text-sm text-muted-foreground">
                General information about your Companion
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <FormField
            name="src"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center space-y-4">
                <FormControl>
                  <ImageUpload onChange={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Elon Musk"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is how your AI Companion will be named.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="CEO & Founder of Tesla"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is how your AI Companion will be named.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="categoryId"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>category</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a Category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    This is how your AI Companion will be named.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2 w-full">
            <div className="text-lg font-medium">
              <h3>Configuration</h3>
            </div>
            <p>Detail how you want your AI to behave</p>
            <Separator className="bg-primary/10" />
          </div>

          <FormField
            name="instructions"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-2 md:col-span-1">
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-background"
                    disabled={isLoading}
                    rows={6}
                    placeholder={characters.elon.PREAMBLE}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is how your AI Companion will be named.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="seed"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-2 md:col-span-1">
                <FormLabel>Seed</FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-background"
                    rows={6}
                    disabled={isLoading}
                    placeholder={characters.elon.SEED_CHAT}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is how your AI Companion will be named.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-center">
            <Button size="lg" disabled={isLoading}>
              {initialData ? "Edit Your Companion" : "Create your Companion"}
              <Wand2 className="w-4 h-4 ml-2 " />
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CompanionForm;
