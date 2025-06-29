import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MentorProps {
  mentor: {
    id: number;
    name: string;
    expertise: string;
    experience: string;
    description: string;
  };
}

export const MentorCard: React.FC<MentorProps> = ({ mentor }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{mentor.name}</CardTitle>
            <CardDescription className="mt-1">
              {mentor.experience}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            Retired
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-2">
          <span className="font-medium">Expertise:</span> {mentor.expertise}
        </div>
        <p className="text-muted-foreground">{mentor.description}</p>
      </CardContent>
    </Card>
  );
};
