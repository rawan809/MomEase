import ChallengeCard from "./ChallengeCard";
import challenge1 from "../../assets/images/challenge1.png";
import challenge2 from "../../assets/images/challenge2.png";
import challenge3 from "../../assets/images/challenge3.png";

const ChallengeList = () => {
  const challenges = [
    {
      title: "Emotional Overwhelm",
      description:
        "Navigating postpartum emotions and mood changes without adequate support or understanding.",
      icon: challenge1,
    },
    {
      title: "Information Overload",
      description:
        "Feeling lost in conflicting advice from multiple sources about baby care and self-care.",
      icon: challenge2,
    },
    {
      title: "Isolated Experience",
      description:
        "Missing personalized guidance and feeling alone in the journey through early motherhood.",
      icon: challenge3,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-(--space-xl)">
      {challenges.map((challenge, index) => (
        <ChallengeCard
          key={index}
          index={index}
          icon={challenge.icon}
          title={challenge.title}
          description={challenge.description}
        />
      ))}
    </div>
  );
};

export default ChallengeList;
