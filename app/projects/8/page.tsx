import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "LLM Talks to Malware Implant - Youssef Ennaciri",
  description: "Development of an interactive C2 implant powered by Large Language Models (LLMs) and the Model Context Protocol (MCP)",
};

export default function LLMImplantProject() {
  return (
    <section className="relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <Link
            href="/projects"
            className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-8"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Projects
          </Link>

          <article className="max-w-none">
            <h1 className="h1 mb-6 font-nacelle text-gray-200 text-4xl md:text-5xl">LLM Talks to Malware Implant</h1>

            <p className="text-lg text-indigo-200/65 mb-4">
              What if your malware implant can learn and build new capabilities while running on a compromised machine?
            </p>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Introduction</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              We'll walk through the development of an interactive C2 implant powered by Large Language Models (LLMs) and the Model Context Protocol (MCP).
            </p>

            <p className="text-lg text-indigo-200/65 mb-4">
              <strong>LLMplant</strong> takes adversary simulation to a new level with dynamic, on-the-fly C# tasking using Roslyn, all driven by an LLM interface (e.g. Claude ai desktop).
            </p>

            <div className="my-6">
              <img
                src="/images/llm-implant-screenshot.png"
                alt="LLMplant interface showing the interactive C2 implant powered by LLMs"
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
            </div>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">What is MCP and Why Use It?</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              Before diving into the code, a quick primer:
            </p>

            <p className="text-lg text-indigo-200/65 mb-4 font-italic">
              <strong>MCP (Model Context Protocol)</strong> is a C2 communication pattern where an LLM or an external logic service generates implants' tasking dynamically. The implant posts beacons and checks for JSON-encoded tasks, which can include dynamically generated code to compile and run in-memory.
            </p>

            <p className="text-lg text-indigo-200/65 mb-4">
              This makes detection and static analysis much harder while enabling adaptive adversary simulation workflows.
            </p>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Project Structure</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              Here's the directory layout for <strong>LLMplant</strong>:
            </p>

            <div className="my-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <pre className="whitespace-pre-wrap text-sm text-gray-300 overflow-x-auto">
                {`LLMplant/
├── Agent/
│   ├── Agent.csproj
│   ├── AgentClient.cs
│   ├── CodeCompiler.cs
│   ├── Program.cs
│   └── TaskManager.cs
├── Models/
│   └── AgentTask.cs
├── Server/  <-- future work
├── featureless implant.mp4
└── README.md`}
              </pre>
            </div>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Implant Check-In & Task Flow</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              The implant beacons to the MCP server using <code className="bg-gray-800 px-1 rounded">HttpClient.PostAsync()</code>, sending a simple JSON payload:
            </p>

            <div className="my-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <pre className="whitespace-pre-wrap text-sm text-gray-300 overflow-x-auto">
                {`{"status":"idle"}`}
              </pre>
            </div>

            <p className="text-lg text-indigo-200/65 mb-4">
              The server replies with a task which could be a predefined action or C# source code string to compile on the fly.
            </p>

            <p className="text-lg text-indigo-200/65 mb-4">
              <strong>Task JSON Example:</strong>
            </p>

            <div className="my-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <pre className="whitespace-pre-wrap text-sm text-gray-300 overflow-x-auto">
                {`{
  "TaskName": "GetHostname",
  "IsCode": true,
  "Code": "return async () => { Console.WriteLine(System.Environment.MachineName); };"
}`}
              </pre>
            </div>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Dynamic In-Memory C# Compilation</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              We're using the Roslyn scripting engine to compile received code:
            </p>

            <div className="my-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <pre className="whitespace-pre-wrap text-sm text-gray-300 overflow-x-auto">
                {`var script = CSharpScript.EvaluateAsync<Func<Task>>(code, scriptOptions).Result;`}
              </pre>
            </div>

            <p className="text-lg text-indigo-200/65 mb-4">
              <strong>TaskManager</strong> then executes the compiled delegate. Execution results are POSTed back to <code className="bg-gray-800 px-1 rounded">/results</code> endpoint.
            </p>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Demo</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              <strong>Watch it in action:</strong>
            </p>

            <div className="my-6">
              <video
                src="/videos/projects/llm-implant-demo1.mp4"
                controls
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              >
                <source src="/videos/projects/llm-implant-demo1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="text-sm text-gray-400 mt-2 text-center">LLMplant demonstration</p>
            </div>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">LLM with Kali Linux</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              In this section, we'll demonstrate a practical proof-of-concept (PoC) for integrating MCP-based implant control directly from a Kali Linux machine allowing an operator to dynamically generate, task, and control implants via an LLM.
            </p>

            <h3 className="text-lg font-semibold text-gray-200 mb-4 mt-6">What's Happening Here</h3>
            <p className="text-lg text-indigo-200/65 mb-4">
              In this PoC:
            </p>

            <ol className="list-decimal pl-6 mb-4 space-y-2 text-lg text-indigo-200/65">
              <li>The implant continuously beacons to the MCP server on Kali.</li>
              <li>The operator uses an LLM (WindSurf/Cursor/other MCP-client) to dynamically generate C# tasks.</li>
              <li>Tasks are compiled and executed in-memory via Roslyn on the implant.</li>
              <li>Results are exfiltrated back to the Kali MCP server for review.</li>
            </ol>

            <p className="text-lg text-indigo-200/65 mb-4">
              This approach allows for <strong>non-static, operator-driven post-exploitation capabilities</strong> while keeping infrastructure OPSEC-friendly and enabling AI-driven tasking logic.
            </p>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Demo</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              <strong>Watch it in action:</strong>
            </p>

            <div className="my-6">
              <video
                src="/videos/projects/llm-implant-demo2.mp4"
                controls
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              >
                <source src="/videos/projects/llm-implant-demo2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="text-sm text-gray-400 mt-2 text-center">LLM integration with Kali Linux demonstration</p>
            </div>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">References & Inspirations</h2>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-lg text-indigo-200/65">
              <li><a href="https://github.com/FunnyWolf/Viper" className="text-indigo-400 hover:text-indigo-300">FunnyWolf/Viper</a></li>
              <li><a href="https://github.com/Wh0am123/MCP-Kali-Server" className="text-indigo-400 hover:text-indigo-300">Wh0am123 MCP-Kali-Server</a></li>
              <li><a href="https://yousofnahya.medium.com/how-mcp-is-revolutionizing-offensive-security-93b2442a5096" className="text-indigo-400 hover:text-indigo-300">Yousof Nahya's MCP article</a></li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}