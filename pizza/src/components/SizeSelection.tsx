import React from 'react';

interface SizeSelectionProps {
    size: "SMALL" | "MEDIUM" | "LARGE",
    setSmall: () => void,
    setMedium: () => void,
    setLarge: () => void,
}

const SizeSelection: React.FC<SizeSelectionProps> = ({size, setLarge, setMedium, setSmall}) => {
    return (
        <div className='tabs'>
            <div className='common-space'>
                <div className={`tab ${size === "SMALL" ? 'chosen-tab' : ''}`} onClick={setSmall}>
                    Маленькая
                </div>
                <div className={`tab ${size === "MEDIUM" ? 'chosen-tab' : ''}`} onClick={setMedium}>
                    Средняя
                </div>
                <div className={`tab ${size === "LARGE" ? 'chosen-tab' : ''}`} onClick={setLarge}>
                    Большая
                </div>
            </div>
        </div>
    );
}

export default SizeSelection;
