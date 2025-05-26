import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyBH8ACD2LnoBugZMJvMdJbTzTgyXr5TsXk",
});

async function main() {
  const pdfResp = await fetch(
    "https://wtoghmzjgbioycwmlmkk.supabase.co/storage/v1/object/public/cv//6af4d01e-d5b3-4633-8d26-d90b94f6dc6b-1740145916328"
  ).then((response) => response.arrayBuffer());

  const contents = [
    { text: "Summarize this document" },
    {
      inlineData: {
        mimeType: "application/pdf",
        data: Buffer.from(pdfResp).toString("base64"),
      },
    },
  ];

  console.log("Generating content...");

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: contents,
  });
  console.log(response.text);
}

main();
