"use client";

import { FaBriefcase } from "react-icons/fa";
import { Roadmap } from "./roadmap";

export function Experience() {
  return (
    <div className="container w-full" id="experience">
      <div className="item">
        <Roadmap
          title="Experience"
          items={[
            {
              title: "Software Engineer",
              subtitle: "Leadows Technologies Pvt Ltd.",
              period: "2024 - Present",
              description:
                "Conducted in-depth research and implemented tailored software solutions to address diverse client problem statements effectively. Primarily worked with the MERN (MongoDB, Express.js, React.js, Node.js) stack to design and develop robust full-stack web applications. Additionally, leveraged Flutter for creating high-performance, cross-platform mobile applications with a focus on user experience and functionality. Utilized Java Spring Boot to architect and develop scalable, resource-intensive applications capable of handling high data consumption and complex business logic. Demonstrated a comprehensive approach to software development, ensuring optimal performance, maintainability, and alignment with client objectives.",
              icon: <FaBriefcase size={24} />,
            },
            {
              title: "Software Engineering Intern",
              subtitle: "CFX Global Tech, Pune.",
              period: "Jan 2024 - May 2024",
              description:
                "Assisted in the design and development of dynamic websites and web applications during an internship, utilizing WordPress and PHP to build and customize responsive and user-friendly platforms. Gained hands-on experience with React to enhance front-end functionality and interactivity. Collaborated on UI/UX design processes using industry-standard tools to create intuitive, visually appealing user interfaces. Contributed to improving user experience by implementing design principles and conducting usability testing, ensuring alignment with client requirements and project objectives. Demonstrated adaptability and a keen focus on learning modern web development and design practices.",
              icon: <FaBriefcase size={24} />,
            },
          ]}
        />
      </div>
    </div>
  );
}
