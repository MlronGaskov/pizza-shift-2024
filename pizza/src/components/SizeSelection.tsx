import React from 'react';

interface SizeSelectionProps {
    size: string,
    setSize: (name: string) => void,
}

const SizeSelection: React.FC<SizeSelectionProps> = ({size, setSize}) => {
    return (
        <div className='tabs'>
            <div className='common-space'>
                <div className={`tab ${size === "SMALL" ? 'chosen-tab' : ''}`} onClick={() => setSize("SMALL")}>
                    Маленькая
                </div>
                <div className={`tab ${size === "MEDIUM" ? 'chosen-tab' : ''}`} onClick={() => setSize("MEDIUM")}>
                    Средняя
                </div>
                <div className={`tab ${size === "LARGE" ? 'chosen-tab' : ''}`} onClick={() => setSize("LARGE")}>
                    Большая
                </div>
            </div>
        </div>
    );
}

export default SizeSelection;
