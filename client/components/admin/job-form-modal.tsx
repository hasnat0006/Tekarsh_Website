"use client"

import type * as React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Modal, ModalContent, ModalDescription, ModalFooter, ModalHeader, ModalTitle } from "@/components/ui/modal"
import { Loader2, Plus, Trash2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { JobFormData } from "@/types/interface"


interface JobFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: JobFormData) => Promise<void>
  initialData?: Partial<JobFormData>
  mode: "create" | "edit"
}

const defaultFormData: JobFormData = {
  title: "",
  department: "engineering",
  location: "",
  type: "Full-time",
  experience: "",
  description: "",
  responsibilities: [""],
  requirements: [""],
  preferred: [""],
  status: "active",
  salary: {
    min: "",
    max: "",
    currency: "BDT",
  },
  benefits: [""],
}

const url = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export default function JobFormModal({ isOpen, onClose, onSubmit, initialData, mode }: JobFormModalProps) {
  const [formData, setFormData] = useState<JobFormData>(defaultFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [activeTab, setActiveTab] = useState("basic")
  const { toast } = useToast()
  const userid = localStorage.getItem("userid");

  console.log("JobFormModal mounted with initialData:", initialData)

  useEffect(() => {
    if (isOpen) {
      if (initialData && mode === "edit") {
        setFormData({
          ...defaultFormData,
          ...initialData,
          title: initialData.description.title || "",
          department: initialData.description.department || "engineering",
          location: initialData.description.location || "",
          type: initialData.description.type || "Full-time",
          experience: initialData.description.experience || "",
          description: initialData.description.description || "",
          status: initialData.status || "active",
          responsibilities: initialData.description.responsibilities || [""],
          requirements: initialData.description.requirements || [""],
          preferred: initialData.description.preferred || [""],
          benefits: initialData.description.benefits || [""],
          salary: {
            ...defaultFormData.salary,
            ...initialData.description.salary,
          },
        });
      } else {
        setFormData(defaultFormData)
      }
      setErrors({})
      setActiveTab("basic")
    }
  }, [isOpen, initialData, mode])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Required field validation
    if (!formData.title.trim()) {
      newErrors.title = "Job title is required"
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required"
    }

    if (!formData.experience.trim()) {
      newErrors.experience = "Experience level is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Job description is required"
    }

    // Validate that at least one responsibility is provided
    const validResponsibilities = formData.responsibilities.filter((r) => r.trim())
    if (validResponsibilities.length === 0) {
      newErrors.responsibilities = "At least one responsibility is required"
    }

    // Validate that at least one requirement is provided
    const validRequirements = formData.requirements.filter((r) => r.trim())
    if (validRequirements.length === 0) {
      newErrors.requirements = "At least one requirement is required"
    }

    // Salary validation
    if (formData.salary?.min && formData.salary?.max) {
      const minSalary = Number.parseFloat(formData.salary.min)
      const maxSalary = Number.parseFloat(formData.salary.max)

      if (minSalary >= maxSalary) {
        newErrors.salary = "Maximum salary must be greater than minimum salary"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof JobFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSalaryChange = (field: keyof NonNullable<JobFormData["salary"]>, value: string) => {
    setFormData((prev) => ({
      ...prev,
      salary: {
        ...prev.salary!,
        [field]: value,
      },
    }))
    // Clear salary error when user starts typing
    if (errors.salary) {
      setErrors((prev) => ({ ...prev, salary: "" }))
    }
  }

  const handleListItemChange = (
    listName: "responsibilities" | "requirements" | "preferred" | "benefits",
    index: number,
    value: string,
  ) => {
    setFormData((prev) => {
      const newList = [...prev[listName]]
      newList[index] = value
      return { ...prev, [listName]: newList }
    })
    // Clear error when user starts typing
    if (errors[listName]) {
      setErrors((prev) => ({ ...prev, [listName]: "" }))
    }
  }

  const addListItem = (listName: "responsibilities" | "requirements" | "preferred" | "benefits") => {
    setFormData((prev) => ({
      ...prev,
      [listName]: [...prev[listName], ""],
    }))
  }

  const removeListItem = (listName: "responsibilities" | "requirements" | "preferred" | "benefits", index: number) => {
    setFormData((prev) => {
      const newList = [...prev[listName]]
      newList.splice(index, 1)
      return { ...prev, [listName]: newList }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form before submitting.",
        variant: "destructive",
      })
      return
    }

    console.log("Submitting job form with data:", formData)

    setIsSubmitting(true)

    const response = await fetch(`${url}/admin/job_post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({userid, formData}),
    })
    const data = await response.json();

    try {
      // Clean up form data before submission
      const cleanedData = {
        ...formData,
        responsibilities: formData.responsibilities.filter((r) => r.trim()),
        requirements: formData.requirements.filter((r) => r.trim()),
        preferred: formData.preferred.filter((r) => r.trim()),
        benefits: formData.benefits.filter((b) => b.trim()),
      }

      await onSubmit(cleanedData)

      toast({
        title: mode === "create" ? "Job Created" : "Job Updated",
        description: `Job "${formData.title}" has been ${mode === "create" ? "created" : "updated"} successfully.`,
      })

      onClose()
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${mode === "create" ? "create" : "update"} job. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    if (isSubmitting) return
    onClose()
  }

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent className="max-w-4xl font-poppins max-h-[90vh]">
        <ModalHeader>
          <ModalTitle>
            {mode === "create" ? "Create New Job" : "Edit Job"}
          </ModalTitle>
          <ModalDescription>
            {mode === "create"
              ? "Fill in the details below to create a new job posting."
              : "Update the job details below to modify the existing posting."}
          </ModalDescription>
        </ModalHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 w-full bg-[var(--word)]/5 rounded-lg">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="details">Job Details</TabsTrigger>
              <TabsTrigger value="compensation">Compensation</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Basic Information Tab */}
            <TabsContent value="basic" className="space-y-4">
              <Card className="p-4">
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="title"
                        className="px-1 text-[var(--word)]/90"
                      >
                        Job Title <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) =>
                          handleInputChange("title", e.target.value)
                        }
                        placeholder="e.g. Senior Frontend Developer"
                        className={errors.title ? "border-red-500" : ""}
                        aria-describedby={
                          errors.title ? "title-error" : undefined
                        }
                      />
                      {errors.title && (
                        <p
                          id="title-error"
                          className="text-sm text-red-500 flex items-center gap-1"
                        >
                          <AlertCircle className="h-4 w-4" />
                          {errors.title}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="department"
                        className="px-1 text-[var(--word)]/90"
                      >
                        Department <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.department}
                        onValueChange={(value) =>
                          handleInputChange("department", value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="engineering">
                            Engineering
                          </SelectItem>
                          <SelectItem value="bpo">BPO</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="management">Management</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="location"
                        className="px-1 text-[var(--word)]/90"
                      >
                        Location <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) =>
                          handleInputChange("location", e.target.value)
                        }
                        placeholder="e.g. San Francisco, CA (Remote Option)"
                        className={errors.location ? "border-red-500" : ""}
                        aria-describedby={
                          errors.location ? "location-error" : undefined
                        }
                      />
                      {errors.location && (
                        <p
                          id="location-error"
                          className="text-sm text-red-500 flex items-center gap-1"
                        >
                          <AlertCircle className="h-4 w-4" />
                          {errors.location}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="type"
                        className="px-1 text-[var(--word)]/90"
                      >
                        Employment Type <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) =>
                          handleInputChange("type", value)
                        }
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
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="experience"
                      className="px-1 text-[var(--word)]/90"
                    >
                      Experience Level <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="experience"
                      value={formData.experience}
                      onChange={(e) =>
                        handleInputChange("experience", e.target.value)
                      }
                      placeholder="e.g. 3+ years, Entry level, Senior level"
                      className={errors.experience ? "border-red-500" : ""}
                      aria-describedby={
                        errors.experience ? "experience-error" : undefined
                      }
                    />
                    {errors.experience && (
                      <p
                        id="experience-error"
                        className="text-sm text-red-500 flex items-center gap-1"
                      >
                        <AlertCircle className="h-4 w-4" />
                        {errors.experience}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="description"
                      className="px-1 text-[var(--word)]/90"
                    >
                      Job Description <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      placeholder="Provide a detailed description of the job..."
                      rows={4}
                      className={errors.description ? "border-red-500" : ""}
                      aria-describedby={
                        errors.description ? "description-error" : undefined
                      }
                    />
                    {errors.description && (
                      <p
                        id="description-error"
                        className="text-sm text-red-500 flex items-center gap-1"
                      >
                        <AlertCircle className="h-4 w-4" />
                        {errors.description}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Job Details Tab */}
            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Responsibilities */}
                <Card>
                  <CardHeader>
                    <h1 className="text-semibold text-center text-[var(--word)]/90">
                      Responsibilities <span className="text-red-500">*</span>
                    </h1>
                  </CardHeader>
                  <CardContent className="space-y-3 p-4 ">
                    {formData.responsibilities.map((responsibility, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={responsibility}
                          onChange={(e) =>
                            handleListItemChange(
                              "responsibilities",
                              index,
                              e.target.value
                            )
                          }
                          placeholder="Add a responsibility..."
                          className="flex-1"
                        />
                        {formData.responsibilities.length > 1 && (
                          <Button
                            type="button"
                            // variant="outline"
                            className="bg-red-50 text-red-600 hover:bg-red-100 "
                            size="icon"
                            onClick={() =>
                              removeListItem("responsibilities", index)
                            }
                            aria-label={`Remove responsibility ${index + 1}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      // variant="outline"
                      size="sm"
                      onClick={() => addListItem("responsibilities")}
                      className="w-full bg-[var(--green)]/20 text-[var(--green)]"
                    >
                      <Plus className="h-4 w-4 mr-2 " />
                      Add Responsibility
                    </Button>
                    {errors.responsibilities && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          {errors.responsibilities}
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>

                {/* Requirements */}
                <Card>
                  <CardHeader>
                    <h1 className="text-semibold text-center text-[var(--word)]/90">
                      Requirements <span className="text-red-500">*</span>
                    </h1>
                  </CardHeader>
                  <CardContent className="space-y-3 p-4">
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
                          className="flex-1"
                        />
                        {formData.requirements.length > 1 && (
                          <Button
                            type="button"
                            className="bg-red-50 text-red-600 hover:bg-red-100 "
                            size="icon"
                            onClick={() =>
                              removeListItem("requirements", index)
                            }
                            aria-label={`Remove requirement ${index + 1}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => addListItem("requirements")}
                      className="w-full bg-[var(--green)]/20 text-[var(--green)]"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Requirement
                    </Button>
                    {errors.requirements && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          {errors.requirements}
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>

                {/* Preferred Qualifications */}
                <Card>
                  <CardHeader>
                    <h1 className="text-semibold text-center text-[var(--word)]/90">
                      Nice to Have
                    </h1>
                  </CardHeader>
                  <CardContent className="space-y-3 p-4">
                    {formData.preferred.map((preferred, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={preferred}
                          onChange={(e) =>
                            handleListItemChange(
                              "preferred",
                              index,
                              e.target.value
                            )
                          }
                          placeholder="Add a preferred qualification..."
                          className="flex-1"
                        />
                        {formData.preferred.length > 1 && (
                          <Button
                            type="button"
                            className="bg-red-50 text-red-600 hover:bg-red-100 "
                            size="icon"
                            onClick={() => removeListItem("preferred", index)}
                            aria-label={`Remove preferred qualification ${
                              index + 1
                            }`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => addListItem("preferred")}
                      className="w-full bg-[var(--green)]/20 text-[var(--green)]"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Preferred Qualification
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Compensation Tab */}
            <TabsContent value="compensation" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <h1 className="text-semibold text-center text-[var(--word)]/90">
                      Salary Range
                    </h1>
                  </CardHeader>
                  <CardContent className="space-y-4 p-4">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor="salary-min">Minimum</Label>
                        <Input
                          id="salary-min"
                          type="number"
                          value={formData.salary?.min || ""}
                          onChange={(e) =>
                            handleSalaryChange("min", e.target.value)
                          }
                          placeholder="50000"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="salary-max">Maximum</Label>
                        <Input
                          id="salary-max"
                          type="number"
                          value={formData.salary?.max || ""}
                          onChange={(e) =>
                            handleSalaryChange("max", e.target.value)
                          }
                          placeholder="80000"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="salary-currency">Currency</Label>
                        <Select
                          value={formData.salary?.currency || "USD"}
                          onValueChange={(value) =>
                            handleSalaryChange("currency", value)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="BDT">BDT</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    {errors.salary && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errors.salary}</AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <h1 className="text-semibold text-center text-[var(--word)]/90">
                      Benefits
                    </h1>
                  </CardHeader>
                  <CardContent className="space-y-3 p-4">
                    {formData.benefits.map((benefit, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={benefit}
                          onChange={(e) =>
                            handleListItemChange(
                              "benefits",
                              index,
                              e.target.value
                            )
                          }
                          placeholder="Add a benefit..."
                          className="flex-1"
                        />
                        {formData.benefits.length > 1 && (
                          <Button
                            type="button"
                            className="bg-red-50 text-red-600 hover:bg-red-100"
                            size="icon"
                            onClick={() => removeListItem("benefits", index)}
                            aria-label={`Remove benefit ${index + 1}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => addListItem("benefits")}
                      className="w-full bg-[var(--green)]/20 text-[var(--green)]"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Benefit
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Job Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="status-switch">Active Job Listing</Label>
                      <p className="text-sm text-muted-foreground">
                        When enabled, this job will be visible to applicants on
                        the careers page.
                      </p>
                    </div>
                    <Switch
                      id="status-switch"
                      checked={formData.status === true }
                      onCheckedChange={(checked) =>
                        handleInputChange(
                          "status",
                          checked ? true : false  
                        )
                      }
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Preview</Label>
                    <div className="border rounded-lg p-4 bg-muted/50">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium">
                            {formData.title || "Job Title"}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {formData.department.charAt(0).toUpperCase() +
                              formData.department.slice(1)}{" "}
                            • {formData.location || "Location"}
                          </p>
                        </div>
                        <Badge
                          variant={
                            formData.status === true
                              ? "default"
                              : "secondary"
                          }
                        >
                          {formData.status === true ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-sm line-clamp-2">
                        {formData.description ||
                          "Job description will appear here..."}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline">{formData.type}</Badge>
                        <Badge variant="outline">
                          {formData.experience || "Experience level"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <ModalFooter>
            <Button
              type="button"
              // variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="bg-red-50 text-red-600 hover:bg-red-100 "
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-[120px] bg-[var(--green)]/80  text-white hover:bg-[var(--green)]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {mode === "create" ? "Creating..." : "Updating..."}
                </>
              ) : (
                <>{mode === "create" ? "Create Job" : "Update Job"}</>
              )}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
