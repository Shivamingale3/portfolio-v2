"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function AboutPage() {
  const [about, setAbout] = useState({
    summary:
      "I'm a passionate full-stack developer with over 5 years of experience...",
    skills: "React, Node.js, TypeScript, Python, AWS",
    experience: "5+ years of professional experience in web development",
    education: "Master's in Computer Science from Stanford University",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedAbout, setEditedAbout] = useState(about);

  const handleSave = () => {
    setAbout(editedAbout);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Manage About Section
        </h2>
        <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit Content"}
        </Button>
      </div>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
        </TabsList>
        {Object.entries(about).map(([key, value]) => (
          <TabsContent key={key} value={key}>
            <Card>
              <CardHeader>
                <CardTitle>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </CardTitle>
                <CardDescription>
                  Edit your {key} information here. Click save when you're done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {isEditing ? (
                  <Textarea
                    value={editedAbout[key as keyof typeof editedAbout]}
                    onChange={(e) =>
                      setEditedAbout({ ...editedAbout, [key]: e.target.value })
                    }
                    className="min-h-[200px]"
                  />
                ) : (
                  <p className="whitespace-pre-wrap">{value}</p>
                )}
              </CardContent>
              {isEditing && (
                <CardFooter>
                  <Button onClick={handleSave}>Save Changes</Button>
                </CardFooter>
              )}
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
