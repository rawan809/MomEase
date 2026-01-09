import React from "react";

type FeatureCardProps = {
  icon: React.ComponentType;
  title: string;
  description: string;
};

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-accent border border-primary rounded-lg p-(--space-lg)">
      <div className="mb-(--space-lg)">
        <Icon />
      </div>

      <p className="text-normal font-semibold mb-(--space-sm)">{title}</p>
      <p>{description}</p>
    </div>
  );
}

export default FeatureCard;
