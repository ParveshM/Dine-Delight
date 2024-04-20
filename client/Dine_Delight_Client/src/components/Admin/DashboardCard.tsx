import React, { ReactNode } from "react";
interface DashboardCardProps {
  Icon: ReactNode;
  label: string;
  data: number;
  className?: string;
  showPriceSymbol?: boolean;
}
const DashboardCard: React.FC<DashboardCardProps> = ({
  Icon,
  label,
  data,
  className,
  showPriceSymbol,
}) => {
  return (
    <div className="col-span-6 md:col-span-3 ">
      <div className=" h-full flex items-center p-4 bg-white rounded-lg shadow-md ">
        <div className={`p-3 mr-4 ${className} rounded-full`}>{Icon}</div>
        <div>
          <p className="mb-2 text-sm font-medium text-gray-600">{label}</p>
          <p className="text-lg font-semibold text-gray-700">
            {showPriceSymbol && "₹"}
            {data}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
