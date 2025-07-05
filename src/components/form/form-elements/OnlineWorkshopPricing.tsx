import React from 'react';

interface OnlineWorkshopPricingProps {
  price: {
    amount: number;
    currency: string;
  };
  onPriceChange: (data: Partial<{
    amount: number;
    currency: string;
  }>) => void;
}

const OnlineWorkshopPricing: React.FC<OnlineWorkshopPricingProps> = ({
  price,
  onPriceChange
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          🔹 SECTION 2: Pricing
        </h3>
      </div>
      <div className="p-6.5">
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Price Amount <span className="text-meta-1">*</span>
          </label>
          <input
            type="number"
            placeholder="Enter price amount"
            value={price.amount}
            onChange={(e) => onPriceChange({ amount: parseFloat(e.target.value) || 0 })}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Currency
          </label>
          <select
            value={price.currency}
            onChange={(e) => onPriceChange({ currency: e.target.value })}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          >
            <option value="INR">INR (Indian Rupee)</option>
            <option value="USD">USD (US Dollar)</option>
            <option value="EUR">EUR (Euro)</option>
            <option value="GBP">GBP (British Pound)</option>
          </select>
        </div>


      </div>
    </div>
  );
};

export default OnlineWorkshopPricing; 