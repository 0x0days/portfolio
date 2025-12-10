import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Early Birds - Youssef Ennaciri",
  description: "Early Bird APC Injection technique using Outflank OST to target specific EDR solutions with 0 detections",
};

export default function EarlyBirdsProject() {
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
            <h1 className="h1 mb-6 font-nacelle text-gray-200 text-4xl md:text-5xl">Early Birds</h1>

            <p className="text-lg text-indigo-200/65 mb-4">
              Recently, I was able to get my hands on Outflank OST to build and compile interesting implants that target specific EDR solutions with 0 detections. Comes very handy during red team engagements. One of the injection techniques used by Outflank implants is the famous <a href="https://www.outflank.nl/blog/2024/10/15/introducing-early-cascade-injection-from-windows-process-creation-to-stealthy-injection/" className="text-indigo-400 hover:text-indigo-300">Early Cascade</a> draws upon the well-known Early Bird APC Injection.
            </p>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Let's break down.</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              <code className="bg-gray-800 px-1 rounded">QueueUserAPC</code> is commonly used to perform local APC injection. The same API can be used to execute a payload in a remote process.
            </p>

            <p className="text-lg text-indigo-200/65 mb-4">
              APC injection requires either a suspended or an alertable thread to successfully execute the payload. However, it is difficult to come across threads that are in these states, especially ones that are operating under normal user privileges.
            </p>

            <p className="text-lg text-indigo-200/65 mb-4">
              The solution for this is to create a suspended process using the <code className="bg-gray-800 px-1 rounded">CreateProcess</code> WinAPI and use the handle to its suspended thread. The suspended thread meets the criteria to be used in APC injection. This method is known as Early Bird APC Injection.
            </p>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">📝 Implementation Steps</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              The implementation logic of this technique will be as follows:
            </p>

            <ol className="list-decimal pl-6 mb-4 space-y-2 text-lg text-indigo-200/65">
              <li>Create a suspended process by using the <code className="bg-gray-800 px-1 rounded">CREATE_SUSPENDED</code> flag.</li>
              <li>Write the payload to the address space of the new target process.</li>
              <li>Get the suspended thread's handle from <code className="bg-gray-800 px-1 rounded">CreateProcess</code> along with the payload's base address and pass them to <code className="bg-gray-800 px-1 rounded">QueueUserAPC</code>.</li>
              <li>Resume the thread using the <code className="bg-gray-800 px-1 rounded">ResumeThread</code> WinAPI to execute the payload.</li>
            </ol>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Injection Process</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              <code className="bg-gray-800 px-1 rounded">CreateSuspendedProcess2</code> is a function that performs Early Bird APC Injection and requires 4 arguments:
            </p>

            <ul className="list-disc pl-6 mb-4 space-y-2 text-lg text-indigo-200/65">
              <li><code className="bg-gray-800 px-1 rounded">lpProcessName</code> - The name of the process to create.</li>
              <li><code className="bg-gray-800 px-1 rounded">dwProcessId</code> - A pointer to a DWORD which will receive the newly created process's PID.</li>
              <li><code className="bg-gray-800 px-1 rounded">hProcess</code> - Pointer to a HANDLE that will receive the newly created process's handle.</li>
              <li><code className="bg-gray-800 px-1 rounded">hThread</code> - Pointer to a HANDLE that will receive the newly created process's thread.</li>
            </ul>

            <div className="my-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <pre className="whitespace-pre-wrap text-sm text-gray-300 overflow-x-auto">
                {`BOOL CreateSuspendedProcess2(LPCSTR lpProcessName, DWORD* dwProcessId, HANDLE* hProcess, HANDLE* hThread) {

CHAR lpPath   [MAX_PATH * 2];
CHAR WnDr     [MAX_PATH];

STARTUPINFO            Si    = { 0 };
PROCESS_INFORMATION    Pi    = { 0 };

// Cleaning the structs by setting the element values to 0
RtlSecureZeroMemory(&Si, sizeof(STARTUPINFO));
RtlSecureZeroMemory(&Pi, sizeof(PROCESS_INFORMATION));

// Setting the size of the structure
Si.cb = sizeof(STARTUPINFO);

// Getting the %WINDIR% environment variable path (That is generally 'C:\\Windows')
if (!GetEnvironmentVariableA("WINDIR", WnDr, MAX_PATH)) {
printf("[!] GetEnvironmentVariableA Failed With Error : %d \\n", GetLastError());
return FALSE;
}

// Creating the target process path 
sprintf(lpPath, "%s\\\\System32\\\\%s", WnDr, lpProcessName);
printf("\\n\\t[i] Running : \\"%s\\" ... ", lpPath);

// Creating the process
if (!CreateProcessA(
NULL,
lpPath,
NULL,
NULL,
FALSE,
DEBUG_PROCESS,// Instead of CREATE_SUSPENDED
NULL,
NULL,
&Si,
&Pi)) {
printf("[!] CreateProcessA Failed with Error : %d \\n", GetLastError());
return FALSE;
}

printf("[+] DONE \\n");

// Filling up the OUTPUT parameter with CreateProcessA's output
*dwProcessId        = Pi.dwProcessId;
*hProcess           = Pi.hProcess;
*hThread            = Pi.hThread;

// Doing a check to verify we got everything we need
if (*dwProcessId != NULL && *hProcess != NULL && *hThread != NULL)
return TRUE;

return FALSE;
}`}
              </pre>
            </div>

            <p className="text-lg text-indigo-200/65 mb-4">
              The screenshot below shows the newly created target process in a debug state. A debugged process is highlighted in purple in Process Hacker.
            </p>

            <div className="my-6">
              <img
                src="/images/early-birds-screenshot-1.png"
                alt="Newly created target process in debug state highlighted in purple in Process Hacker"
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
            </div>

            <p className="text-lg text-indigo-200/65 mb-4">
              Next, the payload is written to the process memory
            </p>

            <div className="my-6">
              <img
                src="/images/early-birds-screenshot-2.png"
                alt="Payload being written to the process memory"
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
            </div>

            <p className="text-lg text-indigo-200/65 mb-4">
              The payload is executed.
            </p>

            <div className="my-6">
              <img
                src="/images/early-birds-screenshot-3.png"
                alt="Payload execution"
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