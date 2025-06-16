// "use client";
// import { useState } from "react";

// export default function Home() {
//   const [question, setQuestion] = useState("");
//   const [chatResponse, setChatResponse] = useState("");
//   const [emailData, setEmailData] = useState({
//     recipient: "",
//     subject: "",
//     body: ""
//   });
//   const [emailStatus, setEmailStatus] = useState("");

//   const handleChat = async () => {
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/chat`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ question }),
//       });
//       const data = await res.json();
//       setChatResponse(data.answer || data.error || "No response");
//     } catch (err) {
//       setChatResponse("Error talking to server.");
//     }
//   };

//   const handleEmail = async () => {
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/send-email`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(emailData),
//       });
//       const msg = await res.text();
//       setEmailStatus(msg);
//     } catch (err) {
//       setEmailStatus("Failed to send email.");
//     }
//   };

//   return (
//     <main className="p-10 space-y-10">
//       <h1 className="text-2xl font-bold">🧠 MCP Chat Playground</h1>

//       <div className="space-y-4">
//         <h2 className="font-semibold">Chat About Resume</h2>
//         <input
//           type="text"
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//           placeholder="Ask about your CV..."
//           className="border p-2 w-full"
//         />
//         <button onClick={handleChat} className="bg-blue-600 text-white px-4 py-2">
//           Ask
//         </button>
//         <p className="mt-2 text-green-700">{chatResponse}</p>
//       </div>

//       <div className="space-y-4">
//         <h2 className="font-semibold">Send Email</h2>
//         <input
//           type="email"
//           placeholder="Recipient"
//           value={emailData.recipient}
//           onChange={(e) => setEmailData({ ...emailData, recipient: e.target.value })}
//           className="border p-2 w-full"
//         />
//         <input
//           type="text"
//           placeholder="Subject"
//           value={emailData.subject}
//           onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
//           className="border p-2 w-full"
//         />
//         <textarea
//           placeholder="Body"
//           value={emailData.body}
//           onChange={(e) => setEmailData({ ...emailData, body: e.target.value })}
//           className="border p-2 w-full"
//         />
//         <button onClick={handleEmail} className="bg-green-600 text-white px-4 py-2">
//           Send Email
//         </button>
//         <p className="mt-2 text-green-700">{emailStatus}</p>
//       </div>
//     </main>
//   );
// }


"use client";
import { useState } from "react";
import emailjs from "emailjs-com";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [emailData, setEmailData] = useState({
    recipient: "",
    subject: "",
    body: "",
  });
  const [emailStatus, setEmailStatus] = useState("");

  const handleChat = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setChatResponse(data.answer || data.error || "No response");
    } catch (err) {
      setChatResponse("Error talking to server.");
    }
  };

  const handleEmail = async () => {
    setEmailStatus("Sending email...");
    try {
      
      const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      const templateParams = {
        to_email: emailData.recipient,
        subject: emailData.subject,
        message: emailData.body,
      };

      await emailjs.send(serviceID, templateID, templateParams, publicKey);

      setEmailStatus("Email sent successfully!");
    } catch (error) {
      console.error("EmailJS error:", error);
      setEmailStatus("Failed to send email.");
    }
  };

  return (
    <main className="p-10 space-y-10">
      <h1 className="text-2xl font-bold">🤖 MCP Chat Hub</h1>

      <div className="space-y-4">
        <h2 className="font-semibold">Chat About Resume</h2>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask about your CV..."
          className="border p-2 w-full"
        />
        <button onClick={handleChat} className="bg-blue-600 text-white px-4 py-2">
          Ask
        </button>
        <p className="mt-2 text-green-700">{chatResponse}</p>
      </div>

      <div className="space-y-4">
        <h2 className="font-semibold">Send Email</h2>
        <input
          type="email"
          placeholder="Recipient"
          value={emailData.recipient}
          onChange={(e) => setEmailData({ ...emailData, recipient: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Subject"
          value={emailData.subject}
          onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
          className="border p-2 w-full"
        />
        <textarea
          placeholder="Body"
          value={emailData.body}
          onChange={(e) => setEmailData({ ...emailData, body: e.target.value })}
          className="border p-2 w-full"
        />
        <button onClick={handleEmail} className="bg-green-600 text-white px-4 py-2">
          Send Email
        </button>
        <p className="mt-2 text-green-700">{emailStatus}</p>
      </div>
    </main>
  );
}
