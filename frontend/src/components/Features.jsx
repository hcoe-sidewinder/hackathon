import { Zap, Users, BarChart, Lock } from "lucide-react";

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="text-blue-600 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: <Zap size={32} />,
      title: "Lightning Fast",
      description:
        "Experience unparalleled speed and efficiency in your workflow.",
    },
    {
      icon: <Users size={32} />,
      title: "Team Collaboration",
      description:
        "Seamlessly work together with your team members in real-time.",
    },
    {
      icon: <BarChart size={32} />,
      title: "Advanced Analytics",
      description: "Gain valuable insights with our powerful analytics tools.",
    },
    {
      icon: <Lock size={32} />,
      title: "Secure & Reliable",
      description:
        "Your data is protected with enterprise-grade security measures.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Powerful Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
