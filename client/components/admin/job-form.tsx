"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { Dialog, DialogContent } from "@radix-ui/react-dialog";

interface JobFormProps {
  initialData?: any;
  isOpen: boolean;
  onClose: () => void;
}


export default function JobForm({ initialData, isOpen, onClose }: JobFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    department: initialData?.department || "engineering",
    location: initialData?.location || "",
    type: initialData?.type || "Full-time",
    experience: initialData?.experience || "",
    description: initialData?.description || "",
    responsibilities: initialData?.responsibilities || [""],
    requirements: initialData?.requirements || [""],
    preferred: initialData?.preferred || [""],
    status: initialData?.status || "active",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      status: checked ? "active" : "inactive",
    }));
  };

  const handleListItemChange = (
    listName: "responsibilities" | "requirements" | "preferred",
    index: number,
    value: string
  ) => {
    setFormData((prev) => {
      const newList = [...prev[listName]];
      newList[index] = value;
      return { ...prev, [listName]: newList };
    });
  };

  const addListItem = (
    listName: "responsibilities" | "requirements" | "preferred"
  ) => {
    setFormData((prev) => {
      return { ...prev, [listName]: [...prev[listName], ""] };
    });
  };

  const removeListItem = (
    listName: "responsibilities" | "requirements" | "preferred",
    index: number
  ) => {
    setFormData((prev) => {
      const newList = [...prev[listName]];
      newList.splice(index, 1);
      return { ...prev, [listName]: newList };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/admin/jobs");
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6 border-2 border-red-300 p-4">
        <Card className="border-2 border-yellow-300 py-2 md:px-6">
          <CardHeader>
            <CardTitle className="text-center font-bold uppercase">
              Job Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-10 gap-6">
              <div className="space-y-2 md:col-span-3 ">
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Senior Frontend Developer"
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-3">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g. San Francisco, CA (Remote Option)"
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="type">Employment Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleSelectChange("type", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Temporary">Temporary</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="department">Department *</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) =>
                    handleSelectChange("department", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="experience">Experience Level *</Label>
                <Input
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="e.g. 3+ years"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Salary Range *</Label>
                <Input
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  placeholder="e.g. 100,000 - 120,000 BDT"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Job Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Provide a detailed description of the job..."
                rows={5}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="status"
                checked={formData.status === "active"}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="status">Active Job Listing</Label>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="responsibilities">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="responsibilities">Responsibilities</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="preferred">Nice to Have</TabsTrigger>
          </TabsList>

          <TabsContent value="responsibilities">
            <Card>
              <CardHeader className="text-center text-[var(--word)]/90">
                <h1 className="font-semibold">Job Responsibilities</h1>
              </CardHeader>
              <CardContent className="space-y-4 border-amber-200 border-2 p-4">
                {formData.responsibilities.map((responsibility, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={responsibility}
                      onChange={(e) => {
                        if (e.target.value.length !== 0) {
                          handleListItemChange(
                            "responsibilities",
                            index,
                            e.target.value
                          );
                        }
                        console.log(e.target.value);
                      }}
                      placeholder="Add a responsibility..."
                    />
                    {formData.responsibilities.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          removeListItem("responsibilities", index)
                        }
                      >
                        <Trash2 className="h-4 w-4 text-red-600 hover:-translate-y-0.5" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addListItem("responsibilities")}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Responsibility
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requirements">
            <Card>
              <CardHeader>
                <h1 className="font-semibold text-[var(--word)]/90 text-center">
                  Must have job requirements
                </h1>
              </CardHeader>
              <CardContent className="space-y-4 p-4">
                {formData.requirements.map((requirement, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={requirement}
                      onChange={(e) =>
                        handleListItemChange(
                          "requirements",
                          index,
                          e.target.value
                        )
                      }
                      placeholder="Add a requirement..."
                    />
                    {formData.requirements.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeListItem("requirements", index)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600 hover:-translate-y-0.5" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addListItem("requirements")}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Requirement
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferred">
            <Card>
              <CardHeader>
                <h1 className="font-semibold text-[var(--word)]/90 text-center">
                  Nice to Have
                </h1>
              </CardHeader>
              <CardContent className="space-y-4 p-4">
                {formData.preferred.map((preferred, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={preferred}
                      onChange={(e) =>
                        handleListItemChange("preferred", index, e.target.value)
                      }
                      placeholder="Add a preferred qualification..."
                    />
                    {formData.preferred.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeListItem("preferred", index)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600 hover:-translate-y-0.5" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addListItem("preferred")}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Preferred Qualification
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardFooter className="flex justify-between px-8 pb-4">
            <Button
              type="button"
              variant="outline"
              className="text-red-600 hover:-translate-y-0.5 hover:text-red-500 hover:bg-red-300"
              onClick={() => router.push("/admin/jobs")}
            >
              Cancel
            </Button>
            <Button
              className="bg-[var(--green)]/10 text-[var(--green)] hover:bg-[var(--green)]/20"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {initialData ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>{initialData ? "Update Job" : "Create Job"}</>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
}
