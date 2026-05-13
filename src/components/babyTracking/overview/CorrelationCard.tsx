import { Card, CardContent } from "@/components/ui/card";

type Props = {
  data: {
    sleepAndGrowth: {
      hasCorrelation: boolean;
      type: string;
      message: string;
    };

    feedingAndGrowth: {
      hasCorrelation: boolean;
      type: string;
      message: string;
    };

    overallInsight: string;
  };
};

function CorrelationCard({ data }: Props) {
  return (
    <Card className="border-none shadow-none bg-gray-50">
      <CardContent className="space-y-5 p-5">
        <div>
          <p className="text-sm font-semibold">
            Relationship analysis between sleep, feeding and growth
          </p>
        </div>

        {/* Sleep */}
        <div className="bg-white rounded-2xl p-4 border">
          <div className="flex items-center justify-between">
            <p className="font-medium">Sleep & Growth</p>

            <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
              {data.sleepAndGrowth.type}
            </span>
          </div>

          <p className="text-sm text-gray-600 mt-3">
            {data.sleepAndGrowth.message}
          </p>
        </div>

        {/* Feeding */}
        <div className="bg-white rounded-2xl p-4 border">
          <div className="flex items-center justify-between">
            <p className="font-medium">Feeding & Growth</p>

            <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
              {data.feedingAndGrowth.type}
            </span>
          </div>

          <p className="text-sm text-gray-600 mt-3">
            {data.feedingAndGrowth.message}
          </p>
        </div>

        {/* Overall */}
        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4">
          <p className="text-sm text-primary font-medium">
            {data.overallInsight}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default CorrelationCard;
