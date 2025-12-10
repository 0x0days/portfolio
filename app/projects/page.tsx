import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects - Youssef Ennaciri",
  description: "List of cybersecurity projects and tools developed by Youssef Ennaciri",
};

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "PrivateC2 - Command and Control Framework",
      description: "Custom command and control tool developed for Red Team operations with advanced evasion capabilities.",
      date: "2023",
      category: "Red Team Tools"
    },
    {
      id: 2,
      title: "SentinelOne's Isolation meets DNS C2",
      description: "Demonstration of DNS-based C2 bypassing SentinelOne device isolation during purple team exercise.",
      date: "2023",
      category: "Red Team Operations"
    },
    {
      id: 3,
      title: "Bypass O365 Email Security",
      description: "Demonstration of how to bypass Microsoft Office 365 email security using Teams channel attachments.",
      date: "2023",
      category: "Red Team Operations"
    },
    {
      id: 4,
      title: "C2 - Foster Parents",
      description: "Various techniques for C2 operations using legitimate executables to avoid detection.",
      date: "2023",
      category: "Red Team Operations"
    },
    {
      id: 5,
      title: "Phish like an APT",
      description: "Advanced phishing techniques using Entra ID and conditional access policy bypasses.",
      date: "2023",
      category: "Red Team Operations"
    },
    {
      id: 6,
      title: "Safe Haven for Post Exploitation",
      description: "Technique to abuse Windows' built-in VPN client to force EDR communication through a controlled tunnel.",
      date: "2023",
      category: "Red Team Operations"
    },
    {
      id: 7,
      title: "Chrome Ad Block Extension",
      description: "Demonstration of how malicious Chrome extensions can steal Entra ID credentials.",
      date: "2023",
      category: "Red Team Operations"
    },
    {
      id: 8,
      title: "LLM Talks to Malware Implant",
      description: "Development of an interactive C2 implant powered by Large Language Models (LLMs) and the Model Context Protocol (MCP).",
      date: "2023",
      category: "Red Team Tools"
    },
    {
      id: 9,
      title: "Bunker",
      description: "Advanced malware techniques using NT API calls, PPID spoofing, encrypted shellcode, and more to bypass EDR detection.",
      date: "2023",
      category: "Red Team Tools"
    },
    {
      id: 10,
      title: "Early Birds",
      description: "Early Bird APC Injection technique using Outflank OST to target specific EDR solutions with 0 detections.",
      date: "2023",
      category: "Red Team Tools"
    },
    {
      id: 11,
      title: "Process Mitigation Policy",
      description: "Blocking security products from installing hooks into local and remote processes using a special process creation flag.",
      date: "2023",
      category: "Red Team Tools"
    },
    {
      id: 12,
      title: "MCPlant - LLM Based C2",
      description: "Leveraging Large Language Models for advanced command and control operations. Utilizes MCP Server to communicate with C2 using a Python server with endpoints for task management.",
      date: "2024",
      category: "Red Team Tools"
    }
  ];

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1 mb-6 font-nacelle text-4xl md:text-5xl">Cybersecurity Projects</h1>
            <p className="text-xl text-indigo-200/65">
              A collection of tools, frameworks, and projects developed throughout my Red Team and cybersecurity career.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto pb-12 md:pb-20">
          <div className="grid grid-cols-1 gap-6">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="group relative rounded-2xl bg-gray-800 p-px before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/50"
              >
                <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 after:absolute after:inset-0 after:bg-linear-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,--theme(--color-gray-700/.15),--theme(--color-gray-700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60 mb-3 inline-block">
                        <span className="bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                          {project.category}
                        </span>
                      </span>
                      <h3 className="text-xl font-bold text-gray-200 mb-2 group-hover:text-indigo-300 transition-colors duration-300">
                        <Link href={`/projects/${project.id}`} className="relative z-30">
                          {project.title}
                        </Link>
                      </h3>
                      <p className="text-indigo-200/65 mb-3">
                        {project.description}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                      {project.date}
                    </span>
                  </div>
                  <div className="mt-4">
                    <Link
                      href={`/projects/${project.id}`}
                      className="inline-flex items-center text-sm text-indigo-400 hover:text-indigo-300 transition-colors duration-300 relative z-30"
                    >
                      View Details
                      <svg
                        className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}