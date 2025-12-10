import Image from "next/image";
import Link from "next/link";
import PageIllustration from "@/components/page-illustration";

export const metadata = {
  title: "MCPlant - LLM Based C2 | Youssef Ennaciri - Red Team Consultant",
  description: "MCPlant - LLM Based C2 project utilizing an MCP Server to communicate with your C2 using a python server.",
};

export default function MCPlantProject() {
  return (
    <>
      <PageIllustration />
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="py-12 md:py-20 border-t [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-400/.25),transparent)1]">
            {/* Project Header */}
            <div className="pb-12 md:pb-20">
              <div className="mx-auto max-w-3xl text-center">
                <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
                  <span className="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                    Project
                  </span>
                </div>
                <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-4xl font-semibold text-transparent md:text-5xl">
                  MCPlant - LLM Based C2
                </h1>
                <p className="text-lg text-indigo-200/65">
                  Leveraging Large Language Models for advanced command and control operations
                </p>
              </div>
            </div>

            {/* Project Content */}
            <div className="mx-auto max-w-4xl">
              <div className="mb-12 flex flex-col gap-6">
                <p className="text-lg text-gray-400">
                  MCPlant is an innovative command and control solution that leverages Large Language Models (LLMs) for advanced communication and tasking capabilities. The system integrates an MCP (Model Context Protocol) Server to communicate with the C2 infrastructure.
                </p>

                <h2 className="font-nacelle text-2xl font-semibold text-gray-200">Architecture</h2>
                <p className="text-gray-400">
                  The solution consists of multiple components working in harmony:
                </p>
                <ul className="ml-6 list-disc space-y-2 text-gray-400">
                  <li>A Python-based C2 server that creates endpoints to manage tasks and output</li>
                  <li>A MCP server for communication with LLMs</li>
                  <li>A Windsurf configuration enabling seamless interaction with the C2</li>
                  <li>A PowerShell client for communication back to the C2 server</li>
                </ul>

                <h2 className="font-nacelle text-2xl font-semibold text-gray-200">Technical Implementation</h2>
                <p className="text-gray-400">
                  The implementation utilizes a Python server that handles task management and output coordination. This server acts as the central hub between the MCP server (which interfaces with LLMs) and the end clients.
                </p>

                <div className="relative h-0 w-full overflow-hidden pt-[56.25%]">
                  <div className="absolute inset-0">
                    <video 
                      width="100%" 
                      height="100%" 
                      controls
                      className="h-full w-full rounded-lg"
                    >
                      <source 
                        src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FywqpsvlZCt9YTmnPYctQ%2Fuploads%2Floi4JEYaavjgwbzNeVGf%2FMCPlant.mp4?alt=media&token=39e38138-4272-4b45-b595-928e7509c152" 
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>

                <h2 className="font-nacelle text-2xl font-semibold text-gray-200">Key Features</h2>
                <ul className="ml-6 list-disc space-y-2 text-gray-400">
                  <li>Integration with LLMs through MCP Server for intelligent tasking</li>
                  <li>Python-based C2 server with RESTful endpoints for task management</li>
                  <li>Powershell client for stealthy communication back to the C2 server</li>
                  <li>Windsurf configuration for enhanced operational capabilities</li>
                  <li>Advanced output processing and management capabilities</li>
                </ul>

                <h2 className="font-nacelle text-2xl font-semibold text-gray-200">Operational Benefits</h2>
                <p className="text-gray-400">
                  MCPlant provides a novel approach to C2 operations by leveraging the power of LLMs to enhance task execution and command understanding. This allows for more sophisticated command parsing and task orchestration compared to traditional C2 solutions.
                </p>

                <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
                  <Link 
                    href="/#articles" 
                    className="btn relative w-full bg-linear-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%] sm:w-auto"
                  >
                    View Articles
                  </Link>
                  <Link 
                    href="/" 
                    className="btn group mb-4 w-full bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
                  >
                    <span className="relative inline-flex items-center">
                      Back to Homepage
                      <span className="ml-1 tracking-normal text-white/50 transition-transform group-hover:translate-x-0.5">
                        -&gt;
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}