"use client";

import { useState, useEffect } from "react";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

const PdfViewer = ({ file }) => {
    const [numPages, setNumPages] = useState(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const [pdfComponents, setPdfComponents] = useState(null);

    // Dynamically import react-pdf only on client
    useEffect(() => {
        const loadPdf = async () => {
            const pdf = await import("react-pdf");
            pdf.pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;
            setPdfComponents({
                Document: pdf.Document,
                Page: pdf.Page,
            });
        };

        loadPdf();
    }, []);

    // Set responsive width
    useEffect(() => {
        const updateWidth = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth < 768) {
                setContainerWidth(screenWidth - 32);
            } else if (screenWidth < 1024) {
                setContainerWidth(700);
            } else {
                setContainerWidth(900);
            }
        };

        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    if (!pdfComponents) return <div className="text-white text-center py-8">Loading PDF...</div>;

    const { Document, Page } = pdfComponents;

    return (
        <div className="flex flex-col items-center justify-center px-4 py-6 w-full bg-gray-700">
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from(new Array(numPages), (_, index) => (
                    <div key={`page_${index + 1}`} className="my-4 w-full max-w-full">
                        <Page pageNumber={index + 1} width={containerWidth} />
                    </div>
                ))}
            </Document>
        </div>
    );
};

export default PdfViewer;





// "use client";

// import { useState, useEffect } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import "react-pdf/dist/esm/Page/TextLayer.css";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

// const PdfViewer = ({ file }) => {
//     const [numPages, setNumPages] = useState(null);
//     const [pageHeight, setPageHeight] = useState(0);
//     const [selectedPage, setSelectedPage] = useState(1);

//     useEffect(() => {
//         if (typeof window !== "undefined") {
//             setPageHeight(Math.round(window.innerHeight * 0.8));
//         }
//     }, []);

//     const onDocumentLoadSuccess = ({ numPages }) => {
//         setNumPages(numPages);
//     };

//     return (
//         <div className="flex w-full">
//             {/* Sidebar thumbnails */}
//             <div className="w-[120px] overflow-y-auto border-r p-2 h-screen">
//                 <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
//                     {Array.from(new Array(numPages), (_, index) => (
//                         <div
//                             key={`thumb_${index + 1}`}
//                             className={`cursor-pointer mb-2 border ${
//                                 selectedPage === index + 1 ? "border-blue-500" : "border-gray-300"
//                             }`}
//                             onClick={() => setSelectedPage(index + 1)}
//                         >
//                             <Page pageNumber={index + 1} width={100} />
//                         </div>
//                     ))}
//                 </Document>
//             </div>

//             {/* Main viewer */}
//             <div className="flex-1 flex justify-center items-center p-4">
//                 <Document file={file}>
//                     <Page pageNumber={selectedPage} height={pageHeight} />
//                 </Document>
//             </div>
//         </div>
//     );
// };

// export default PdfViewer;
