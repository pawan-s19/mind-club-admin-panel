import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";

interface WorkshopSkillsRequiredProps {
    skills: {
        headingOfSection: string;
        skills: string[];
    };
    onSkillsChange: (skills: { headingOfSection: string; skills: string[] }) => void;
}

export default function WorkshopSkillsRequired({
    skills,
    onSkillsChange,
}: WorkshopSkillsRequiredProps) {
    // Provide default values to prevent runtime errors
    const safeSkills = skills && Array.isArray(skills.skills)
        ? skills
        : { headingOfSection: '', skills: [] };
    const safeOnSkillsChange = typeof onSkillsChange === 'function'
        ? onSkillsChange
        : () => {};

    const [inputSkill, setInputSkill] = useState("");

    const handleAddSkill = () => {
        const trimmedSkill = inputSkill.trim();
        if (trimmedSkill && !safeSkills.skills.includes(trimmedSkill)) {
            safeOnSkillsChange({
                ...safeSkills,
                skills: [...safeSkills.skills, trimmedSkill],
            });
            setInputSkill("");
        }
    };

    const handleRemoveSkill = (index: number) => {
        const newSkills = safeSkills.skills.filter((_, i) => i !== index);
        safeOnSkillsChange({ ...safeSkills, skills: newSkills });
    };

    return (
        <ComponentCard title="Workshop Skills Required (Section 6)">
            <input
                type="text"
                className="w-full p-2 border rounded mb-2"
                placeholder="Section Heading"
                value={safeSkills.headingOfSection}
                onChange={e => safeOnSkillsChange({ ...safeSkills, headingOfSection: e.target.value })}
            />
            <div className="flex mb-2">
                <input
                    type="text"
                    className="flex-1 p-2 border rounded"
                    placeholder="Add a skill"
                    value={inputSkill}
                    onChange={e => setInputSkill(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleAddSkill()}
                />
                <button
                    type="button"
                    className="ml-2 px-4 py-2 bg-blue-600 text-white rounded"
                    onClick={handleAddSkill}
                >
                    Add
                </button>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
                {safeSkills.skills.map((skill, idx) => (
                    <span key={idx} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {skill}
                        <button
                            type="button"
                            className="ml-2 text-blue-500 hover:text-red-500 focus:outline-none"
                            onClick={() => handleRemoveSkill(idx)}
                            aria-label={`Remove ${skill}`}
                        >
                            ×
                        </button>
                    </span>
                ))}
            </div>
        </ComponentCard>
    );
}
