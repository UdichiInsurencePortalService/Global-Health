import React, { useState } from 'react';
import moment from 'moment';

const depreciationChart = [
    { maxAge: 0.5, rate: 5 },
    { maxAge: 1, rate: 15 },
    { maxAge: 2, rate: 20 },
    { maxAge: 3, rate: 30 },
    { maxAge: 4, rate: 40 },
    { maxAge: 5, rate: 50 },
    { maxAge: 6, rate: 55 },
    { maxAge: 7, rate: 60 },
    { maxAge: 8, rate: 65 },
    { maxAge: 9, rate: 70 },
    { maxAge: 10, rate: 75 },
    { maxAge: 11, rate: 80 },
    { maxAge: 12, rate: 85 },
    { maxAge: 13, rate: 90 },
    { maxAge: 15, rate: 95 }
];

const BASE_PREMIUM_RATE = 3; // 3% of IDV

const calculateIDV = (vehiclePrice, purchaseDate) => {
    if (!vehiclePrice || !purchaseDate) return null;
    
    const purchaseMoment = moment(purchaseDate, 'YYYY-MM-DD');
    const currentMoment = moment();
    if (purchaseMoment.isAfter(currentMoment)) {
        return { error: "Purchase date cannot be in the future." };
    }
    
    const ageInYears = currentMoment.diff(purchaseMoment, 'years', true);

    if (ageInYears > 15) return { error: "Vehicle age exceeds 15 years. IDV cannot be calculated." };
    
    let depreciationRate = 95; // Default maximum depreciation
    for (const bracket of depreciationChart) {
        if (ageInYears <= bracket.maxAge) {
            depreciationRate = bracket.rate;
            break;
        }
    }

    const depreciationAmount = vehiclePrice * (depreciationRate / 100);
    const idv = vehiclePrice - depreciationAmount;
    const totalPremium = idv * (BASE_PREMIUM_RATE / 100);
    
    return {
        ageInYears: ageInYears.toFixed(2),
        depreciationRate: depreciationRate + '%',
        idv: idv > 0 ? idv.toFixed(2) : "0.00",
        totalPremium: totalPremium.toFixed(2)
    };
};

const IDVCalculator = () => {
    const [purchaseDate, setPurchaseDate] = useState('');
    const [vehiclePrice, setVehiclePrice] = useState( 1040000 ); // Default price
    const [idvDetails, setIdvDetails] = useState(null);

    const handleCalculate = () => {
        if (!purchaseDate) return;
        const result = calculateIDV(vehiclePrice, purchaseDate);
        setIdvDetails(result);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
            <h2>IDV Calculator</h2>
            <div>
                <label htmlFor="purchase-date">Purchase Date:</label>
                <input 
                    id="purchase-date"
                    type="date" 
                    value={purchaseDate} 
                    onChange={(e) => setPurchaseDate(e.target.value)} 
                />
            </div>
            <p><strong>Ex-Showroom Price:</strong> ₹{vehiclePrice}</p>
            <button onClick={handleCalculate}>Calculate IDV</button>
            {idvDetails && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Results</h3>
                    {idvDetails.error ? (
                        <p style={{ color: 'red' }}>{idvDetails.error}</p>
                    ) : (
                        <>
                            <p>Vehicle Age: {idvDetails.ageInYears} years</p>
                            <p>Depreciation Rate: {idvDetails.depreciationRate}</p>
                            <p><strong>IDV: ₹{idvDetails.idv}</strong></p>
                            <p><strong>Total Premium: ₹{idvDetails.totalPremium}</strong></p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default IDVCalculator;
