"use client";

import { FaGraduationCap } from "react-icons/fa";
import { Roadmap } from "./roadmap";

const educationData = [
  {
    title: "Master of Computer Applications",
    subtitle: "Dr. D Y Patil Institute of Management & Research, Pimpri, Pune.",
    period: "2022-2024",
    description:
      "Learnt to Apply knowledge of computing fundamentals, computing specialization, mathematics, and domain knowledge appropriate for the computing specialization to the abstraction and conceptualization of computing models from defined problems and requirements.",
    icon: <FaGraduationCap size={24} />,
  },
  {
    title: "Bachelor of Computer Applications",
    subtitle: "Kamla Nehru Mahavidyalaya, Nagpur.",
    period: "2019-2022",
    description:
      "Three-year undergraduate degree program in India that focuses on computer science and information technology. Learnt the theoretical knowledge and practical skills to work in the IT industry.",
    icon: <FaGraduationCap size={24} />,
  },
  {
    title: "Higher Secondary Certificate (HSC)",
    subtitle: "Maharashtra State Board.",
    period: "2018-2019",
    description:
      "12th standard education in Science stream that is required for entering undergraduate courses.",
    icon: <FaGraduationCap size={24} />,
  },
  {
    title: "Secondary School Certificate (SSC)",
    subtitle: "Maharashtra State Board.",
    period: "2017-2018",
    description:
      "10th standard education that is required for entering higher secondary education.",
    icon: <FaGraduationCap size={24} />,
  },
];

export function Education() {
  return (
    <div className="container w-full" id="education">
      <div className="item">
        <Roadmap title="Education" items={educationData} />
      </div>
    </div>
  );
}
