import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SentinelOne's Isolation meets DNS C2 - Youssef Ennaciri",
  description: "Demonstration of DNS-based C2 bypassing SentinelOne device isolation",
};

export default function SentinelOneDNSC2Project() {
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
            <h1 className="h1 mb-6 font-nacelle text-gray-200 text-4xl md:text-5xl">SentinelOne's Isolation meets DNS C2</h1>
            
            <p className="text-lg text-indigo-200/65 mb-4">
              During a recent purple team exercise, we demonstrated that a DNS‑based C2 implant can remain operational on a Windows host even after SentinelOne initiates Device Isolation. Despite the isolation state, the implant was still able to execute commands and exfiltrate data.
            </p>
            
            <p className="text-lg text-indigo-200/65 mb-4">
              SentinelOne's Device Isolation feature is intended to quarantine a compromised system by blocking most outbound network communication, which typically disrupts C2 channels that rely on HTTP or HTTPS. However, DNS‑based C2 traffic is not blocked. According to SentinelOne's documentation, DNS remains enabled during isolation to preserve communication between the endpoint agent and the SentinelOne management console.
            </p>
            
            <p className="text-lg text-indigo-200/65 mb-4">
              As a result, DNS C2 channels can continue to function even when the device is isolated, allowing an attacker to maintain persistence and control.
            </p>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Technical Execution</h2>
            <ol className="list-decimal pl-6 mb-4 space-y-2 text-lg text-indigo-200/65">
              <li>
                <strong>Initial Compromise & C2 Setup</strong>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>A <strong>DNS-based Sliver implant</strong> is deployed on the target Windows machine running SentinelOne.</li>
                  <li>The implant communicates with the C2 server via <strong>DNS queries</strong> (e.g., <code className="bg-gray-800 px-1 rounded">random.1.domain.com</code>), which are often allowed even in restricted network states.</li>
                  <li>Verification is done by executing a simple command (e.g., <code className="bg-gray-800 px-1 rounded">ps, info</code>) and confirming the response is received via DNS exfiltration.</li>
                </ul>
              </li>
              <li>
                <strong>Triggering SentinelOne Detection & Isolation</strong>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>We intentionally perform <strong>suspicious behavior</strong> by running default mimikatz.exe that triggers a SentinelOne alert.</li>
                  <li>The SOC responds by enabling <strong>Device Isolation</strong>, which blocks standard C2 channels (e.g., HTTPS,HTTP, SMB, RDP,ICMP).</li>
                  <li>Confirmation of isolation is done by checking:
                    <ul className="list-circle pl-6 mt-1 space-y-1">
                      <li>SentinelOne console showing <strong>"Isolated"</strong> status for the host.</li>
                      <li>Loss of standard network connectivity (e.g., <code className="bg-gray-800 px-1 rounded">https & http & ping</code> fails).</li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <strong>Testing DNS C2 Resilience</strong>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Despite isolation, the <strong>DNS-based implant remains active</strong> because:
                    <ul className="list-square pl-6 mt-1 space-y-1">
                      <li>SentinelOne allows <strong>outbound DNS (UDP 53)</strong> even in isolated mode.</li>
                      <li>DNS tunneling encodes data in subdomains, making it stealthy and difficult to block without deep packet inspection.</li>
                    </ul>
                  </li>
                  <li>We execute additional commands (e.g., <code className="bg-gray-800 px-1 rounded">pwd</code>, <code className="bg-gray-800 px-1 rounded">whoami</code>) and confirm that output is still exfiltrated via DNS.</li>
                </ul>
              </li>
              <li>
                <strong>Why This Works</strong>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li><strong>SentinelOne's Isolation</strong> primarily blocks <strong>TCP-based communication</strong> but leaves <strong>UDP/DNS</strong> unrestricted.</li>
                  <li><strong>Sliver's DNS C2</strong> encodes data in <strong>TXT, A, or CNAME records</strong>, blending with legitimate traffic.</li>
                </ul>
              </li>
            </ol>

            <div className="my-8 p-6 bg-gray-800/50 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold text-gray-200 mb-4">Live PoC</h3>
              <p className="text-lg text-indigo-200/65 mb-4">
                After the Security Incident Response team initiated device isolation through the SentinelOne console, the DNS‑based C2 implant continued to operate without interruption. It was still able to receive tasking, execute commands, and exfiltrate output to the C2 server exactly as it would under normal conditions, effectively behaving as though the device had never been isolated.
              </p>
              <div className="my-6">
                <video
                  src="/videos/projects/sentinelone-dns-c2-video.mp4"
                  controls
                  className="mx-auto rounded-lg border border-gray-700"
                  width={800}
                  height={450}
                >
                  <source src="/videos/projects/sentinelone-dns-c2-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <p className="text-sm text-gray-400 mt-2 text-center">Live PoC demonstration</p>
              </div>
              <div className="my-6">
                <img
                  src="/images/sentinelone-dns-c2-screenshot.png"
                  alt="Technical screenshot showing DNS-based C2 bypassing SentinelOne isolation"
                  className="mx-auto rounded-lg border border-gray-700"
                  width={800}
                  height={450}
                />
                <p className="text-sm text-gray-400 mt-2 text-center">Technical screenshot</p>
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Finalizing the Walkthrough</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              Now that screenshots and video evidence have confirmed that the DNS‑based C2 implant (Sliver) successfully operated despite SentinelOne's Device Isolation, the following section summarizes the key findings and outlines defensive considerations.
            </p>

            <h3 className="text-xl font-semibold text-gray-200 mb-4 mt-6">Summary</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-lg text-indigo-200/65">
              <li><strong>Initial Compromise:</strong> The Sliver DNS implant was deployed on the target host, successfully establishing a covert command‑and‑control channel.</li>
              <li><strong>SOC Response:</strong> SentinelOne identified malicious activity and placed the device into isolation, blocking traditional outbound communication channels such as HTTP and SMB.</li>
              <li><strong>Bypass Confirmed:</strong> Despite the isolation, DNS tunneling allowed the implant to remain fully operational. It continued to execute commands, including whoami and ipconfig, and exfiltrated data through encoded DNS queries and responses.</li>
              <li>The accompanying video and screenshots demonstrate that the isolated host maintained uninterrupted communication with the C2 server, effectively nullifying the SOC's containment efforts.</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-200 mb-4 mt-6">Blue Team and SOC Analysts</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-lg text-indigo-200/65">
              <li><strong>Restrict outbound DNS to internal resolvers only.</strong> All DNS traffic should be routed through controlled internal servers capable of logging, inspecting, and blocking suspicious query patterns.</li>
              <li><strong>Implement DNS tunneling detection.</strong> Indicators include unusually long or encoded hostnames, such as g1h2x3.[malicious.domain], and an abnormal volume of TXT or NULL record requests. Monitoring tools such as Splunk, Zeek, and SentinelOne's threat‑hunting capabilities can assist in identifying these behaviors.</li>
              <li><strong>Ensure network‑level isolation is comprehensive.</strong> Effective containment should block all outbound traffic, including DNS, unless specific exceptions are intentionally defined.</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Conclusion: A Lesson in Assumed Security</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              SentinelOne's isolation controls are not fully effective against low‑and‑slow DNS‑based C2 channels. This limitation allowed the implant to maintain communication even after the device was isolated. A service ticket has been submitted to SentinelOne to report and address this behavior.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}