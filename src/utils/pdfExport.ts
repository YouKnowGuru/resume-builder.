import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const exportToPDF = async (elementId: string, filename: string) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
        // Create a canvas with high scale for quality
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            windowWidth: 1000, // Wider capture for better quality
            onclone: (clonedDoc) => {
                const clonedElement = clonedDoc.getElementById(elementId);
                if (clonedElement) {
                    // Force visibility and reset styles for capture
                    clonedElement.style.display = 'block';
                    clonedElement.style.visibility = 'visible';
                    clonedElement.style.position = 'relative';
                    clonedElement.style.transform = 'none';
                    clonedElement.style.margin = '0';
                    clonedElement.style.padding = '15mm'; // Add margins for breathing room
                    clonedElement.style.boxSizing = 'border-box';
                    clonedElement.style.width = 'auto';
                    clonedElement.style.minHeight = 'auto';
                    clonedElement.style.height = 'auto';
                    clonedElement.style.background = 'white';

                    // Ensure all parents are visible and don't clip
                    let current: HTMLElement | null = clonedElement;
                    while (current) {
                        current.style.display = 'block';
                        current.style.visibility = 'visible';
                        current.style.overflow = 'visible';
                        current.style.background = 'transparent';
                        current = current.parentElement;
                    }

                    // Hide watermarks during export
                    const watermarks = clonedDoc.querySelectorAll('.watermark-overlay, .preview-watermark');
                    watermarks.forEach(el => {
                        (el as HTMLElement).style.display = 'none';
                    });
                }
            }
        });

        if (!canvas || canvas.width === 0 || canvas.height === 0) {
            console.error('Canvas Generation Error Details:', {
                width: canvas?.width,
                height: canvas?.height,
                elementId,
                scrollWidth: element.scrollWidth,
                scrollHeight: element.scrollHeight
            });
            throw new Error('Canvas generation failed. If you are on mobile, ensure the preview is open before exporting.');
        }

        const imgData = canvas.toDataURL('image/jpeg', 0.95);

        // Calculate dimensions for a single page that fits all content
        // Use a standard width (210mm like A4) but dynamic height
        const pdfWidth = 210; // mm
        const pdfHeight = (canvas.height * pdfWidth) / (canvas.width || 1);

        // Final sanity check for finite numbers
        if (!isFinite(pdfHeight) || pdfHeight <= 0) {
            throw new Error(`Invalid image dimensions calculated: ${pdfHeight}`);
        }

        // Create PDF with custom page size to fit all content on one page
        const pdf = new jsPDF({
            orientation: pdfHeight > pdfWidth ? 'portrait' : 'landscape',
            unit: 'mm',
            format: [pdfWidth, pdfHeight]
        });

        // Add the entire image to a single page
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

        pdf.save(filename);
    } catch (error) {
        console.error('PDF Export Error:', error);
        alert(`Failed to export PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};
