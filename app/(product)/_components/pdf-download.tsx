import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import React from "react";

const PdfDownload = () => {
  return (
    <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-6 px-6 py-5 bg-gradient-to-r from-slate-50 to-gray-50 shadow-sm rounded-xl border border-gray-200 sm:items-center sm:justify-between">
      {/* Left section - Last updated */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          <FileText className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">Last Updated</p>
          <p className="text-sm text-gray-600">June 26, 2025</p>
        </div>
      </div>

      {/* Center section - Description */}
      <div className="flex-1 sm:text-center">
        <p className="text-sm font-medium text-gray-900 mb-1">
          PDF Dossier Available
        </p>
        <p className="text-sm text-gray-600">
          Download the complete dossier in PDF format for offline viewing
        </p>
      </div>

      {/* Right section - Download button */}
      <div className="flex-shrink-0">
        <Button
          className="w-full sm:w-auto gap-2  text-white font-medium px-4 py-2 transition-colors"
          size="sm"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </div>
    </div>
  );
};

export default PdfDownload;
