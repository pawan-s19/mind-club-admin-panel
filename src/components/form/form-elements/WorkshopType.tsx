import { useState, useEffect } from "react";
import ComponentCard from "../../common/ComponentCard";
import Checkbox from "../input/Checkbox";

interface WorkshopTypeProps {
  onTypeChange: (type: 'online' | 'on field') => void;
}

export default function WorkshopType({ onTypeChange }: WorkshopTypeProps) {
    const [isOnline, setIsOnline] = useState(true);
    const [isOnField, setIsOnField] = useState(false);

    const handleOnlineChange = (checked: boolean) => {
        setIsOnline(checked);
        setIsOnField(!checked);
        onTypeChange(checked ? 'online' : 'on field');
    };

    const handleOnFieldChange = (checked: boolean) => {
        setIsOnField(checked);
        setIsOnline(!checked);
        onTypeChange(checked ? 'on field' : 'online');
    };

    return (
        <ComponentCard title="Workshop Type">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                    <Checkbox 
                        checked={isOnline} 
                        onChange={handleOnlineChange} 
                    />
                    <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                        Online
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <Checkbox
                        checked={isOnField}
                        onChange={handleOnFieldChange}
                        label="On Field"
                    />
                </div>
            </div>
        </ComponentCard>
    );
}
