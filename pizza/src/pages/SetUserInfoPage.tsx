import * as React from "react";

import "../style/SetUserInfoPage.css"
import { NavLink } from "react-router-dom";
import { personInfo, receiverAddress } from "../components/Router";


interface SetUserInfoProps {
    prevPersonInfo: personInfo,
    setPerson: React.Dispatch<React.SetStateAction<personInfo>>,
    prevAddress: receiverAddress,
    setAddress: React.Dispatch<React.SetStateAction<receiverAddress>>
}


const InputComponent: React.FC<{label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}> = ({label, value, onChange}) => {
    return (
        <div className="info-input">
            <div className="info-input-content">
                <p className="info-input-label">{label}</p>
                <div className="input-default">
                    <div className="input-default-content">
                        <input
                            type="text"
                            value={value}
                            onChange={onChange}
                            className="input-default-text"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

const SetUserInfoPage: React.FC<SetUserInfoProps> = ({ prevPersonInfo, setPerson, prevAddress, setAddress }) => {
    const handlePersonChange = (field: string, value: string) => {
        setPerson(prevPerson => ({ ...prevPerson, [field]: value }));
    };

    const handleAddressChange = (field: string, value: string) => {
        setAddress(prevAddress => ({ ...prevAddress, [field]: value }));
    };

    return (
        <div className="set-user-info-page">
            <h2 className="set-user-info-page-text1">Введите ваши данные</h2>
            <InputComponent label="Фамилия" value={prevPersonInfo.lastName} onChange={(e) => handlePersonChange('lastName', e.target.value)}></InputComponent>
            <InputComponent label="Имя" value={prevPersonInfo.firstName} onChange={(e) => handlePersonChange('firstName', e.target.value)}></InputComponent>
            <InputComponent label="Отчество" value={prevPersonInfo.middleName} onChange={(e) => handlePersonChange('middleName', e.target.value)}></InputComponent>
            <InputComponent label="Номер телефона" value={prevPersonInfo.phone} onChange={(e) => handlePersonChange('phone', e.target.value)}></InputComponent>
            <InputComponent label="Улица" value={prevAddress.street} onChange={(e) => handleAddressChange('street', e.target.value)}></InputComponent>
            <InputComponent label="Дом" value={prevAddress.house} onChange={(e) => handleAddressChange('house', e.target.value)}></InputComponent>
            <InputComponent label="Квартира" value={prevAddress.apartment} onChange={(e) => handleAddressChange('apartment', e.target.value)}></InputComponent>
            <InputComponent label="Комментарий" value={prevAddress.comment} onChange={(e) => handleAddressChange('comment', e.target.value)}></InputComponent>
            <div className="set-user-info-page-buttons">
                <NavLink to="/cart" className="set-user-info-page-button1 empty-nav-link">
                    <div className="set-user-info-page-button1-text">Назад</div>
                </NavLink>
                <NavLink to="/set_debit_card_info" className="set-user-info-page-button2 empty-nav-link">
                    <div className="set-user-info-page-button2-text">Продолжить</div>
                </NavLink>
            </div>
        </div>
    );
};

export default SetUserInfoPage;