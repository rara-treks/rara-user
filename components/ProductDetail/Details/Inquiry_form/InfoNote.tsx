import { Info } from "lucide-react";

interface InfoNoteProps {
  impact: string;
}

function InfoNote({ impact }: InfoNoteProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-3 mb-6 flex gap-2">
      <Info className="h-4 w-4 text-[#3E641C] mt-0.5 flex-shrink-0" />
      <p
        className="text-sm text-[#3E641C] leading-relaxed"
        dangerouslySetInnerHTML={{ __html: impact }}
      />
    </div>
  );
}

export default InfoNote;
