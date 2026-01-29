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
            windowWidth: 1200,
            windowHeight: 1600,
            onclone: (clonedDoc) => {
                const clonedElement = clonedDoc.getElementById(elementId);
                if (clonedElement) {
                    // Force visibility and reset styles for capture
                    clonedElement.style.display = 'block';
                    clonedElement.style.visibility = 'visible';
                    clonedElement.style.position = 'relative';
                    clonedElement.style.transform = 'none';
                    clonedElement.style.margin = '0';
                    clonedElement.style.padding = '0';
                    clonedElement.style.width = '210mm';
                    clonedElement.style.minHeight = '297mm';

                    // Ensure all parents are visible
                    let current: HTMLElement | null = clonedElement;
                    while (current) {
                        current.style.display = 'block';
                        current.style.visibility = 'visible';
                        current.style.overflow = 'visible';
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

        // A4 dimensions in mm
        const imgWidth = 210;
        const pageHeight = 295;

        // Calculate height while ensuring we don't divide by zero
        const imgHeight = (canvas.height * imgWidth) / (canvas.width || 1);

        // Final sanity check for finite numbers
        if (!isFinite(imgHeight) || imgHeight <= 0) {
            throw new Error(`Invalid image dimensions calculated: ${imgHeight}`);
        }

        let heightLeft = imgHeight;
        const pdf = new jsPDF('p', 'mm', 'a4');
        let position = 0;

        // Add the first page
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Add additional pages
        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save(filename);
    } catch (error) {
        console.error('PDF Export Error:', error);
        alert(`Failed to export PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};
