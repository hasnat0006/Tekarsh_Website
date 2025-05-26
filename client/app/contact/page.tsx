"use client";

import type React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const dhaka =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.8982321441673!2d90.39093502525673!3d23.783126888219395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ2JzU1LjgiTiA5MMKwMjMnNDIuNCJF!5e0!3m2!1sen!2sus!4v1716143500000!5m2!1sen!2sus&markers=color:red%7Clabel:A%7C23.782176263262578,90.39511505285714&markers=color:green%7Clabel:B%7C23.784077573537783,90.39350384473394";
  
  const usa =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.001!2d-77.07113!3d38.896588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDUzJzQ3LjciTiA3N8KwMDQnMTYuMSJX!5e0!3m2!1sen!2sus!4v1716143500000!5m2!1sen!2sus&markers=color:red%7Clabel:A%7C38.895267,-77.0712667&markers=color:green%7Clabel:B%7C38.896588,-77.07113";
  
  const [mapSource, setMapSource] = useState("dhaka");


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
    alert("Message sent successfully!");
    setFormData({ fullName: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="flex items-start mt-10 justify-center min-h-screen">
      <Tabs defaultValue="contact" className="w-3xl">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="contact" className="hover:bg-[var(--green)]/10">
            Contact
          </TabsTrigger>
          <TabsTrigger value="visit" className="hover:bg-[var(--green)]/10">
            Visit Us
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="contact"
          className="flex items-center justify-center"
        >
          <form
            onSubmit={handleSubmit}
            className="space-y-6 border-2 border-[var(--word)]/30 m-4 text-[var(--word)] w-2xl items-center justify-center p-4 rounded-md"
          >
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className=""
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
                className=""
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is this about?"
                required
                className=""
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                required
                className="min-h-[150px] "
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              Send Message
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="visit">
          <div className="flex-row items-center justify-center w-full border-2 border-[var(--word)]/30 text-[var(--word)] rounded-md">
            <div className="mb-4 border-[var(--word)]/30 mx-4 text-[var(--word)] items-center justify-center px-4 rounded-md grid grid-cols-2 gap-5">
              <div className="space-y-4 p-4 border-r-2 border-[var(--word)]/30">
                <h3 className="text-xl pl-1 text-[var(--word)]/60 font-semibold mb-4">
                  Bangladesh Branch
                </h3>
                <div
                  className="flex -mt-2 items-start text-[var(--word)]/50 hover:text-blue-400 hover:cursor-pointer"
                  onClick={() => {
                    setMapSource("dhaka");
                  }}
                >
                  <MapPin className="w-5 h-5 mt-3 mr-3" />
                  <div>
                    <p className="">Road-22, Mohakhali DOHS</p>
                    <p className="">Dhaka, Bangladesh</p>
                  </div>
                </div>

                <div className="flex -mt-2 items-center text-[var(--word)]/50">
                  <Mail className="w-5 h-5 mr-3" />
                  <p className="">info@example.com</p>
                </div>
                <div className="flex -mt-2 items-center text-[var(--word)]/50">
                  <Phone className="w-5 h-5 mr-3" />
                  <p className="">+880 1234-567890</p>
                </div>
              </div>
              <div className="space-y-4p-4">
                <h3 className="text-xl pl-1 text-[var(--word)]/60 font-semibold mb-4">
                  US Branch
                </h3>
                <div
                  className="flex -mt-2 items-start text-[var(--word)]/50  hover:text-blue-400 hover:cursor-pointer"
                  onClick={() => {
                    setMapSource("usa");
                  }}
                >
                  <MapPin className="w-5 h-5 mt-3 mr-3" />
                  <div>
                    <p className="">Arlington, VA 22209</p>
                    <p className="">United States</p>
                  </div>
                </div>

                <div className="flex -mt-0 items-center text-[var(--word)]/50">
                  <Mail className="w-5 h-5 mr-3" />
                  <p className="">info@example.com</p>
                </div>
                <div className="flex mt-2 items-center text-[var(--word)]/50">
                  <Phone className="w-5 h-5 mr-3" />
                  <p className="">+880 1234-567890</p>
                </div>
              </div>
            </div>
            <div className="w-full h-[500px] rounded-lg overflow-hidden border border-[var(--word)]/10 shadow-md">
              <GoogleMap src={mapSource === "dhaka" ? dhaka : usa} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function GoogleMap( { src } : { src: string }) {
  return (
    <iframe
      src={src}
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen={false}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
