import { BarChart, RefreshCw, Award, TrendingUp } from "lucide-react";

const Step = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center">
    <div className="bg-gray-800 p-4 rounded-full mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const HowItWorks = () => {
  const steps = [
    {
      icon: <BarChart className="h-8 w-8 text-white" />,
      title: "Measure Impact",
      description:
        "We assess your company's environmental impact and energy usage.",
    },
    {
      icon: <RefreshCw className="h-8 w-8 text-white" />,
      title: "Implement Changes",
      description:
        "Implement eco-friendly practices and energy-saving measures.",
    },
    {
      icon: <Award className="h-8 w-8 text-white" />,
      title: "Earn Credits",
      description:
        "Receive energy credits for your positive environmental actions.",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-white" />,
      title: "Trade & Benefit",
      description:
        "Trade credits with other businesses or use them for incentives.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          How <p colo>Hariyo Paila </p>Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Step key={index} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
