import React from "react";
import { Card } from "@/components/ui/card";
import { Calendar, Users, TrendingUp } from "lucide-react";

interface TrekDetailsProps {
  duration: string;
  minPeople: string;
  difficulty: string;
}

const TrekDetails = ({ duration, minPeople, difficulty }: TrekDetailsProps) => (
  <div className=" bg-gray-50">
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-gray-600">
        <Calendar className="w-4 h-4" />
        <span className="text-sm">{duration}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-600">
        <Users className="w-4 h-4" />
        <span className="text-sm">min {minPeople} people</span>
      </div>
      <div className="flex items-center gap-2 text-gray-600">
        <TrendingUp className="w-4 h-4" />
        <span className="text-sm">Difficulty: {difficulty}</span>
      </div>
    </div>
  </div>
);

export default TrekDetails;
