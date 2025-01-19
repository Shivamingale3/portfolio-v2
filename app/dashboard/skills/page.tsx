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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Pencil, Plus, Trash } from "lucide-react";
import { useState } from "react";

interface Skill {
  id: number;
  name: string;
  level: number;
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([
    { id: 1, name: "React", level: 90 },
    { id: 2, name: "Node.js", level: 85 },
    { id: 3, name: "TypeScript", level: 80 },
    { id: 4, name: "Python", level: 75 },
  ]);
  const [newSkill, setNewSkill] = useState<Omit<Skill, "id">>({
    name: "",
    level: 50,
  });
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const addSkill = () => {
    if (newSkill.name) {
      setSkills([...skills, { id: Date.now(), ...newSkill }]);
      setNewSkill({ name: "", level: 50 });
    }
  };

  const updateSkill = () => {
    if (editingSkill) {
      setSkills(
        skills.map((s) => (s.id === editingSkill.id ? editingSkill : s))
      );
      setEditingSkill(null);
    }
  };

  const removeSkill = (skillId: number) => {
    setSkills(skills.filter((skill) => skill.id !== skillId));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Manage Skills</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Skill</DialogTitle>
              <DialogDescription>
                Add a new skill and its proficiency level here. Click save when
                you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Skill Name
                </Label>
                <Input
                  id="name"
                  value={newSkill.name}
                  onChange={(e) =>
                    setNewSkill({ ...newSkill, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="level" className="text-right">
                  Proficiency Level
                </Label>
                <div className="col-span-3 flex items-center gap-4">
                  <Slider
                    id="level"
                    min={0}
                    max={100}
                    step={1}
                    value={[newSkill.level]}
                    onValueChange={(value) =>
                      setNewSkill({ ...newSkill, level: value[0] })
                    }
                    className="flex-grow"
                  />
                  <span>{newSkill.level}%</span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={addSkill}>Save Skill</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => (
          <Card key={skill.id}>
            <CardHeader>
              <CardTitle>{skill.name}</CardTitle>
              <CardDescription>Proficiency: {skill.level}%</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={skill.level} className="w-full" />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Skill</DialogTitle>
                    <DialogDescription>
                      Make changes to your skill here. Click save when you're
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-name" className="text-right">
                        Skill Name
                      </Label>
                      <Input
                        id="edit-name"
                        value={editingSkill?.name || ""}
                        onChange={(e) =>
                          setEditingSkill(
                            editingSkill
                              ? { ...editingSkill, name: e.target.value }
                              : null
                          )
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-level" className="text-right">
                        Proficiency Level
                      </Label>
                      <div className="col-span-3 flex items-center gap-4">
                        <Slider
                          id="edit-level"
                          min={0}
                          max={100}
                          step={1}
                          value={[editingSkill?.level || 0]}
                          onValueChange={(value) =>
                            setEditingSkill(
                              editingSkill
                                ? { ...editingSkill, level: value[0] }
                                : null
                            )
                          }
                          className="flex-grow"
                        />
                        <span>{editingSkill?.level || 0}%</span>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={updateSkill}>Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button
                variant="destructive"
                onClick={() => removeSkill(skill.id)}
              >
                <Trash className="mr-2 h-4 w-4" />
                Remove
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
