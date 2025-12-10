import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Phish like an APT - Youssef Ennaciri",
  description: "Advanced phishing techniques using Entra ID and conditional access policy bypasses",
};

export default function PhishLikeAnAPTProject() {
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
            <h1 className="h1 mb-6 font-nacelle text-gray-200 text-4xl md:text-5xl">Phish like an APT</h1>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">The Evolution of Phishing</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              Traditional phishing attacks typically followed a predictable sequence: obtain user credentials, gain code execution, extract credentials from LSASS, move laterally across the network, and exfiltrate data while attempting to evade endpoint security controls.
            </p>

            <p className="text-lg text-indigo-200/65 mb-4">
              This model has shifted significantly. With many organizations now operating in Entra ID, a single compromised cloud authentication token such as a Primary Refresh Token or an active session cookie can immediately provide broad access without requiring any of the traditional post‑exploitation steps.
            </p>

            <ul className="list-disc pl-6 mb-4 space-y-2 text-lg text-indigo-200/65">
              <li>remote control</li>
              <li>exfiltration becomes an API call</li>
              <li>lateral movement turns into role enumeration</li>
              <li>persistence hides in OAuth apps</li>
            </ul>

            <p className="text-lg text-indigo-200/65 mb-4">
              Modern attacks increasingly bypass traditional malware‑based techniques altogether. Instead of compromising endpoints, adversaries focus directly on identity‑based weaknesses. With the right stolen token, an attacker can operate entirely within legitimate cloud sessions, avoiding endpoint controls and leaving minimal forensic evidence.
            </p>

            <p className="text-lg text-indigo-200/65 mb-4">
              This section provides an overview of how contemporary red teams leverage large‑scale phishing to exploit identity systems rather than devices, highlighting the shift toward credential and token‑centric attack paths.
            </p>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Conditional Access Policy + Enforced MFA</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              To bypass the organization's configured Entra ID controls, including multi‑factor authentication and Conditional Access Policies, the assessment used a crafted Intune enrollment link that took advantage of a misconfiguration in how device trust was being propagated. When the target user accessed this link, it initiated an OAuth 2.0 implicit flow that ultimately issued a refresh token, allowing continued authenticated access without requiring additional user interaction.
            </p>

            <h3 className="text-lg font-semibold text-gray-200 mb-4 mt-6">Technical Notes</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-lg text-indigo-200/65">
              <li>The <strong>Intune flaw</strong> abuses insufficient scope validation, allowing token issuance without CAP prompts.</li>
              <li><strong>Evilginx Phishlet (`opsec.yaml`)</strong> proxies the OAuth dance, capturing the <code className="bg-gray-800 px-1 rounded">refresh_token</code> and session cookies.</li>
            </ul>

            <p className="text-lg text-indigo-200/65 mb-4">
              TokenSmith, an open‑source tool developed by Jumpsec Labs, was used during the assessment to demonstrate how Conditional Access Policies can be bypassed under specific circumstances. By leveraging a misconfiguration related to Microsoft Intune exceptions, the tool was able to generate a crafted login URL that initiated an authentication flow outside the expected policy controls.
            </p>

            <div className="my-6">
              <img
                src="/images/phish-article-screenshot-1.png"
                alt="TokenSmith screenshot showing Intune enrollment bypass"
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
              <p className="text-sm text-gray-400 mt-2 text-center">TokenSmith screenshot showing Intune enrollment bypass</p>
            </div>

            <p className="text-lg text-indigo-200/65 mb-4">
              This URL will be embedded into the opsec.yaml configuration file used by the Evilginx phishlet.
            </p>

            <div className="my-6">
              <img
                src="/images/phish-article-screenshot-2.png"
                alt="Evilginx opsec.yaml configuration file"
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
              <p className="text-sm text-gray-400 mt-2 text-center">Evilginx opsec.yaml configuration file</p>
            </div>

            <p className="text-lg text-indigo-200/65 mb-4">
              Evilginx automatically retrieves a valid SSL certificate from Let's Encrypt using the ACME protocol and then establishes a transparent reverse‑proxy connection between login.microsoftonline.com and the user's browser. Operating in this man‑in‑the‑middle position enables the platform to capture session cookies and OAuth tokens while preserving end‑to‑end TLS encryption, making the activity difficult for users or security controls to detect.
            </p>

            <div className="my-6">
              <img
                src="/images/phish-article-screenshot-3.png"
                alt="Evilginx reverse proxy establishing connection"
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
              <p className="text-sm text-gray-400 mt-2 text-center">Evilginx reverse proxy establishing connection</p>
            </div>

            <p className="text-lg text-indigo-200/65 mb-4">
              The target user proceeds through the multi‑factor authentication prompt exactly as they would during a legitimate Microsoft sign‑in process.
            </p>

            <div className="my-6">
              <img
                src="/images/phish-article-screenshot-4.png"
                alt="User proceeding through MFA prompt"
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
              <p className="text-sm text-gray-400 mt-2 text-center">User proceeding through MFA prompt</p>
            </div>

            <p className="text-lg text-indigo-200/65 mb-4">
              As the user proceeds through the authentication process, their credentials are captured and displayed within the Evilginx console. After the user successfully completes the MFA challenge, the resulting session cookie is written to the local Evilginx log file, providing the attacker with a fully authenticated session.
            </p>

            <div className="my-6">
              <img
                src="/images/phish-article-screenshot-5.png"
                alt="Evilginx console showing captured credentials"
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
              <p className="text-sm text-gray-400 mt-2 text-center">Evilginx console showing captured credentials</p>
            </div>

            <div className="my-6">
              <img
                src="/images/phish-article-screenshot-6.png"
                alt="Session cookie captured in Evilginx"
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
              <p className="text-sm text-gray-400 mt-2 text-center">Session cookie captured in Evilginx</p>
            </div>

            <p className="text-lg text-indigo-200/65 mb-4">
              The captured session cookie is then imported into a browser using a cookie‑management extension such as Cookie Editor. Once applied, the browser assumes the authenticated state of the victim, allowing full access to Microsoft services without requiring credentials or MFA.
            </p>

            <div className="my-6">
              <img
                src="/images/phish-article-screenshot-7.png"
                alt="Session cookie imported into browser"
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
              <p className="text-sm text-gray-400 mt-2 text-center">Session cookie imported into browser</p>
            </div>

            <p className="text-lg text-indigo-200/65 mb-4">
              At this stage, the attacker has already authenticated using the compromised user session. The next step is to request Microsoft Graph tokens—specifically the access and refresh tokens—which provide programmatic access to the user's cloud resources and enable persistent interaction with Microsoft services.
            </p>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Microsoft Graph Tokens</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              Microsoft Graph tokens can be obtained by using the custom link defined in the opsec.yaml phishlet. While still operating within the compromised browser session, the attacker can navigate to the Intune enrollment link, which triggers the issuance of both a refresh token and an access token.
            </p>

            <div className="my-6">
              <img
                src="/images/phish-article-screenshot-8.png"
                alt="Intune enrollment link triggering token issuance"
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
              <p className="text-sm text-gray-400 mt-2 text-center">Intune enrollment link triggering token issuance</p>
            </div>

            <p className="text-lg text-indigo-200/65 mb-4">
              The TokenTacticV2 toolkit is then used to interact with Entra ID APIs and refresh the obtained tokens, enabling continued authenticated access without requiring user involvement.
            </p>

            <p className="text-lg text-indigo-200/65 mb-4 font-mono bg-gray-800/50 p-2 rounded">
              PS &gt;Get-AzureTokenFromAuthorizationCode -Client MSGraph -RequestURL $FullRequestURL -Verbose -UseCAE
            </p>

            <p className="text-lg text-indigo-200/65 mb-4 font-mono bg-gray-800/50 p-2 rounded">
              PS &gt;RefreshTo-GraphToken -RefreshToken $response.refresh_token -ClientID 9ba1a5c7-f17a-4de9-a1f1-6178c8d51223 -UseCAE -Domain target.domain
            </p>

            <div className="my-6">
              <img
                src="/images/phish-article-screenshot-9.png"
                alt="TokenTacticV2 toolkit results"
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
              <p className="text-sm text-gray-400 mt-2 text-center">TokenTacticV2 toolkit results</p>
            </div>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Primary Refresh Token</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              The Primary Refresh Token (PRT) is inherently linked to a device's identity within Entra ID, and by default, standard users are permitted to register devices in the tenant. By taking advantage of this configuration, a rogue device—such as one labeled <strong>"purplePRT"</strong>—can be registered to the environment, allowing the attacker to associate a fraudulent device identity with the compromised account.
            </p>

            <div className="my-6">
              <img
                src="/images/phish-article-screenshot-10.png"
                alt="Registering rogue device purplePRT"
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
              <p className="text-sm text-gray-400 mt-2 text-center">Registering rogue device purplePRT</p>
            </div>

            <p className="text-lg text-indigo-200/65 mb-4">
              Because the target account is protected by MFA, the token request must explicitly include an MFA claim. This ensures that the issued Primary Refresh Token contains an embedded MFA assertion, allowing it to satisfy Conditional Access requirements that mandate strong authentication.
            </p>

            <div className="my-6">
              <img
                src="/images/phish-article-screenshot-11.png"
                alt="MFA claim included in token request"
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
              <p className="text-sm text-gray-400 mt-2 text-center">MFA claim included in token request</p>
            </div>

            <p className="text-lg text-indigo-200/65 mb-4">
              Once the user approves the MFA prompt, the resulting Primary Refresh Token is saved to a file (roadtx.prt). As long as the associated rogue device remains registered within the target tenant, this PRT can be used to obtain new access tokens and interact with Microsoft services under the user's identity.
            </p>

            <div className="my-6">
              <img
                src="/images/phish-article-screenshot-12.png"
                alt="Primary Refresh Token saved to file"
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
              <p className="text-sm text-gray-400 mt-2 text-center">Primary Refresh Token saved to file</p>
            </div>

            <p className="text-lg text-indigo-200/65 mb-4">
              The stolen PRT is then used to authenticate a new browser session under the identity of the compromised user. Once this session is established, it provides seamless access to Microsoft services—including Outlook, Teams, OneDrive, and SharePoint—without prompting for credentials or MFA. In effect, the attacker can impersonate the user for as long as the token remains valid and the associated device is trusted by the tenant.
            </p>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Recommendations</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              Enforce Conditional Access for Intune Enrollment
            </p>

            <p className="text-lg text-indigo-200/65 mb-4">
              Implement the following Conditional Access configuration to ensure only trusted devices can obtain tokens: <strong>Entra ID → Conditional Access → Policies → Intune Device Enrollment →</strong> <strong>Set "Require device to be marked as compliant."</strong>
            </p>

            <p className="text-lg text-indigo-200/65 mb-4">
              This control ensures that only devices meeting your Intune compliance standards are permitted to authenticate, preventing attackers from registering rogue devices or leveraging misconfigurations in device trust propagation.
            </p>

            <div className="my-6">
              <img
                src="/images/phish-article-screenshot-13.png"
                alt="Conditional Access Policy for Intune Enrollment"
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
              <p className="text-sm text-gray-400 mt-2 text-center">Conditional Access Policy for Intune Enrollment</p>
            </div>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Conclusion</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              This assessment demonstrated how a combination of misconfigurations in Entra ID, Intune device enrollment, and Conditional Access enforcement can be chained together to bypass MFA protections and obtain long‑lived authentication artifacts such as session cookies, OAuth tokens, and ultimately a Primary Refresh Token (PRT). By leveraging tools like Evilginx, TokenSmith, and TokenTacticV2, an attacker can impersonate a legitimate user, register a rogue device, and maintain persistent access to Microsoft cloud services without further user interaction.
            </p>

            <p className="text-lg text-indigo-200/65 mb-4">
              These findings highlight the critical importance of enforcing strict device compliance requirements, validating Conditional Access coverage, and ensuring that Intune enrollment exceptions cannot be abused to obtain trusted tokens. Strengthening these controls significantly reduces the attack surface and prevents adversaries from exploiting device trust propagation to gain privileged, persistent access.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}