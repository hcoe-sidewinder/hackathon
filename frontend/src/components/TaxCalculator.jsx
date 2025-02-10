import {
  Calculator,
  ArrowLeft,
  Landmark,
  PiggyBank,
  Award,
} from "lucide-react";
import { useState } from "react";

// BigInt version of the Math.min function
const bigIntMin = (a, b) => {
  const aBig = BigInt(Math.round(Number(a)));
  const bBig = BigInt(Math.round(Number(b)));
  return aBig < bBig ? Number(aBig) : Number(bBig);
};

const TaxCalculator = ({ onBack }) => {
  const [income, setIncome] = useState("");
  const [deductions, setDeductions] = useState("");
  const [donation, setDonation] = useState("");
  const [results, setResults] = useState({
    taxBeforeDonation: 0,
    maxDeductibleDonation: 0,
    taxAfterDonation: 0,
    taxSaved: 0,
    creditsEarned: 0,
  });

  const formatLargeNumber = (number) => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(number);
  };

  const Section = ({ title, icon, children }) => (
    <div className="mt-6 p-4 rounded-md transition-all duration-300 ease-in-out bg-white/80 hover:bg-white/90 hover:shadow-lg relative">
      <div className="flex items-center gap-2 text-xl font-semibold text-textColor mb-4">
        <div className="transform transition-all duration-300 group-hover:scale-110">
          {icon}
        </div>
        <h3>{title}</h3>
      </div>
      <div className="relative">{children}</div>
    </div>
  );

  const validateNumberInput = (value) => {
    if (value === "") return true;
    const num = Number(value);
    return !isNaN(num) && num >= 0 && num <= 10000000000000000;
  };

  const handleNumberInput = (value, setter) => {
    if (validateNumberInput(value)) {
      setter(value);
    }
  };

  const calculateTax = () => {
    const incomeNum = Number(income);
    const deductionsNum = Number(deductions);
    const donationNum = Number(donation);

    const maxDonation = incomeNum * 0.1;
    const effectiveDonation = bigIntMin(donationNum, maxDonation);
    const taxableBeforeDonation = Math.max(0, incomeNum - deductionsNum);
    const taxableAfterDonation = Math.max(
      0,
      taxableBeforeDonation - effectiveDonation
    );

    const taxBefore = calculateTaxAmount(taxableBeforeDonation);
    const taxAfter = calculateTaxAmount(taxableAfterDonation);
    const credits = (effectiveDonation / 1000000) * 1.5;

    setResults({
      taxBeforeDonation: taxBefore,
      maxDeductibleDonation: maxDonation,
      taxAfterDonation: taxAfter,
      taxSaved: taxBefore - taxAfter,
      creditsEarned: credits,
    });
  };

  const calculateTaxAmount = (taxable) => {
    let tax = 0;
    if (taxable <= 300000) {
      tax = 0;
    } else if (taxable <= 600000) {
      tax = (taxable - 300000) * 0.05;
    } else if (taxable <= 900000) {
      tax = 15000 + (taxable - 600000) * 0.1;
    } else if (taxable <= 1200000) {
      tax = 45000 + (taxable - 900000) * 0.15;
    } else if (taxable <= 1500000) {
      tax = 90000 + (taxable - 1200000) * 0.2;
    } else {
      tax = 150000 + (taxable - 1500000) * 0.3;
    }
    return tax;
  };

  const ResultRow = ({ label, value, isHighlighted = false }) => (
    <div
      className={`flex justify-between p-3 ${
        isHighlighted ? "bg-bgColor/10" : "bg-bgColor/5"
      } rounded-md transition-all duration-300 hover:bg-bgColor/10`}
    >
      <span className="text-gray-700">{label}</span>
      <span
        className={`font-semibold ${
          isHighlighted ? "text-hoverColor" : "text-textColor"
        }`}
      >
        {typeof value === "number" ? `Nrs. ${formatLargeNumber(value)}` : value}
      </span>
    </div>
  );

  return (
    <div>
      {/* <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-md overflow-hidden w-full max-w-3xl p-8 transition-all duration-300 hover:shadow-2xl"> */}
      <Section title="Income Details" icon={<Landmark className="w-6 h-6" />}>
        <div className="space-y-3">
          <div className="flex flex-col p-3 bg-bgColor/5 rounded-md transition-all duration-300 hover:bg-bgColor/10">
            <label className="text-gray-700 mb-2">Annual Income</label>
            <input
              type="number"
              value={income}
              onChange={(e) => handleNumberInput(e.target.value, setIncome)}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-bgColor"
              placeholder="Enter your annual income"
              max="10000000000000000"
              min="0"
            />
          </div>

          <div className="flex flex-col p-3 bg-bgColor/5 rounded-md transition-all duration-300 hover:bg-bgColor/10">
            <label className="text-gray-700 mb-2">Planned Donation</label>
            <input
              type="number"
              value={donation}
              onChange={(e) => handleNumberInput(e.target.value, setDonation)}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-bgColor"
              placeholder="Enter planned donation amount"
              max="10000000000000000"
              min="0"
            />
          </div>
        </div>
      </Section>

      <Section
        title="Tax Calculation Results"
        icon={<PiggyBank className="w-6 h-6" />}
      >
        <div className="space-y-2">
          <ResultRow
            label="Tax Before Donation"
            value={results.taxBeforeDonation}
          />
          <ResultRow
            label="Max Deductible Donation (10% of income)"
            value={results.maxDeductibleDonation}
          />
          <ResultRow
            label="Tax After Donation Deduction"
            value={results.taxAfterDonation}
          />
          <ResultRow
            label="Tax Return (Tax Saved)"
            value={results.taxSaved}
            isHighlighted={true}
          />
        </div>
      </Section>

      <Section title="Credits Earned" icon={<Award className="w-6 h-6" />}>
        <div className="p-3 bg-bgColor/5 rounded-md transition-all duration-300 hover:bg-bgColor/10">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Total Credits</span>
            <span className="font-bold text-xl text-hoverColor">
              {results.creditsEarned.toFixed(2)} credits
            </span>
          </div>
        </div>
      </Section>

      <div className="flex justify-center mt-8">
        <button
          onClick={calculateTax}
          className="group flex items-center gap-2 bg-bgColor text-white px-8 py-4 rounded-md transition-all duration-300 hover:bg-hoverColor hover:shadow-lg active:scale-95"
        >
          <Calculator className="w-9 h-5 transition-transform duration-300 group-hover:scale-110" />
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            Calculate
          </span>
        </button>
      </div>
      {/* </div> */}
    </div>
  );
};

export default TaxCalculator;
