import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Private C2 - Youssef Ennaciri",
  description: "Custom command and control framework designed for stealthy Red Team operations",
};

export default function PrivateC2Project() {
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
            <h1 className="h1 mb-6 font-nacelle text-gray-200 text-4xl md:text-5xl">Private C2</h1>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Introduction</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              Cobalt Strike remains reliable and well‑established, but its consistency has also made it highly recognizable to modern EDR platforms that have spent years profiling its behavior. The objective of the Private C2 was not to compete with larger frameworks on features, but to operate quietly in areas where traditional tools are easily detected.
            </p>
            <p className="text-lg text-indigo-200/65 mb-4">
              The result is a lightweight, flexible, and operationally efficient C2 that deploys cleanly, establishes communication, initializes its environment, and then retrieves only the capabilities required for the mission. It avoids unnecessary components and minimizes activity to reduce detection risk.
            </p>

            <h3 className="text-xl font-semibold text-gray-200 mb-4 mt-6">Core Capabilities</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-lg text-indigo-200/65">
              <li>DLL Proxying via Microsoft-signed binaries</li>
              <li>Simulate real ransomware attacks (encryption of all types of files)</li>
              <li>Token-based HTTPS communications (agent integrity checks included)</li>
              <li>SOCKS tunneling over MS DevTunnel for stealthy outbound traffic</li>
              <li>Entra ID token manipulation and exfiltration</li>
              <li>MOTW bypass via browser cache smuggling</li>
              <li>Sandbox evasion (cursor activity, runtime anomalies, VM detection)</li>
              <li>Flexible payload execution: BoF, execute-assembly, inline-execute</li>
              <li>XOR-encrypted shellcode</li>
              <li>Environment keying to ensure safe execution</li>
              <li>Web management interface for real-time tasking and agent control</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-200 mb-4 mt-6">Tested Where It Counts</h3>
            <p className="text-lg text-indigo-200/65 mb-4">
              Demonstrating stealth in theory is not enough; it must be validated in real, hardened environments. The Private C2 framework has been operationally tested against multiple enterprise‑grade EDR platforms, including SentinelOne, Cortex XDR, CrowdStrike, Elastic EDR, and Cybereason.
            </p>
            <p className="text-lg text-indigo-200/65 mb-4">
              Across these evaluations, the platform consistently avoided detection and maintained effective suppression of security telemetry for the duration of each engagement.
            </p>

            <h3 className="text-xl font-semibold text-gray-200 mb-4 mt-6">In Development</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-lg text-indigo-200/65">
              <li>UDRL (User Defined Reflective Loader)</li>
              <li>Sleep Mask (in-memory implant encryption during inactivity)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-200 mb-4 mt-6">Ransomware Simulation</h3>
            <p className="text-lg text-indigo-200/65 mb-4">
              This custom command‑and‑control infrastructure was developed to replicate the behavior of a real‑world ransomware operation during the final phase of the red team engagement. This objective is reflected in its internal project name, DaBombC4.
            </p>
            <div className="my-6">
              <video
                src="/videos/projects/private-c2-video-1.mp4"
                controls
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              >
                <source src="/videos/projects/private-c2-video-1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="text-sm text-gray-400 mt-2 text-center">Built-in capability in the Private C2 to simulate ransomware</p>
            </div>

            <h3 className="text-xl font-semibold text-gray-200 mb-4 mt-6">Browser Cache Smuggling</h3>
            <p className="text-lg text-indigo-200/65 mb-4">
              The C2 implant can be deployed through browser cache smuggling, allowing it to bypass traditional download‑based delivery methods that would normally generate Mark of the Web warnings. This approach does not require the user to download any files, as cached content does not inherit Mark of the Web flags by default.
            </p>
            <div className="my-6">
              <Image
                src="/images/projects/private-c2-1.png"
                alt="Cached DLL file in Firefox browser"
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
              <p className="text-sm text-gray-400 mt-2 text-center">Cached DLL file in Firefox browser</p>
            </div>
            <div className="my-6">
              <video
                src="/videos/projects/private-c2-video-2.mp4"
                controls
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              >
                <source src="/videos/projects/private-c2-video-2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="text-sm text-gray-400 mt-2 text-center">Initial Access through browser cache smuggling</p>
            </div>

            <h3 className="text-xl font-semibold text-gray-200 mb-4 mt-6">Video-Camera Stealthily</h3>
            <p className="text-lg text-indigo-200/65 mb-4">
              In addition, a new capability was recently introduced that enables covert camera and microphone recording. This feature leverages legitimate Microsoft Edge functionality to activate audio and video inputs without generating security prompts, as such behavior is commonly associated with routine activities like Microsoft Teams calls.
            </p>
            <div className="my-6">
              <video
                src="/videos/projects/private-c2-video-3.mp4"
                controls
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              >
                <source src="/videos/projects/private-c2-video-3.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="text-sm text-gray-400 mt-2 text-center">BoF - Videoshot</p>
            </div>

            <h3 className="text-xl font-semibold text-gray-200 mb-4 mt-6">Dynamic Implant Builder</h3>
            <p className="text-lg text-indigo-200/65 mb-4">
              A web‑based interface is currently under development to allow operators to modify configuration settings and generate implant payloads in real time. This capability will simplify payload staging, support rapid customization, and enable operators to adjust operational parameters directly from the Private C2 control panel as requirements evolve.
            </p>
            <div className="my-6">
              <video
                src="/videos/projects/private-c2-video-4.mp4"
                controls
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              >
                <source src="/videos/projects/private-c2-video-4.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="text-sm text-gray-400 mt-2 text-center">Dynamic Implant Builder</p>
            </div>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">SOCKS Tunneling via Microsoft Dev Tunnels</h2>
            <p className="text-lg text-indigo-200/65 mb-4"><strong>Microsoft Dev Tunnels</strong> (<code className="bg-gray-800 px-1 rounded">*.devtunnels.ms</code>) offers SSH-based port forwarding over Azure's infrastructure a low-profile, OPSEC-safe alternative to conventional SOCKS proxies for lateral movement and data exfiltration during offensive operations.</p>

            <h3 className="text-xl font-semibold text-indigo-200/65 mb-4 mt-6">Why it works:</h3>
            <p className="text-lg text-indigo-200/65 mb-4">Traffic routed through Dev Tunnels inherits Azure's legitimacy. Egress filtering appliances typically allow this traffic by default due to its association with Microsoft developer services.</p>

            <h3 className="text-xl font-semibold text-gray-200 mb-4 mt-6">Operational Use Cases:</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-lg text-indigo-200/65">
              <li><strong>Bypass Egress Controls:</strong> Traffic blends with legitimate Azure traffic (<code className="bg-gray-800 px-1 rounded">SNI: devtunnels.ms</code>), slipping through restrictive firewall rules.</li>
              <li><strong>Multi-Hop Pivoting:</strong> Chain tunnels with <code className="bg-gray-800 px-1 rounded">-v</code> (forward) and <code className="bg-gray-800 px-1 rounded">-r</code> (reverse) flags for controlled routing through intermediate compromised hosts.</li>
              <li><strong>Efficient Data Exfiltration:</strong> Native compression (<code className="bg-gray-800 px-1 rounded">-z</code>) combined with WebSocket transport minimizes detection when compared to direct TCP exfil methods.</li>
            </ul>

            <p className="text-lg text-indigo-200/65 mb-4">Private C2 integrates native support for Dev Tunnel operations via the <strong>Microsoft.DevTunnels.Cli</strong>, offering operators dynamic pivoting and controlled C2 infrastructure exposure.</p>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">C2 Agent Integrity Verification</h2>
            <p className="text-lg text-indigo-200/65 mb-4">One of the weak points in traditional beaconing frameworks is the lack of robust agent verification mechanisms. Private C2 addresses this using <strong>token-based HTTPS communication</strong>, inspired by techniques implemented in the Burak framework.</p>

            <h3 className="text-xl font-semibold text-gray-200 mb-4 mt-6">Core Concept:</h3>
            <p className="text-lg text-indigo-200/65 mb-4">Each agent is cryptographically bound to a unique token, established at build time and verified during check-ins. This ensures that only trusted agents receive tasking, mitigating impersonation and man-in-the-middle risks while blending into legitimate HTTPS C2 traffic.</p>

            <h3 className="text-xl font-semibold text-gray-200 mb-4 mt-6">Workflow Overview:</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-lg text-indigo-200/65">
              <li><strong>Token Generation (Server-side):</strong> The C2 server generates a unique token for each agent instance.</li>
              <li><strong>Payload Embedding:</strong> Token is embedded into the agent configuration prior to deployment.</li>
              <li><strong>Agent Check-In:</strong> On initial callback, the agent presents the token over encrypted HTTPS.</li>
              <li><strong>Validation:</strong> The C2 server authenticates the token before permitting tasking or staging additional modules.</li>
            </ul>

            <p className="text-lg text-indigo-200/65 mb-4">This process maintains operational integrity, particularly in environments where infrastructure is exposed to hostile monitoring or active defensive operations.</p>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Sentinel One</h2>
            <p className="text-lg text-indigo-200/65 mb-4">During testing, SentinelOne did not generate any alerts. Although it registered some memory‑related activity during shellcode injection, such as memory allocation events, it did not classify these behaviors as suspicious. The DLL injection activity appeared entirely benign to the platform, with no anomalies or incidents recorded.</p>

            <p className="text-lg text-indigo-200/65 mb-4">It is important to note that SentinelOne may raise an incident if a trusted process, such as onedrive.exe, is used to spawn cmd.exe and execute commands like tasklist, dir, or hostname, depending on the broader behavioral context.</p>
            <div className="my-6">
              <video
                src="/videos/projects/private-c2-video-7.mp4"
                controls
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              >
                <source src="/videos/projects/private-c2-video-7.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="text-sm text-gray-400 mt-2 text-center">SentinelOne Testing</p>
            </div>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Elastic EDR</h2>
            <p className="text-lg text-indigo-200/65 mb-4">Elastic EDR produced results similar to SentinelOne, with no detections related to implant execution or shell activity. The only alert observed was a low‑severity notification triggered by the implant's first‑stage persistence mechanism, which involves copying itself into the Startup folder. This behavior generated a minor warning but did not escalate into an incident or investigation.</p>

            <p className="text-lg text-indigo-200/65 mb-4">No additional alerts were raised during execution or when spawning shells, as the implant operated under a Microsoft‑signed binary, which further reduced scrutiny.</p>
            <div className="my-6">
              <video
                src="/videos/projects/private-c2-video-8.mp4"
                controls
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              >
                <source src="/videos/projects/private-c2-video-8.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="text-sm text-gray-400 mt-2 text-center">Elastic EDR Testing</p>
            </div>

            <div className="my-8 p-6 bg-gray-800/50 rounded-xl border border-gray-700">
              <p className="text-lg text-indigo-200/65 italic">
                This project is designed as a learning platform for understanding malware development concepts in a controlled and responsible environment.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}