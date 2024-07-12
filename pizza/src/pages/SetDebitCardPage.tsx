import * as React from "react";

import "../style/SetDebitCardPage.css"
import { debitCard } from "../components/Router";


interface SetCardProps {
    prevCardInfo: debitCard,
    setCardInfo: React.Dispatch<React.SetStateAction<debitCard>>,
    onClick: () => void
}


const InputPanComponent: React.FC<{label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}> = ({label, value, onChange}) => {
    return (
        <div className="info-pan-input">
            <div className="info-pan-input-content">
                <p className="info-pan-input-label">{label}</p>
                <div className="input-pan-default">
                    <div className="input-pan-default-content">
                        <input
                            type="text"
                            value={value}
                            onChange={onChange}
                            className="input-pan-default-text"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

const SmallInputComponent: React.FC<{label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}> = ({label, value, onChange}) => {
    return (
        <div className="info-small-input">
            <div className="info-small-input-content">
                <p className="info-small-input-label">{label}</p>
                <div className="input-small-default">
                    <div className="input-small-default-content">
                        <input
                            type="text"
                            value={value}
                            onChange={onChange}
                            className="input-small-default-text"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

const SetDebitCardPage: React.FC<SetCardProps> = ({ prevCardInfo, setCardInfo, onClick}) => {
    const handleChange = (field: string, value: string) => {
        setCardInfo(prevCardInfo => ({ ...prevCardInfo, [field]: value }));
    };

    return (
        <div className="set-card-info-page">
            <h2 className="set-card-info-page-text1">Введите данные карты для оплаты</h2>
            <div className="set-card-info-page-card">
                <InputPanComponent label="Номер*" value={prevCardInfo.pan} onChange={(e) => handleChange('pan', e.target.value)}></InputPanComponent>
                <div className="set-card-frame">
                    <SmallInputComponent label="Срок*" value={prevCardInfo.expireDate} onChange={(e) => handleChange('expireDate', e.target.value)}></SmallInputComponent>
                    <SmallInputComponent label="cvv*" value={prevCardInfo.cvv} onChange={(e) => handleChange('cvv', e.target.value)}></SmallInputComponent>
                </div>
            </div>
            <button className="pay-button" onClick={onClick}>
                <div className="pay-button-text">
                    Оплатить
                </div>
            </button>
        </div>
    );
};

export default SetDebitCardPage;