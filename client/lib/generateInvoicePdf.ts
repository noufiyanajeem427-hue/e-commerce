import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export async function downloadInvoicePdf(
  element: HTMLElement | string,
  orderId: string,
  fileName?: string
): Promise<boolean> {
  try {
    const targetElement =
      typeof element === "string" ? document.getElementById(element) : element;

    if (!targetElement) {
      console.error("Invoice element not found for PDF export");
      return false;
    }

    // Scroll to top to ensure complete render
    window.scrollTo(0, 0);

    // Capture the element at high resolution (scale: 2.5 or 3 for crisp vectors & text)
    const canvas = await html2canvas(targetElement, {
      scale: 2.5,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: "#ffffff",
      windowWidth: targetElement.scrollWidth || 1000,
      onclone: (clonedDoc) => {
        // Ensure fonts and images display clearly in the cloned doc
        const clonedEl = clonedDoc.getElementById(
          typeof element === "string" ? element : targetElement.id
        );
        if (clonedEl) {
          clonedEl.style.transform = "none";
          clonedEl.style.boxShadow = "none";
          clonedEl.style.margin = "0 auto";
        }
      },
    });

    const imgData = canvas.toDataURL("image/png", 1.0);
    
    // A4 dimensions in mm: 210 x 297
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight, undefined, "FAST");
    heightLeft -= pdfHeight;

    // Add additional pages if content exceeds single A4 page
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight, undefined, "FAST");
      heightLeft -= pdfHeight;
    }

    // Document metadata
    pdf.setProperties({
      title: `Cartiva Tax Invoice ${orderId}`,
      subject: `Official Tax Invoice for Order ${orderId}`,
      author: "Cartiva Luxury E-Commerce Pvt Ltd",
      keywords: "invoice, receipt, cartiva, luxury",
      creator: "Cartiva Invoice Engine v2.0",
    });

    const outName = fileName || `Cartiva_Invoice_${orderId}.pdf`;
    pdf.save(outName);
    return true;
  } catch (error) {
    console.error("Failed to generate invoice PDF:", error);
    return false;
  }
}
