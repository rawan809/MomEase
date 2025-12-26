import ChallengeCard from "./ChallengeCard";

const ChallengeList = () => {
  const challenges = [
    {
      title: "Emotional Overwhelm",
      description:
        "Navigating postpartum emotions and mood changes without adequate support or understanding.",
    },
    {
      title: "Information Overload",
      description:
        "Feeling lost in conflicting advice from multiple sources about baby care and self-care.",
    },
    {
      title: "Isolated Experience",
      description:
        "Missing personalized guidance and feeling alone in the journey through early motherhood.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-(--space-xl)">
      {challenges.map((challenge, index) => (
        <ChallengeCard
          key={index}
          index={index}
          title={challenge.title}
          description={challenge.description}
        />
      ))}
    </div>
  );
};

export default ChallengeList;
