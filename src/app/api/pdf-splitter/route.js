import { splitPdf } from "../../../utils/splitPdf";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");
  let startPage = parseInt(formData.get("startPage"), 10) - 1; // Convert 1-based to 0-based
  let endPage = parseInt(formData.get("endPage"), 10) - 1; // Convert 1-based to 0-based

  if (!file) {
    return new Response("No file uploaded", { status: 400 });
  }

  try {
    const splitFiles = await splitPdf(file, startPage, endPage);

    // Convert each PDF Blob to a Base64 string
    const fileData = await Promise.all(
      splitFiles.map(async (blob) => {
        const arrayBuffer = await blob.arrayBuffer();
        const base64String = Buffer.from(arrayBuffer).toString("base64");
        return base64String;
      })
    );

    // Prepare response with Base64 encoded PDF files
    const responses = fileData.map((base64String, index) => ({
      fileName: index === 0 ? "specified-pages.pdf" : "remaining-pages.pdf",
      fileData: base64String,
    }));

    return new Response(JSON.stringify(responses), { status: 200 });
  } catch (error) {
    console.error("Error processing PDF", error);
    return new Response("Internal server error", { status: 500 });
  }
}
