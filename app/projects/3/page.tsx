import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bypass O365 Email Security - Youssef Ennaciri",
  description: "Demonstration of how to bypass Microsoft Office 365 email security using Teams channel attachments",
};

export default function BypassO365Project() {
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
            <h1 className="h1 mb-6 font-nacelle text-gray-200 text-4xl md:text-5xl">Bypass O365 Email Security</h1>
            
            <div className="my-6">
              <video
                src="/videos/projects/bypass-o365-video.mp4"
                controls
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              >
                <source src="/videos/projects/bypass-o365-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="text-sm text-gray-400 mt-2 text-center">Delivering malware files as attachment to Teams channel chat</p>
            </div>

            <p className="text-lg text-indigo-200/65 mb-4 italic">
              If you are reading this somewhere other than <a href="https://c2.opsec.zone" className="text-indigo-400 hover:text-indigo-300">c2.opsec.zone</a> and the content appears to be a word-for-word copy, be aware that the original was written by Youssef Ennaciri.
            </p>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Executive Summary</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              I was encouraged to learn that Microsoft does not perform file‑content scanning within Teams, OneDrive, or SharePoint. While targeting Microsoft Teams may appear unconventional, this blog will demonstrate how the platform can, in practice, offer one of the most accessible pathways for obtaining initial access to a target organization.
            </p>

            <div className="my-6">
              <img
                src="/images/bypass-o365-screenshot1.png"
                alt="Microsoft says that they don't actively scan files in SharePoint, OneDrive and Teams"
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
              <p className="text-sm text-gray-400 mt-2 text-center">Microsoft says that they don't actively scan files in SharePoint, OneDrive and Teams</p>
            </div>

            <p className="text-lg text-indigo-200/65 mb-4">
              We may be able to leverage this permissive behavior by delivering a malicious attachment directly to a Teams channel inbox as a new chat message. By default, Teams accepts inbound emails from external senders, and these messages are not subjected to any meaningful content‑scanning or malware inspection. This creates a potential pathway for introducing malicious files into an organization through what appears to be a legitimate communication channel.
            </p>

            <div className="my-6">
              <img
                src="/images/bypass-o365-screenshot2.png"
                alt="Teams screenshot"
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
              <p className="text-sm text-gray-400 mt-2 text-center">Teams screenshot</p>
            </div>

            <p className="text-lg text-indigo-200/65 mb-4">
              It's true that Microsoft Teams channel email addresses follow a predictable, machine‑generated structure, and that predictability has implications worth understanding from a defensive and research perspective.
            </p>

            <p className="text-lg text-indigo-200/65 mb-4">
              Teams channel email addresses typically include:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-lg text-indigo-200/65">
              <li>A unique identifier (often a long numeric or alphanumeric string)</li>
              <li>The tenant's domain</li>
              <li>A regional routing domain such as <strong>emea.teams.ms</strong>, <strong>nam.teams.ms</strong>, etc.</li>
            </ul>

            <p className="text-lg text-indigo-200/65 mb-4">
              An example pattern might look like:
            </p>
            <p className="text-lg text-indigo-200/65 mb-4 font-mono bg-gray-800/50 p-2 rounded">
              12345678.company.domain@emea.teams.ms This format is standardized because Teams automatically generates these addresses to route messages into specific channels.
            </p>

            <div className="my-6">
              <img
                src="/images/bypass-o365-screenshot3.png"
                alt="Teams email address structure"
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
              <p className="text-sm text-gray-400 mt-2 text-center">Teams email address structure</p>
            </div>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Delivery Vector: Microsoft Teams Chat Message</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              Initial attempts to deliver the payload through traditional phishing emails were blocked by the organization's layered security controls. Microsoft Defender for Office 365 identified the payload and placed it in quarantine.
            </p>

            <p className="text-lg text-indigo-200/65 mb-4">
              To circumvent these protections, the delivery method was shifted to Microsoft Teams, which currently receives less scrutiny within collaboration platforms. The payload consisted of a basic command‑and‑control agent packaged in a password‑less ZIP archive containing executable files responsible for loading shellcode. The file was sent as an attachment to the Teams channel inbox address.
            </p>

            <p className="text-lg text-indigo-200/65 mb-4">
              After the message was delivered through Teams, the target user received the payload without any security intervention. The file was automatically stored in the user's OneDrive (SharePoint) directory associated with Teams. No alerts were generated by the mail gateway or the endpoint detection and response solution during this process.
            </p>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Mitigation</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              Based on the successful demonstration of the risks associated with delivering malicious files through Microsoft Teams channel mailboxes, the following security improvements are recommended.
            </p>

            <p className="text-lg text-indigo-200/65 mb-4">
              Microsoft Defender for Office 365 should be configured to apply anti‑malware scanning to all emails sent to Teams channel mailboxes. External access to these mailbox addresses should be restricted, and any unused or unnecessary channel email addresses should be identified and disabled. The organization should also monitor for the exposure of Teams channel email addresses through intelligence platforms such as Recorded Future. Finally, permissions for external senders should be limited to reduce the likelihood of unauthorized or malicious content being delivered through this channel.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}