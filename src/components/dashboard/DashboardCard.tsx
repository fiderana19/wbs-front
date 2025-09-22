import { FunctionComponent, ReactNode } from "react";
import { Card } from "../ui/card";

type DashboardCardProps = {
  children: ReactNode;
  title: string;
  value: string;
};

const DashboardCard: FunctionComponent<DashboardCardProps> = ({
  children,
  title,
  value,
}) => {
  return (
    <Card className="w-max p-5">
      <div className="flex justify-center items-center gap-3">
        <div>{children}</div>
        <div>
          <div className="text-gray-500">{title}</div>
          <div className="text-3xl font-semibold">{value}</div>
        </div>
      </div>
    </Card>
  );
};

export default DashboardCard;
