import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Checkbox from "../input/Checkbox";

interface WorkshopSubHeroPageProps {
  subHeroHeading: string;
  onSubHeroHeadingChange: (heading: string) => void;
}

export default function WorkshopSubHeroPage({ subHeroHeading, onSubHeroHeadingChange }: WorkshopSubHeroPageProps) {
    return (
        <ComponentCard title="Workshop Sub Heading (Section 5)">
            <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Enter sub hero heading"
                value={subHeroHeading}
                onChange={e => onSubHeroHeadingChange(e.target.value)}
            />
        </ComponentCard>
    );
}
