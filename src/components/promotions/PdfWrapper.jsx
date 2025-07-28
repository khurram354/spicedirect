"use client";

import dynamic from "next/dynamic";
const PdfViewer = dynamic(() => import("./PdfViewer"), { ssr: false });

const PdfWrapper = () => {
    return <PdfViewer file="/data/spiceDirectPromotions.pdf" />;
};

export default PdfWrapper;