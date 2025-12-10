import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Safe Haven for Post Exploitation - Youssef Ennaciri",
  description: "Technique to abuse Windows' built-in VPN client to force EDR communication through a controlled tunnel",
};

export default function SafeHavenProject() {
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
            <h1 className="h1 mb-6 font-nacelle text-gray-200 text-4xl md:text-5xl">Safe Haven for Post Exploitation</h1>

            <p className="text-lg text-indigo-200/65 mb-4">
              Most EDR abuse tools existing today require at least local admin privileges on the machine. What makes this technique special is its usability with basic non-admin privileges to render the EDR blind.
            </p>

            <p className="text-lg text-indigo-200/65 mb-4">
              In this post, we're diving into a technique to do exactly that. We're going to abuse Windows' built-in VPN client to force all of the EDR's critical communication through a VPN tunnel that we control. Once we own the pipe, we can silently drop the traffic, leaving the agent isolated and blind while our own activity continues unimpeded. It's an approach to create a safe haven for our post-exploitation activities.
            </p>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">The Core Concept: A Man-in-the-Middle on the EDR Itself</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              The goal is simple: Intercept and block the network communication between the SentinelOne agent on the compromised host and its management console in the cloud.
            </p>

            <p className="text-lg text-indigo-200/65 mb-4">
              SentinelOne, like any cloud-managed EDR, relies on a constant heartbeat and the ability to send telemetry data back to its mothership. No communication means no alerts, no policy updates, and most importantly, no real-time blocking of our actions. We're not trying to disable the service; we're just cutting its lifeline.
            </p>

            <p className="text-lg text-indigo-200/65 mb-4">
              The beauty of this method is that we achieve this by becoming a "trusted" network provider on the host. By leveraging the built-in <code className="bg-gray-800 px-1 rounded">rasdial</code> functionality and the Routing and Remote Access service, we can establish a system-level VPN connection. This isn't a user-land VPN; this is a network interface that even privileged services are forced to use. We set up a VPN server we control (an EC2 instance is perfect for this), push a routing configuration that says "all of SentinelOne's traffic goes through my VPN," and then we simply... discard it.
            </p>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Step 1: Footprinting the EDR's Communication Channels</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              First, we need to identify the destination IP addresses the SentinelOne agent uses to communicate with its console. From a non-admin command prompt, we can use built-in tools to observe these connections.
            </p>

            <div className="my-6">
              <img
                src="/images/safe-haven-screenshot-1.png"
                alt="Identify the IP used by SentinelOne agent to communicate"
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
              <p className="text-sm text-gray-400 mt-2 text-center">Screen1: Identify the IP used by SentinelOne agent to communicate</p>
            </div>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Step 2: Establishing the Rogue VPN Tunnel</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              Concurrently, we configure our attack infrastructure—a VPN server on an AWS EC2 instance. We use Windows' built-in SSTP VPN client for its reliability and use of TCP port 443, which is rarely blocked.
            </p>

            <p className="text-lg text-indigo-200/65 mb-4">
              From the compromised host, we create and initiate a VPN connection to our server. This is done within the user's context and does not require elevation.
            </p>

            <div className="my-6">
              <img
                src="/images/safe-haven-screenshot-2.png"
                alt="Connect to the VPN and force the connection through the established VPN"
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
              <p className="text-sm text-gray-400 mt-2 text-center">Screen2: Connect to the VPN and force the connection through the established VPN</p>
            </div>

            <p className="text-lg text-indigo-200/65 mb-4">
              Once authenticated, a new VPN interface is established. We can verify the connection is no longer possible and the console endpoint is inaccessible.
            </p>

            <p className="text-lg text-indigo-200/65 mb-4">
              The EDR agent, thinking it's communicating normally, happily sends its data into a black hole. Meanwhile, our other C2 traffic can be routed out the normal interface or through a separate, dedicated tunnel, keeping us operational.
            </p>

            <div className="my-6">
              <video
                src="/videos/projects/safe-haven-video.mp4"
                controls
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              >
                <source src="/videos/projects/safe-haven-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="text-sm text-gray-400 mt-2 text-center">Demonstration of the EDR blinding technique</p>
            </div>

            <p className="text-lg text-indigo-200/65 mb-4">
              The result is precise and effective. The SentinelOne agent continues to generate and dispatch its telemetry. The operating system's routing table, following our rule, directs these packets into the SSTP VPN tunnel. They arrive at our EC2 instance, which we have configured to silently drop them. The agent's connection attempts stall and fail. From the perspective of the management console, the agent simply goes offline.
            </p>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Evasion in Action: Executing with Impunity</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              With the EDR agent blinded, the environment becomes a safe haven for post-exploitation. Standard detection mechanisms are neutered. You can now execute a range of tools and techniques that would typically generate immediate alerts.
            </p>

            <p className="text-lg text-indigo-200/65 mb-4">
              Common actions performed during our testing without triggering SentinelOne included:
            </p>

            <ul className="list-disc pl-6 mb-4 space-y-2 text-lg text-indigo-200/65">
              <li>Execution of credential access tools.</li>
              <li>Lateral movement techniques.</li>
              <li>Running script-based payloads.</li>
              <li>Loading in-memory offensive toolkits.</li>
            </ul>

            <p className="text-lg text-indigo-200/65 mb-4">
              The agent's process remains active, but its ability to report its findings to the security team has been surgically removed. This creates a critical gap in the organization's security visibility.
            </p>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Detection and Mitigation: A Blue Team Perspective</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              This technique, while effective, is not entirely invisible. Defenders should look for several key indicators of compromise:
            </p>

            <ul className="list-disc pl-6 mb-4 space-y-2 text-lg text-indigo-200/65">
              <li><strong>User-Initiated SSTP Connections:</strong> Unusual SSTP VPN connections originating from user workstations to unknown external IP addresses, especially cloud infrastructure IPs, are a primary indicator.</li>
              <li><strong>Route Command Usage:</strong> Command-line arguments adding persistent routes (<code className="bg-gray-800 px-1 rounded">route -p add</code>) are highly suspicious, particularly when associated with a VPN interface.</li>
              <li><strong>Process Tree Anomalies:</strong> The sequence of <code className="bg-gray-800 px-1 rounded">rasphone</code> or <code className="bg-gray-800 px-1 rounded">rasdial</code> followed by <code className="bg-gray-800 px-1 rounded">route.exe</code> should be considered a high-fidelity alert when correlated with EDR agents losing connectivity.</li>
              <li><strong>Agent Health Monitoring:</strong> Sudden, unexplained losses of agent communication from otherwise healthy hosts should be investigated immediately, not just dismissed as network issues.</li>
            </ul>

            <p className="text-lg text-indigo-200/65 mb-4">
              Mitigation strategies should focus on restricting the ability to create unauthorized network routes:
            </p>

            <ul className="list-disc pl-6 mb-4 space-y-2 text-lg text-indigo-200/65">
              <li><strong>Restrict VPN Creation:</strong> Implement Group Policy to prevent users from creating their own VPN connections.</li>
              <li><strong>Least Privilege:</strong> Enforce the principle of least privilege. While the initial attack works without admin, limiting local administrator access remains critically important for other defenses.</li>
              <li><strong>Network Monitoring:</strong> Deploy network detection rules to flag outbound SSTP connections from workstations and the establishment of new, persistent routes.</li>
              <li><strong>Host-Based Firewall Rules:</strong> Consider using host-based firewalls to block the EDR agent from communicating over any interface other than the primary corporate one.</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Conclusion</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              This technique demonstrates a significant weakness in the assumed security model of many EDR products: their reliance on user-accessible operating system features for their own communication. By abusing the built-in Windows VPN client and routing table, we can selectively blind the agent without touching its processes, without injecting code, and without administrative privileges.
            </p>

            <p className="text-lg text-indigo-200/65 mb-4">
              It serves as a reminder that effective security requires a defense-in-depth approach, where endpoint protection is complemented by robust network monitoring and strict application control. The arms race between offensive and defensive security continues, and understanding these underlying techniques is crucial for defenders to build more resilient environments.
            </p>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Credits</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              The experiment is inspired by <a href="https://trustedsec.com/blog/abusing-windows-built-in-vpn-providers" className="text-indigo-400 hover:text-indigo-300">https://trustedsec.com/blog/abusing-windows-built-in-vpn-providers</a>
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}